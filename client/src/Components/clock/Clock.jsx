import { useEffect, useState } from "react";
import "./Clock.css";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (!isTimerActive) {
      const clockInterval = setInterval(() => {
        setTime(new Date());
      }, 1000);
      return () => clearInterval(clockInterval);
    }
  }, [isTimerActive]);

  useEffect(() => {
    let timerInterval;
    if (isTimerActive) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isTimerActive]);

  const handleButtonClick = () => {
    setClickCount((prev) => prev + 1);
    if (clickCount === 1) {
      setIsTimerActive(false); // Double-click restores the clock
      setClickCount(0);
    } else {
      setIsTimerActive((prev) => !prev); // Single-click toggles timer
    }
    setTimeout(() => setClickCount(0), 500); // Reset click count after 500ms
  };

  return (
    <div className="clock-container">
      <div className="clock">
        <div className="dot" style={{ display: isTimerActive ? "none" : "block" }}></div>

        {!isTimerActive && (
          <>
            <div className="hour twelve">12</div>
            <div className="hour one">1</div>
            <div className="hour two">2</div>
            <div className="hour three">3</div>
            <div className="hour four">4</div>
            <div className="hour five">5</div>
            <div className="hour six">6</div>
            <div className="hour seven">7</div>
            <div className="hour eight">8</div>
            <div className="hour nine">9</div>
            <div className="hour ten">10</div>
            <div className="hour eleven">11</div>

            <div
              className="hour-hand"
              style={{ transform: `rotateZ(${time.getHours() * 30}deg)` }}
            ></div>
            <div
              className="minute-hand"
              style={{ transform: `rotateZ(${time.getMinutes() * 6}deg)` }}
            ></div>
            <div
              className="second-hand"
              style={{ transform: `rotateZ(${time.getSeconds() * 6}deg)` }}
            ></div>
          </>
        )}
        {isTimerActive && <div className="timer-display">{timer}</div>}
      </div>
      {/* <button className="timer-button" onClick={handleButtonClick}>
        {isTimerActive ? "Stop Timer" : "Start Timer"}
      </button> */}
    </div>
  );
};

export default Clock;
