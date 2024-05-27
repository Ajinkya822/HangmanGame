import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Popup from "../Popup/Popup";
import { ReactTyped } from "react-typed";

const LandingPage = () => {
  const navigate = useNavigate();
  const [popupContent, setPopupContent] = useState(null);
  const [isResumeGameEnabled, setIsResumeGameEnabled] = useState(false);

  useEffect(() => {
    const storedGameId = localStorage.getItem("gameId"); //fetch game id
    setIsResumeGameEnabled(!!storedGameId); // Enable button if gameId exists
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };
  const showPopup = (content) => {
    setPopupContent(content);
  };

  const closePopup = () => {
    setPopupContent(null);
  };

  return (
    <>
      <div className="landing-page-parent">
        <div>
          <h1>
            <ReactTyped strings={["Welcome to Hangman"]} typeSpeed={100} loop />
          </h1>
        </div>

        <div className="landing-page-container">
          <div className="option" onClick={() => handleNavigation("/start-game")}>
            Start Game
          </div>
          <div className={`option ${!isResumeGameEnabled ? "disabled" : ""}`} onClick={() => isResumeGameEnabled && handleNavigation("/start-game")}>
            Resume Game
          </div>
          <div className="option" onClick={() => showPopup("Information About the Game")}>
            About Hangman
          </div>
          <div className="option" onClick={() => showPopup("How to Play")}>
            How to Play
          </div>
          <div className="option" onClick={() => showPopup("Support")}>
            Support
          </div>
          {popupContent && <Popup content={popupContent} closePopup={closePopup} />}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
