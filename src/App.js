import logo from './logo.svg';
import './App.css';
import React from "react";
import Webcam from "react-webcam";

const WebcamComponent = () => <Webcam />;

function App() {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
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
          padding: "12%",
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
          <WebcamComponent 
          audio={false}
          height={720}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
          />

        </div>
        <div className="FooterCapture"style={{
          padding: "2%"
        }}>
          <button style={{
                backgroundColor: '#0d9ad6',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
          }}>
             Capture Emotion
             </button>
        </div>
      </header>
    </div>
  );
}
export default App;