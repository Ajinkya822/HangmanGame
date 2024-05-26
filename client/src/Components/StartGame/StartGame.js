import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./StartGame.css";
import HintPopup from "../HintPopup/Hintpopup";
import LossPopup from "../LostPopup/Lostpopup";
import WinPopup from "../Winpopup/Winpopup";
import { useNavigate } from "react-router-dom";

const StartGame = () => {
  const [gameId, setGameId] = useState(null);
  const [word, setWord] = useState("");
  const [guessed, setGuessed] = useState([]);
  const [attempts, setAttempts] = useState(6);
  const [letter, setLetter] = useState("");
  const correctGuessSound = useRef(null);
  const inCorrectGuessSound = useRef(null);
  const [hint, setHint] = useState(""); // State for the hint
  const [showHintPopup, setShowHintPopup] = useState(false);
  const [showLossPopup, setShowLossPopup] = useState(false);
  const [showWinPopup, setShowWinPopup] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedGameId = localStorage.getItem("gameId");
    console.log("Fetching existing session id ", storedGameId);
    if (storedGameId) {
      fetchGameState(storedGameId);
    } else {
      startNewGame();
    }
  }, []);

  const startNewGame = async () => {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/start-new-game`);
    const { gameId } = response.data;
    localStorage.setItem("gameId", gameId);
    fetchGameState(gameId);
    setShowLossPopup(false);
    setShowWinPopup(false);
    setShowFireworks(false);
  };

  const fetchGameState = async (gameId) => {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/game-state/${gameId}`);
    const game = response.data;
    setGameId(gameId);
    setWord(game.word.toLowerCase());
    setGuessed(game.guessed.map((letter) => letter.toLowerCase()));
    setAttempts(game.attempts);
    fetchHint(game.word);
  };

  const fetchHint = async (word) => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (response.data && response.data[0] && response.data[0].meanings && response.data[0].meanings[0]) {
        const hint = response.data[0].meanings[0].definitions[0].definition;
        setHint(hint);
      } else {
        setHint("Sorry, no hint available for the given word in our Dictionary.");
      }
    } catch (error) {
      //console.log("Error is ", error);
      setHint("Sorry, no hint available for the given word in our Dictionary.");
    }
  };

  const handleGuess = async (letter) => {
    const lowerCaseLetter = letter.toLowerCase();

    if (!lowerCaseLetter) return;
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/guess-letter`, { gameId, letter: lowerCaseLetter });
    const game = response.data;
    console.log("response ", game);

    // Play sound based on whether the guess was correct or not

    if (game.word.indexOf(lowerCaseLetter) > -1) {
      correctGuessSound.current.play();
    } else {
      inCorrectGuessSound.current.play();
    }

    setGuessed(game.guessed.map((lowerCaseLetter) => lowerCaseLetter.toLowerCase()));
    setAttempts(game.attempts);
    setLetter("");

    if (game.attempts === 0) {
      setShowLossPopup(true);
    }
    // Check if the word is completely guessed
    const isWordGuessed = game.word.split("").every((char) => game.guessed.includes(char));
    if (isWordGuessed) {
      setShowWinPopup(true);
      if (isWordGuessed) {
        setShowWinPopup(true);
        setShowFireworks(true); // Show fireworks
        setTimeout(() => setShowFireworks(false), 3000); // Hide fireworks after 3 seconds
      }
    }
  };

  const renderWord = () => {
    return word
      .split("")
      .map((char, index) => (guessed.includes(char.toLowerCase()) ? char : "_"))
      .join(" ");
  };

  const handleButtonClick = (letter) => {
    handleGuess(letter);
  };

  const clearSession = () => {
    localStorage.removeItem("gameId");
    setGameId(null);
    setWord("");
    setGuessed([]);
    setAttempts(6);
    setHint("");
    startNewGame();
  };

  const goToMainMenu = () => {
    localStorage.removeItem("gameId");
    setGameId(null);
    setWord("");
    setGuessed([]);
    setAttempts(6);
    setHint("");
    navigate("/");
    //window.location.href = `${process.env.REACT_APP_CLIENT_HOME_URL}`;
  };

  const renderKeyboard = () => {
    const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return keys.map((key) => (
      <button key={key} className="key-button" onClick={() => handleButtonClick(key)} disabled={guessed.includes(key.toLowerCase())}>
        {key}
      </button>
    ));
  };

  const renderHangmanImage = () => {
    const imageUrl = `/images/hangman-${6 - attempts}.svg`;
    return <img src={imageUrl} alt={`Hangman stage ${6 - attempts}`} className="hangman-image" />;
  };

  return (
    <>
      <audio ref={correctGuessSound} src="/sounds/correctsound.mp3" />
      <audio ref={inCorrectGuessSound} src="/sounds/incorrectsound.mp3" />
      <div className="new-game-page-container">
        <div className="hangman-container">
          <h1 className="title">Hangman</h1>
          {renderHangmanImage()}
          <div className="word">Word: {renderWord()}</div>
          <div className="attempts">Attempts left: {attempts}</div>

          <div className="keyboard-container">{renderKeyboard()}</div>

          <button onClick={clearSession} className="button">
            New Word
          </button>
          <button onClick={() => setShowHintPopup(true)} className="button">
            Show Hint
          </button>
          <button onClick={goToMainMenu} className="button">
            Exit Game
          </button>
        </div>
      </div>
      {showHintPopup && <HintPopup hint={hint} closePopup={() => setShowHintPopup(false)} />}
      {showLossPopup && <LossPopup word={word} startNewGame={clearSession} />}
      {showWinPopup && <WinPopup startNewGame={clearSession} />}
      {showFireworks && (
        <div className="fireworks-container">
          <img src="/images/winimage.gif" alt="Fireworks" className="fireworks" />
        </div>
      )}
    </>
  );
};

export default StartGame;
