import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function FaceRecognition() {
  const [initializing, setInitializing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    (async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      setInitializing(true);
      Promise.all([
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(startVideo);
    })();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ 
        audio: true,
        video: true
      })
      .then((stream) => {        
          videoRef!.current!.srcObject = stream;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleVideoOnPlay =  () => {
    setInterval(async () => {
        if(initializing) {
          setInitializing(false);
        }
        canvasRef!.current!.innerHTML = `${faceapi.createCanvasFromMedia(videoRef.current as HTMLVideoElement)}`;

        const displaySize = {
          width: 640,
          height: 400
        }
        faceapi.matchDimensions(canvasRef.current as faceapi.IDimensions, displaySize);
        const detections = await faceapi.detectSingleFace(
            videoRef!.current as faceapi.TNetInput, 
            new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptor()
        .withFaceExpressions()
        .withAgeAndGender();

        canvasRef.current?.getContext('2d')?.clearRect(0, 0, 640, 400);
        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        faceapi.draw.drawDetections(
          canvasRef.current as HTMLCanvasElement, 
          resizedDetections as faceapi.draw.TDrawDetectionsInput);

        faceapi.draw.drawFaceLandmarks(
          canvasRef.current as HTMLCanvasElement, 
          resizedDetections as faceapi.draw.DrawFaceLandmarksInput);

        faceapi.draw.drawFaceExpressions(
          canvasRef.current as HTMLCanvasElement, 
          resizedDetections as faceapi.draw.DrawFaceExpressionsInput);
    
        console.log(detections);
    }, 1)
    
  }

  return (
      <div style={{display: 'flex', justifyContent: "center"}}>
        <h2>FaceRecognition</h2>
        <p>{initializing ? "Initializing": "Ready"}</p>
        <video ref={videoRef} autoPlay muted height={400} width={640} onPlay={handleVideoOnPlay}/>
        <canvas ref={canvasRef} style={{ position: "absolute"}}/>
      </div>
  )
}
