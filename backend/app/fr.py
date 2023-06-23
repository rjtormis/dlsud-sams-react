# pytorch
import torch
import sys
import json
import arrow

sys.path.insert(0, "yolov5_face")

import time
import numpy as np
import os


from concurrent.futures import thread
from sqlalchemy import null
from torchvision import transforms
from flask import jsonify
from threading import Thread
from skimage.transform import SimilarityTransform
from datetime import datetime

# from ..model_arch.backbones.iresnet import iresnet100

from model_arch.backbones.iresnet import iresnet100
from yolov5_face.models.experimental import attempt_load
from yolov5_face.utils.datasets import letterbox
from yolov5_face.utils.general import (
    check_img_size,
    non_max_suppression_face,
    scale_coords,
)

# from ..yolov5_face.models.experimental import attempt_load
# from ..yolov5_face.utils.datasets import letterbox
# from ..yolov5_face.utils.general import (
#     check_img_size,
#     non_max_suppression_face,
#     scale_coords,
# )

# Check device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Device:", device)

model = attempt_load("model_arch/yolov5m-face.pt", map_location=device)
model_emb = iresnet100()
model_emb.load_state_dict(torch.load("model_arch/backbone.pth", map_location=device))
model_emb.to(device)
model_emb.eval()

face_preprocess = transforms.Compose(
    [
        transforms.ToTensor(),  # input PIL => (3,56,56), /255.0
        transforms.Resize((112, 112)),
        transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5]),
    ]
)

isThread = True
score = 0
name = null


# Resize image
def resize_image(img0, img_size):
    h0, w0 = img0.shape[:2]  # orig hw
    r = img_size / max(h0, w0)  # resize image to img_size

    if r != 1:  # always resize down, only resize up if training with augmentation
        interp = cv2.INTER_AREA if r < 1 else cv2.INTER_LINEAR
        img0 = cv2.resize(img0, (int(w0 * r), int(h0 * r)), interpolation=interp)

    imgsz = check_img_size(img_size, s=model.stride.max())  # check img_size
    img = letterbox(img0, new_shape=imgsz)[0]

    # Convert
    img = img[:, :, ::-1].transpose(2, 0, 1).copy()  # BGR to RGB, to 3x416x416

    img = torch.from_numpy(img).to(device)
    img = img.float()  # uint8 to fp16/32
    img /= 255.0  # 0 - 255 to 0.0 - 1.0

    return img


def scale_coords_landmarks(img1_shape, coords, img0_shape, ratio_pad=None):
    """
    Scales the coordinates of landmarks from one image shape to another image shape.

    Args:
        img1_shape (tuple): The shape (height, width) of the target image.
        coords (numpy.ndarray): The original coordinates of landmarks as a NumPy array.
        img0_shape (tuple): The shape (height, width) of the source image.
        ratio_pad (tuple, optional): The padding ratio applied during letterboxing.

    Returns:
        numpy.ndarray: The scaled coordinates of landmarks in the target image.
    """

    if ratio_pad is None:
        gain = min(
            img1_shape[0] / img0_shape[0], img1_shape[1] / img0_shape[1]
        )  # gain  = old / new
        pad = (img1_shape[1] - img0_shape[1] * gain) / 2, (
            img1_shape[0] - img0_shape[0] * gain
        ) / 2  # wh padding
    else:
        gain = ratio_pad[0][0]
        pad = ratio_pad[1]

    coords[:, [0, 2, 4, 6, 8]] -= pad[0]  # x padding
    coords[:, [1, 3, 5, 7, 9]] -= pad[1]  # y padding
    coords[:, :10] /= gain
    # clip_coords(coords, img0_shape)
    coords[:, 0].clamp_(0, img0_shape[1])  # x1
    coords[:, 1].clamp_(0, img0_shape[0])  # y1
    coords[:, 2].clamp_(0, img0_shape[1])  # x2
    coords[:, 3].clamp_(0, img0_shape[0])  # y2
    coords[:, 4].clamp_(0, img0_shape[1])  # x3
    coords[:, 5].clamp_(0, img0_shape[0])  # y3
    coords[:, 6].clamp_(0, img0_shape[1])  # x4
    coords[:, 7].clamp_(0, img0_shape[0])  # y4
    coords[:, 8].clamp_(0, img0_shape[1])  # x5
    coords[:, 9].clamp_(0, img0_shape[0])  # y5
    return coords


