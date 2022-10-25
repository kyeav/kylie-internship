import { useState, useEffect } from "react";

const Countdown = ({ expiryDate }) => {
  const [timeLeftText, setTimeLeftText] = useState("");
  const [intervalId, setIntervalId] = useState(); // cancelId

  useEffect(() => {
    calculateTimeLeft();

    // cancelId = setInterval(updateTimer, 1000 / 60)
    const intervalId = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    setIntervalId(intervalId);

    //  clearInterval(cancelId);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function calculateTimeLeft() {
    const millisLeft = expiryDate - Date.now();

    // if (millisLeft < 0) {
    //     millisLeft = 0;
    //     clearInterval(cancelId);
    //     cancelId = null
    //   }
    if (millisLeft < 0) {
      clearInterval(intervalId);
      setTimeLeftText("EXPIRED");
      return;
    }

    const secondsLeft = millisLeft / 1000;
    const minutesLeft = secondsLeft / 60;
    const hoursLeft = minutesLeft / 60;

    const secondsText = Math.floor(secondsLeft) % 60;
    const minutesText = Math.floor(minutesLeft) % 60;
    const hoursText = Math.floor(hoursLeft);

    setTimeLeftText(`${hoursText}h ${minutesText}m ${secondsText}s`);
  }

  return <>{timeLeftText}</>;
};

export default Countdown;