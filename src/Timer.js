import { useState, useEffect, useRef } from "react";
import "./styles.css";

const Timer = ({ totalTime, onComplete }) => {
  const [timer, setTimer] = useState(totalTime);
  // const [quiz, setQuiz] = useState(true);

  const timerIdRef = useRef(null);
  function startOrResume() {
    // setQuiz(true);
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }
    timerIdRef.current = setInterval(() => {
      setTimer((timer) => {
        const [hours, minutes, seconds] = timer.split(":").map((str) => +str); //[1, 1, 0]

        let resultHours = hours,
          resultMinutes = minutes,
          resultSeconds = seconds;
        if (seconds === 0) {
          resultSeconds = 59; // sec = 59
          if (minutes === 0) {
            resultHours = hours - 1; // hr => 1-1 = 0
            resultMinutes = 59; //
          } else {
            resultMinutes = minutes - 1; // min => 1-1 = 0
          }
        } else {
          resultSeconds = seconds - 1;
        }

        const result = [resultHours, resultMinutes, resultSeconds]
          .map((num) => num.toString().padStart(2, "0")) // ["00","59","59"]
          .join(":"); // "00:59:59"
        return result; // "00:59:59"
      });
    }, 1000);
  }

  useEffect(() => {
    // console.log("chandu");
    startOrResume();
  }, []);

  const isTimerCompleted = timer === "00:00:00";

  useEffect(() => {
    if (isTimerCompleted) {
      // setQuiz(false);
      // setTimer("00:05:00");
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
      onComplete();
      // alert("Timer Ended");
    }
  }, [isTimerCompleted]);
  return (
    <h3 className="timer" style={{ textAlign: "center", color: "red" }}>
      {timer}
    </h3>
  );
};

export default Timer;