def get_face(input_image):
    """
    Extracts the face from the input image.

    Args:
        input_image (torch.Tensor): The input image as a PyTorch tensor.

    Returns:
        torch.Tensor: The extracted face image as a PyTorch tensor.
        numpy.ndarray: The bounding box coordinates of the face.
    """
    # Parameters
    size_convert = 128
    conf_thres = 0.5
    iou_thres = 0.45

    # Resize image
    img = resize_image(input_image.copy(), size_convert)

    # Via yolov5-face
    with torch.no_grad():
        pred = model(img[None, :])[0]

    # Apply NMS
    det = non_max_suppression_face(pred, conf_thres, iou_thres)[0]
    bboxs = np.int32(
        scale_coords(img.shape[1:], det[:, :4], input_image.shape).round().cpu().numpy()
    )

    landmarks = np.int32(
        scale_coords_landmarks(img.shape[1:], det[:, 5:15], input_image.shape)
        .round()
        .cpu()
        .numpy()
    )

    aligned_faces = []
    aligned_landmarks = []

    for i in range(len(bboxs)):
        if bboxs[i][2] - bboxs[i][0] < 15 or bboxs[i][3] - bboxs[i][1] < 15:
            continue
        face_img, face_landmarks = align_face(input_image, bboxs[i], landmarks[i])
        aligned_faces.append(face_img)
        aligned_landmarks.append(face_landmarks)

    return bboxs, landmarks, aligned_faces


def align_face(input_image, bbox, landmarks):
    """
    Aligns the face based on the bounding box and landmarks.

    Args:
        input_image (torch.Tensor): The input image as a PyTorch tensor.
        bbox (numpy.ndarray): The bounding box coordinates of the face.
        landmarks (numpy.ndarray): The landmarks coordinates of the face.

    Returns:
        torch.Tensor: The aligned face image as a PyTorch tensor.
    """
    reference_landmarks = [
        [30.2946, 51.6963],
        [65.5318, 51.5014],
        [48.0252, 71.7366],
        [33.5493, 92.3655],
        [62.7299, 92.2041],
    ]

    src_pts = np.array(landmarks).reshape(5, 2).astype(np.float32)
    dst_pts = np.array(reference_landmarks).astype(np.float32)

    tform = SimilarityTransform()
    tform.estimate(src_pts, dst_pts)
    face_img = cv2.warpAffine(
        input_image, tform.params[0:2, :], (112, 112), borderValue=0.0
    )

    return face_img, dst_pts


def get_feature(face_image, training=True):
    """
    Extracts the features from the face image.

    Args:
        face_image (torch.Tensor): The face image as a PyTorch tensor.
        training (bool, optional): Flag indicating if the model is in training mode.

    Returns:
        torch.Tensor: The extracted features from the face image as a PyTorch tensor.
    """
    # Convert to RGB
    face_image = cv2.cvtColor(face_image, cv2.COLOR_BGR2RGB)

    # Preprocessing image BGR
    face_image = face_preprocess(face_image).to(device)

    # Via model to get feature
    with torch.no_grad():
        if training:
            emb_img_face = model_emb(face_image[None, :])[0].cpu().numpy()
        else:
            emb_img_face = model_emb(face_image[None, :]).cpu().numpy()

    # Convert to array
    images_emb = emb_img_face / np.linalg.norm(emb_img_face)
    return images_emb


def read_features(root_feature_path="static/features.npz"):
    """
    Reads the features from the given directory path.

    Args:
        root_feature_path (str): The directory path where the features are stored.

    Returns:
        dict: A dictionary containing the loaded features.
    """
    data = np.load(root_feature_path, allow_pickle=True)
    images_name = data["arr1"]
    images_emb = data["arr2"]

    return images_name, images_emb


