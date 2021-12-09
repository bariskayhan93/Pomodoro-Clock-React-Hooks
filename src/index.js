import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
  FaArrowUp,
  FaArrowDown,
  FaCaretSquareRight,
  FaSync,
} from "react-icons/fa";
let interval;
function App() {
  const [pauseMinutes, setPauseMinutes] = useState(5);
  const [sessionMinutes, setSessionMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const myAudio = useRef(0);

  useEffect(() => {
    console.log(myAudio);
    if(seconds === 0 && minutes === 0){
      myAudio.current.play();
      }
    if (isActive) {
      interval = window.setInterval(() => {
        clearInterval(interval);
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            let minutes = displayMessage ? sessionMinutes : pauseMinutes;
            let seconds = 59;
            setSeconds(seconds);
            setMinutes(minutes);
            setDisplayMessage(!displayMessage);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [seconds, isActive]);

  const handleClick = (e) => {
    switch (e.currentTarget.id) {
      case "break-decrement":
        if (!isActive && pauseMinutes > 1) {
          setPauseMinutes(pauseMinutes - 1);
          {
            displayMessage && setSeconds(0);
          }
        }
        break;
      case "break-increment":
        if (!isActive && pauseMinutes < 60) {
          setPauseMinutes(pauseMinutes + 1);
          {
            displayMessage && setSeconds(0);
          }
        }
        break;
      case "session-decrement":
        if (!isActive && sessionMinutes > 1) {
          setSessionMinutes(sessionMinutes - 1);
          setMinutes(sessionMinutes - 1);
          {
            !displayMessage && setSeconds(0);
          }
        }
        break;
      case "session-increment":
        if (!isActive && sessionMinutes < 60) {
          setSessionMinutes(sessionMinutes + 1);
          setMinutes(sessionMinutes + 1);
          {
            !displayMessage && setSeconds(0);
          }
        }
        break;
      case "reset":
        setIsActive(false);
        setSessionMinutes(25);
        setPauseMinutes(5);
        setMinutes(25);
        setSeconds(0);
        setDisplayMessage(false)
        myAudio.current.load()
        myAudio.current.pause();
      
        break;
      case "start_stop":
        setIsActive(!isActive);

        break;

      default:
    }
  };

  const timurMinutus = String(minutes < 10 ? `0${minutes}` : minutes);
  const timurSeconds = String(seconds < 10 ? `0${seconds}` : seconds);
  const iconClass = {
    color: "hsl(162, 61%, 67%)",
    fontSize: "20px",
    margin: "0px 10px -48px 10px",
  };
  return (
    <div>
      <div className="main-title">
        <h3>25 + 5 Clock</h3>
      </div>
      <div id="labels">
        <div title="Break Length" id="break-label">
          <div onClick={handleClick} id="break-increment">
            <FaArrowUp style={iconClass} />
          </div>
          <h2 id="break-length">{pauseMinutes}</h2>
          <div onClick={handleClick} id="break-decrement">
            <FaArrowDown style={iconClass} />
          </div>
        </div>

        <div title="Session Length" id="session-label">
          <div onClick={handleClick} id="session-increment">
            <FaArrowUp style={iconClass} />
          </div>
          <h2 id="session-length">{sessionMinutes}</h2>
          <div onClick={handleClick} id="session-decrement">
            <FaArrowDown style={iconClass} />
          </div>
        </div>
      </div>
      <div className="timer">
        <div className="timer-wrapper">
          <div id="timer-label">{displayMessage ? "Break" : "Session"}</div>
          <div id="time-left">{timurMinutus + ":" + timurSeconds}</div>
        </div>
      </div>

      <div className="timer-control">
        <div id="start_stop" onClick={handleClick}>
          <FaCaretSquareRight style={iconClass} />
        </div>
        <div id="reset" onClick={handleClick}>
          <FaSync style={iconClass} />
        </div>
      </div>
      {/*  {displayMessage &&<h4 id="breaktext">Break Time! New Session starts</h4>}    */}
      <div className="author">
        Designed and Coded by <br />
        <a href="#" target="_blank" id="name">
          Baris Kayhan
        </a>
      </div>
      <audio
        id="beep"
        preload="auto"
        ref={myAudio}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("container"));
