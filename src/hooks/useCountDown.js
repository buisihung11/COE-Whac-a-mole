import { useEffect, useState } from "react";

const useCountdown = (initialSeconds) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  const startCountdown = () => {
    setIsActive(true);
    setSeconds(initialSeconds);
  };

  const pauseCountdown = () => {
    setIsActive(false);
  };

  const resetCountdown = () => {
    setSeconds(initialSeconds);
    setIsActive(false);
  };

  useEffect(() => {
    let interval;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return {
    seconds,
    isActive,
    startCountdown,
    pauseCountdown,
    resetCountdown,
  };
};

export default useCountdown;
