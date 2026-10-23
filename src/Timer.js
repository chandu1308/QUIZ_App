import React, { useEffect, useState } from "react";

const Timer = ({ totalTime, onComplete }) => {
  const [hours, minutes, seconds] = totalTime.split(":").map(Number);
  const initialSeconds = hours * 3600 + minutes * 60 + seconds;
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      onComplete();
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setRemainingSeconds((remaining) => Math.max(remaining - 1, 0));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [remainingSeconds, onComplete]);

  const formattedTime = [3600, 60, 1]
    .map((unit) =>
      String(Math.floor(remainingSeconds / unit) % (unit === 3600 ? 100 : 60)).padStart(
        2,
        "0"
      )
    )
    .join(":");
  const isLowTime = remainingSeconds <= 60;

  return (
    <div
      className={`timer${isLowTime ? " timer-low" : ""}`}
      role="timer"
      aria-label={`${formattedTime} remaining`}
    >
      <span className="timer-icon" aria-hidden="true">◷</span>
      <span className="timer-copy">
        <span className="timer-label">TIME LEFT</span>
        <strong>{formattedTime}</strong>
      </span>
    </div>
  );
};

export default Timer;
