import logo from './logo.svg';
import './App.css';
import React, { useRef, useState } from 'react';
import Webcam from "react-webcam";
import axios from 'axios';

function App() {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  const [responseData, setResponseData] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc);
      setImage(imageSrc || null);
    },
    [webcamRef]
  );
  const sendImage = async () => {
    if (!image) {
      alert('No image captured!');
      return;
    }

    const response = await fetch(image);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append('photo', blob, 'photo.jpg');
    formData.append('collections', '');

    const url = 'https://api.luxand.cloud/photo/emotions';
    const headers = {
      'token': process.env.REACT_APP_FACE_TOKEN,
    };

    try {
      const response = await axios.post(url, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setResponseData(response.data);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="Header">
          <a className="menu" 
          style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '3rem',
            color: '#fff',
            textAlign: 'center',
            textShadow: '0 0 5px #00F9FF, 0 0 10px #00F9FF, 0 0 20px #00F9FF, 0 0 40px #00F9FF'
          }
          } >
            SEAMS
          </a>
        </div>
        <div className="EmotionVideo" style={{
          padding: "10%",
        }}>
          <div style={{
          flexDirection: "row",
          }}>
          <p className='text' 
          style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '3rem',
            color: '#fff',
            textAlign: 'center',
            textShadow: '0 0 5px #00F9FF, 0 0 10px #00F9FF, 0 0 20px #00F9FF, 0 0 40px #00F9FF'
          }}> 
          Emotion Camera Recording
          </p>
            <div style={{flexDirection: 'row'}}>
              <button
                className="button-primary"
                onClick={() => {
                  sendImage();
                }}
                style={{marginRight:10}}
              >
                Emotion for Todei
              </button>
              <button
                className='button-capture'
                onClick={capture}
              >
                Capture photo
              </button>
            </div>
          </div>

          <div style={{marginTop: 10}}>
            <Webcam
              audio={false}
              height={720}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={1080}
              videoConstraints={videoConstraints}
            />
          </div>
          {responseData && (
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)', 
              borderRadius: '10px', 
              padding: '20px', 
              margin: '10px 0', 
              boxShadow: '0 0 10px #00F9FF, 0 0 20px #00F9FF, 0 0 30px #00F9FF', 
              color: '#fff', 
              fontFamily: 'Courier New, monospace', 
              fontSize: '1.5rem', 
              textAlign: 'left', 
              textShadow: '0 0 5px #00F9FF, 0 0 10px #00F9FF'
            }}>
              <div className="response-container">
                {responseData?.faces?.map((face, index) => (
                  <div key={index} className="face-card" style={{ marginBottom: '20px' }}>
                    <p className="dominant-emotion"><strong>Dominant Emotion:</strong> {face.dominant_emotion}</p>
                    <p className="emotion-breakdown"><strong>Emotion Breakdown:</strong></p>
                    <ul className="emotion-list" style={{ listStyleType: 'none', padding: 0 }}>
                      {Object.entries(face.emotion).map(([emotion, value]) => (
                        <li key={emotion} className="emotion-item" style={{ margin: '5px 0' }}><strong>{emotion}:</strong> {value.toFixed(2)}</li>
                      ))}
                    </ul>
                    <p className="region"><strong>Region:</strong> X: {face.region.x}, Y: {face.region.y}, Width: {face.region.w}, Height: {face.region.h}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
export default App;
