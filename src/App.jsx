import React from "react";
import "./App.css";
import GameController from "./components/GameController";
import Mole from "./components/Mole";
import useGameLogic from "./hooks/useWhackAMoleGame";

function App() {
  const { moles, score, timeLeft, isStarted, startGame, hitMole } =
    useGameLogic();

  return (
    <>
      <div className="game-header">
        <h1>Whack-a-mole game</h1>
        <GameController
          startGame={startGame}
          isStarted={isStarted}
          score={score}
          timeLeft={timeLeft}
        />
      </div>
      <div className="game-container">
        <div className="game-area">
          {moles.map((type, index) => (
            <Mole key={index} type={type} onClick={() => hitMole(index)} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
