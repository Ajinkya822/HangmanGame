import React from "react";
import "./Lostpopup.css";

const LossPopup = ({ word, startNewGame }) => {
  localStorage.removeItem("gameId");
  const goToHomepage = () => {
    window.location.href = "http://localhost:3000/"; // Adjust the URL as needed
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
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default LossPopup;
