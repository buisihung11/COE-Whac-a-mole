import "./App.css";
import { useState, useEffect } from "react";
import hole from "./assets/hole.png";
import mole from "./assets/mole.png";
import rabbit from "./assets/rabbit.png";
import React from "react";
import useCountdown from "./hooks/useCountDown";
import useSound from "use-sound";

function App() {
  const [moles, setMoles] = useState(Array(9).fill("hole"));
  const [score, setScore] = useState(0);
  const {
    seconds: timeLeft,
    isActive: isStarted,
    startCountdown,
  } = useCountdown(30);
  const [whackSound] = useSound("/Whack.wav", { volume: 0.25 });
  const [errorSound] = useSound("/error.wav", { volume: 0.5 });

  const popMole = (index) => {
    setMoles((curMoles) => {
      const newMoles = [...curMoles];
      const randomType = Math.random() > 0.5 ? "mole" : "rabbit";
      newMoles[index] = randomType;
      return newMoles;
    });
  };

  const hideMole = (index) => {
    setMoles((curMoles) => {
      const newMoles = [...curMoles];
      newMoles[index] = "hole";
      return newMoles;
    });
  };

  const hitMole = (index) => {
    if (moles[index] === "hole" || !isStarted) return;
    if (moles[index] === "rabbit") {
      errorSound();
      setScore((score) => score - 1);
    } else if (moles[index] === "mole") {
      whackSound();
      setScore((score) => score + 1);
    }
    hideMole(index);
  };

  const startGame = () => {
    startCountdown();
    setScore(0);
  };

  useEffect(() => {
    let interval;
    if (!isStarted) return;

    interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      popMole(randomIndex);
      setTimeout(() => {
        hideMole(randomIndex);
      }, 1000);
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, [moles, isStarted]);

  return (
    <>
      <div className="game-header">
        <h1>Whack-a-mole game</h1>
        <div className="game-header-controller">
          <button onClick={startGame} disabled={isStarted}>
            Start game
          </button>
          <div className="game-header-information">
            <div className="game-header-information-col game-header-information-score">
              <h4>Score</h4>
              <span className="game-header-information-val" id="game-score">
                {score}
              </span>
            </div>
            <div className="game-header-information-col game-header-information-countdown">
              <h4>Time left</h4>
              <span className="time-left game-header-information-val">
                {timeLeft}s
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="game-container">
        <div className="game-area">
          {moles.map((type, index) => (
            <img
              onClick={() => hitMole(index)}
              key={index}
              src={type === "hole" ? hole : type === "mole" ? mole : rabbit}
              className="mole"
              data-testid={type}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
