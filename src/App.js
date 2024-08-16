import logo from './logo.svg';
import './App.css';
import React from "react";
import Webcam from "react-webcam";

const WebcamComponent = () => <Webcam />;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Header">
          <a className="menu" style={{
              padding: "20px",
              textalign: "center",
              color: "white",
              fontsize: "30px",
              textalign: "center",
              fontsize: "35px",
              fontfamily: "system-ui",
          }}>
            Seams
          </a>
        </div>
        <div className="EmotionVideo" style={{
          padding: "18%",
        }}>
          <p> here comos the camerea if u want delete this this is only a guide</p>   
        </div>
        <div className="FooterCapture" style={{
          padding: "2%"
        }}>
          <button style={{
            padding: "10px",
            fontsize: "20px",
            fontfamily: "system-ui",
            color: "white",
            transitionduration: "0.4s",
            backgroundcolor: "#04AA6D",
            color: "black",
            borderRadius: '5px',
            overflow: 'hidden'
          }}>
             Show Emotions
             </button>
        </div>
      </header>
    </div>
  );
}

export default App;
