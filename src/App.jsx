import "./App.css";
import hole from "./assets/hole.png";
import mole from "./assets/mole.png";

function App() {
  return (
    <>
      <div className="game-header">
        <h1>Whac-a-mole game</h1>
        <div className="score">Score: 0</div>
        <div className="time-left">Time left: 30s</div>
        <button>Start game</button>
      </div>
      <div className="game-container">
        <div className="game-area">
          <img src={hole} alt="mole" className="mole" />
          <img src={hole} alt="mole" className="mole" />
          <img src={hole} alt="mole" className="mole" />
          <img src={mole} alt="mole" className="mole" />
          <img src={hole} alt="mole" className="mole" />
          <img src={hole} alt="mole" className="mole" />
          <img src={hole} alt="mole" className="mole" />
          <img src={hole} alt="mole" className="mole" />
          <img src={hole} alt="mole" className="mole" />
        </div>
      </div>
    </>
  );
}

export default App;
