import React from "react";
import "./Lostpopup.css";
import { useNavigate } from "react-router-dom";

const LossPopup = ({ word, startNewGame }) => {
  localStorage.removeItem("gameId");
  const navigate = useNavigate();
  const goToHomepage = () => {
    navigate("/");
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <img src="/images/sad.png" alt="Sad" className="sad left-sad" />
        <h2>You Lost</h2>
        <img src="/images/sad.png" alt="Sad" className="sad right-sad" />
        <p>The word was: {word}</p>
        <button onClick={startNewGame} className="popup-button">
          Start New Game
        </button>
        <button onClick={goToHomepage} className="popup-button">
          Main Menu
        </button>
      </div>
    </div>
  );
};

export default LossPopup;
