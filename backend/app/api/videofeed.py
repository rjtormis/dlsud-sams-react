from app import app
from flask import Response
from tensorflow import keras
from keras.models import load_model
import cv2
import numpy as np
import os


def get_className(classNo):
    if classNo == 0:
        return "Ranel John Tormis"


@app.route("/api/v1/video_feed")
def video_feed():
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
                        cv2.rectangle(frame, (x, y - 40), (x + w, y), (0, 255, 0), -2)
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
                    elif classIndex == 1:
                        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                        cv2.rectangle(frame, (x, y - 40), (x + w, y), (0, 255, 0), -2)
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

                # Convert the frame to JPEG format
                ret, buffer = cv2.imencode(".jpg", frame)
                frame = buffer.tobytes()

            yield (b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n")

    return Response(
        generate_frames(), mimetype="multipart/x-mixed-replace; boundary=frame"
    )
