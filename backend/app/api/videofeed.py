from app import app
from flask import Response, request, jsonify
from tensorflow import keras
from keras.models import load_model
import requests
import json
import cv2
import numpy as np
import os


def get_className(classNo):
    if classNo == 0:
        return "Ranel John Tormis"


@app.route("/api/v1/video_feed", methods=["GET", "POST"])
def video_feed():
    if request.method == "GET":
        detected_faces = []
        current_dir = os.getcwd()
        file_directory = os.path.join(current_dir, "app\h5")
        h5_location = os.path.join(file_directory, "keras_model.h5")
        classifier = os.path.join(file_directory, "haarcascade_frontalface_default.xml")
        facedetect = cv2.CascadeClassifier(classifier)
        font = cv2.FONT_HERSHEY_COMPLEX
        model = load_model(h5_location, compile=False)
        camera = cv2.VideoCapture(0, cv2.CAP_DSHOW)  # Access the camera or video source

        def generate_frames():
            while True:
                success, frame = camera.read()
                if not success:
                    break
                else:
                    faces = facedetect.detectMultiScale(frame, 1.3, 5)
                    for x, y, w, h in faces:
                        crop_img = frame[y : y + h, x : x + h]
                        img = cv2.resize(crop_img, (224, 224))
                        img = img.reshape(1, 224, 224, 3)
                        prediction = model.predict(img)
                        classIndex = np.argmax(model.predict(img), axis=-1)
                        probabilityValue = np.amax(prediction)

                        if classIndex == 0:
                            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                            cv2.rectangle(
                                frame, (x, y - 40), (x + w, y), (0, 255, 0), -2
                            )
                            cv2.putText(
                                frame,
                                str(get_className(classIndex)),
                                (x, y - 10),
                                font,
                                0.75,
                                (255, 255, 255),
                                1,
                                cv2.LINE_AA,
                            )
                            name = get_className(classIndex)
                            if name not in detected_faces:
                                detected_faces.append(name)
                        elif classIndex == 1:
                            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                            cv2.rectangle(
                                frame, (x, y - 40), (x + w, y), (0, 255, 0), -2
                            )
                            cv2.putText(
                                frame,
                                str(get_className(classIndex)),
                                (x, y - 10),
                                font,
                                0.75,
                                (255, 255, 255),
                                1,
                                cv2.LINE_AA,
                            )
                            name = get_className(classIndex)
                            if name not in detected_faces:
                                detected_faces.append(name)

                        cv2.putText(
                            frame,
                            str(round(probabilityValue * 100, 2)) + "%",
                            (180, 75),
                            font,
                            0.75,
                            (255, 0, 0),
                            2,
                            cv2.LINE_AA,
                        )

                    # Perform any necessary processing on the frame (e.g., face recognition)

                    if len(detected_faces) > 0:
                        data = {"faces": detected_faces}
                        file_path = os.path.join(
                            current_dir, "app", "data", "sample.json"
                        )
                        serialized = json.dumps(data, indent=4)
                        with open(file_path, "w") as outfile:
                            outfile.write(serialized)

                    # Convert the frame to JPEG format
                    ret, buffer = cv2.imencode(".jpg", frame)
                    frame = buffer.tobytes()
                yield (
                    b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n"
                )

        return Response(
            generate_frames(), mimetype="multipart/x-mixed-replace; boundary=frame"
        )


@app.route("/api/v1/detected_faces", methods=["GET", "POST"])
def detected_faces():
    current_dir = os.getcwd()
    file_path = os.path.join(current_dir, "app", "data", "sample.json")

    with open(file_path, "r") as file:
        data = json.load(file)
    return jsonify({"faces": data["faces"]})
