// useGameLogic.js
import { useState, useCallback, useEffect } from "react";
import useSound from "use-sound";
import useCountdown from "./useCountDown";

const HOLE = "hole";
const MOLE = "mole";
const RABBIT = "rabbit";

function useGameLogic() {
  const [moles, setMoles] = useState(Array(9).fill(HOLE));
  const [score, setScore] = useState(0);
  const {
    seconds: timeLeft,
    isActive: isStarted,
    startCountdown,
  } = useCountdown(30);
  const [whackSound] = useSound("/Whack.wav", { volume: 0.25 });
  const [errorSound] = useSound("/error.wav", { volume: 0.5 });

  const popMole = useCallback((index) => {
    setMoles((curMoles) => {
      const newMoles = [...curMoles];
      newMoles[index] = Math.random() > 0.5 ? MOLE : RABBIT;
      return newMoles;
    });
  }, []);

  const hideMole = useCallback((index) => {
    setMoles((curMoles) => {
      const newMoles = [...curMoles];
      newMoles[index] = HOLE;
      return newMoles;
    });
  }, []);

  const hitMole = useCallback(
    (index) => {
      if (moles[index] === HOLE || !isStarted) return;
      if (moles[index] === RABBIT) {
        errorSound();
        setScore((score) => score - 1);
      } else if (moles[index] === MOLE) {
        whackSound();
        setScore((score) => score + 1);
      }
      hideMole(index);
    },
    [moles, isStarted, whackSound, errorSound]
  );

  useEffect(() => {
    if (!isStarted) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      popMole(randomIndex);
      setTimeout(() => hideMole(randomIndex), 1000);
    }, 1500);

    return () => clearInterval(interval);
  }, [isStarted, popMole, hideMole, moles.length]);

  const startGame = () => {
    startCountdown();
    setScore(0);
  };

  return { moles, score, timeLeft, isStarted, startGame, hitMole };
}

export default useGameLogic;
