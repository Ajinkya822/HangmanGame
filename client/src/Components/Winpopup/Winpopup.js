import React from "react";
import "./Winpopup.css";
import { useNavigate } from "react-router-dom";
const WinPopup = ({ startNewGame }) => {
  localStorage.removeItem("gameId");
  const navigate = useNavigate();
  const goToHomepage = () => {
    navigate("/");
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>You Won! Yay!</h2>
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

export default WinPopup;