def recognition(face_image):
    """
    Performs face recognition on the given face image.

    Args:
        face_image (torch.Tensor): The face image as a PyTorch tensor.

    Returns:
        str: The predicted label for the recognized face.
    """
    # Get feature from face
    query_emb = get_feature(face_image, training=False)

    # Read features
    images_names, images_embs = read_features()
    scores = (query_emb @ images_embs.T)[0]
    id_max = np.argmax(scores)
    score = scores[id_max]
    name = images_names[id_max]

    return score, name


def recognition_thread(face_image):
    global score, name
    score, name = recognition(face_image)


def main(disable=False, sub_code=""):
    data = {"faces": [], "time": []}
    with open(f"app/data/{sub_code}.json", "w") as file:
        json.dump(data, file, indent=4)

    global isThread, score, name
    cap = cv2.VideoCapture(0)

    # Open camera
    start = time.time_ns()
    frame_count = 0
    fps = -1

    # Read until video is completed
    detected_names = []
    detected_time = []
    while True:
        # Get the current time in GMT+8
        local_time = arrow.utcnow().to("Asia/Singapore")
        time_12hr = local_time.format("hh:mm A")

        # Capture frame-by-frame
        _, frame = cap.read()

        # Get facesy
        bboxs, landmarks, aligned_faces = get_face(frame)
        h, w, c = frame.shape

        tl = 1 or round(0.002 * (h + w) / 2) + 1  # line/font thickness
        # landmarks color
        colors = [
            (0, 255, 255),
            (0, 255, 255),
            (0, 255, 255),
            (0, 255, 255),
            (0, 255, 255),
        ]
        # Get boxs
        for i in range(len(bboxs)):
            # Get location face
            x1, y1, x2, y2 = bboxs[i]
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 146, 230), 2)

            # Landmarks
            for x in range(5):
                point_x = int(landmarks[i][2 * x])
                point_y = int(landmarks[i][2 * x + 1])
                cv2.circle(frame, (point_x, point_y), tl + 1, colors[x], -1)

            # Get face from location
            if isThread == True:
                face_image = aligned_faces[i]
                thread = Thread(target=recognition_thread, args=(face_image,))
                thread.start()
                thread.join()

            if name is None:
                continue
            else:
                if score < 0.3:
                    caption = "UNKNOWN"
                else:
                    # caption = f"{name.split('_')[0].upper()}: {score:.2f}"
                    caption = f"{name.split('_')[0].upper()}"
                    if caption not in detected_names or caption != "UNKNOWN":
                        detected_names.append(caption)
                        detected_time.append(time_12hr)

                # Store the face details with the corresponding name
                t_size = cv2.getTextSize(caption, cv2.FONT_HERSHEY_PLAIN, 2, 2)[0]

                # cv2.rectangle(frame, (x1, y1), (x1 + t_size[0], y1 + t_size[1]), (0, 146, 230), -1)
                cv2.rectangle(
                    frame, (x1, y1), (x1 + t_size[0], y1 + t_size[1]), (0, 146, 230), -1
                )
                cv2.putText(
                    frame,
                    caption,
                    (x1, y1 + t_size[1]),
                    cv2.FONT_HERSHEY_PLAIN,
                    2,
                    [255, 255, 255],
                    2,
                )
        data = {"faces": detected_names, "time": detected_time}
        with open(f"app/data/{sub_code}.json", "w") as file:
            json.dump(data, file, indent=4)

        detected_names.clear()
        detected_time.clear()

        # Count fps
        frame_count += 1

        if frame_count >= 30:
            end = time.time_ns()
            fps = 1e9 * frame_count / (end - start)
            frame_count = 0
            start = time.time_ns()

        if fps > 0:
            fps_label = "FPS: %.2f" % fps
            cv2.putText(
                frame, fps_label, (10, 25), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2
            )

        # video.write(frame)
        ret, buffer = cv2.imencode(".jpg", frame)
        frame = buffer.tobytes()
        if disable:
            cap.release()
            break

        yield (b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n")
    cap.release()


if __name__ == "__main__":
    main()
