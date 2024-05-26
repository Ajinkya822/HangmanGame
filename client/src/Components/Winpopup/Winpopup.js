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
        <img src="/images/trophy.png" alt="Trophy" className="trophy left-trophy" />
        <h2>You Won! Yay!</h2>
        <img src="/images/trophy.png" alt="Trophy" className="trophy right-trophy" />
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
