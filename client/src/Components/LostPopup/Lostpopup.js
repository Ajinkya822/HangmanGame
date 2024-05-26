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
        <h2>You Lost</h2>
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
