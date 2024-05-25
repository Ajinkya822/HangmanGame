import React from "react";
import "./Popup.css";

const Popup = ({ content, closePopup }) => {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <span className="close" onClick={closePopup}>
          &times;
        </span>
        <h2>{content}</h2>
        <p>{getPopupContent(content)}</p>
      </div>
    </div>
  );
};

const getPopupContent = (content) => {
  switch (content) {
    case "Information About the Game":
      return "Here you can provide detailed information about the game.";
    case "How to Play":
      return "Here are the instructions on how to play the game...";
    case "Support":
      return "For support, contact us at support@example.com.";
    default:
      return "";
  }
};

export default Popup;
