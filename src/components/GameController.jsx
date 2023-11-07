import React from "react";
import PropTypes from "prop-types";

const GameController = ({ startGame, isStarted, score, timeLeft }) => {
  return (
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
  );
};

GameController.propTypes = {
  startGame: PropTypes.func.isRequired,
  isStarted: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
  timeLeft: PropTypes.number.isRequired,
};

export default GameController;
