import "./App.css";
import { useState, useEffect } from "react";
import hole from "./assets/hole.png";
import mole from "./assets/mole.png";
import rabbit from "./assets/rabbit.png";

function App() {
  const [moles, setMoles] = useState(Array(9).fill("hole"));
  const [score, setScore] = useState(0);

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
    if (moles[index] === "hole") return;
    if (moles[index] === "rabbit") {
      setScore((score) => score - 1);
    } else if(moles[index] === "mole") {
      setScore((score) => score + 1);
    }
    hideMole(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      popMole(randomIndex);
      setTimeout(() => {
        hideMole(randomIndex);
      }, 1000);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout();
    };
  }, [moles]);

  return (
    <>
      <div className="game-header">
        <h1>Whac-a-mole game</h1>
        <div className="score">Score: {score}</div>
        <div className="time-left">Time left: 30s</div>
        <button>Start game</button>
      </div>
      <div className="game-container">
        <div className="game-area">
          {moles.map((type, index) => (
            <img
              onClick={() => hitMole(index)}
              key={index}
              src={type === "hole" ? hole : type === "mole" ? mole : rabbit}
              className="mole"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
