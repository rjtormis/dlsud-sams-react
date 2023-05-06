import { useCallback, useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
const labels = ["Ranel John D. Tormis"];
function Attendance() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    runInference();
  }, []);

  async function runInference() {
    // Load the face recognition model
    const model = await tf.loadLayersModel(
      "https://aws-sams-storage.s3.ap-southeast-1.amazonaws.com/model/model.json"
    );

    // Get the video stream from the user's camera
    const video = videoRef.current;
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    // Wait for the video to start playing before performing inference
    await video.play();

    // Continuously perform inference on each frame of the video stream
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    while (true) {
      const inputTensor = tf.browser.fromPixels(video).expandDims();
      const resizedTensor = tf.image.resizeBilinear(inputTensor, [224, 224]);

      const predictions = await model.predict(resizedTensor).array();

      // Draw boxes around detected faces and display their names
      predictions.forEach((prediction) => {
        const [left, top, right, bottom] = prediction.bbox;
        const name = prediction.name;
        ctx.strokeStyle = "green";
        ctx.font = "16px Arial";
        ctx.fillStyle = "green";
        ctx.fillText(name, left, top - 5);
        ctx.strokeRect(left, top, right - left, bottom - top);
      });

      // Request the next frame and continue performing inference
      await tf.nextFrame();
    }
  }

  return (
    <div>
      <video ref={videoRef} />
      <canvas ref={canvasRef} />
    </div>
  );
}
export default Attendance;
