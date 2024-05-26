import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./StartGame.css";
import HintPopup from "../HintPopup/Hintpopup";

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
    console.log("Starting new game");
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/start`);
    const { gameId } = response.data;
    localStorage.setItem("gameId", gameId);
    fetchGameState(gameId);
  };

  const fetchGameState = async (gameId) => {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/state/${gameId}`);
    const game = response.data;
    setGameId(gameId);
    setWord(game.word.toLowerCase());
    setGuessed(game.guessed.map((letter) => letter.toLowerCase()));
    setAttempts(game.attempts);
    fetchHint(game.word); // Fetch the hint for the word
  };

  const fetchHint = async (word) => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (response.data && response.data[0] && response.data[0].meanings && response.data[0].meanings[0]) {
        const hint = response.data[0].meanings[0].definitions[0].definition;
        setHint(hint);
      } else {
        setHint("No hint available.");
      }
    } catch (error) {
      console.log("Error is ", error);
      setHint("No hint available.");
    }
  };

  const handleGuess = async (letter) => {
    const lowerCaseLetter = letter.toLowerCase();
    console.log("in handle guess step 2 letter is ", lowerCaseLetter);
    if (!lowerCaseLetter) return;
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/guess`, { gameId, letter: lowerCaseLetter });
    const game = response.data;
    console.log("response after guessing step 3 ", game);

    // Play sound based on whether the guess was correct or not

    if (game.word.indexOf(lowerCaseLetter) > -1) {
      correctGuessSound.current.play();
    } else {
      inCorrectGuessSound.current.play();
    }

    setGuessed(game.guessed.map((lowerCaseLetter) => lowerCaseLetter.toLowerCase()));
    setAttempts(game.attempts);
    setLetter("");
  };

  const renderWord = () => {
    return word
      .split("")
      .map((char, index) => (guessed.includes(char.toLowerCase()) ? char : "_"))
      .join(" ");
  };

  const handleButtonClick = (letter) => {
    console.log("Letter is pressed step 1 ", letter);
    //setLetter(letter);
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

  const renderKeyboard = () => {
    const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return keys.map((key) => (
      <button key={key} className="key-button" onClick={() => handleButtonClick(key)} disabled={guessed.includes(key.toLowerCase())}>
        {key}
      </button>
    ));
  };

  return (
    <>
      <audio ref={correctGuessSound} src="/sounds/correctsound.mp3" />
      <audio ref={inCorrectGuessSound} src="/sounds/incorrectsound.mp3" />
      <div className="new-game-page-container">
        <div className="hangman-container">
          <h1 className="title">Hangman</h1>
          <div className="word">Word: {renderWord()}</div>
          <div className="attempts">Attempts left: {attempts}</div>

          <div className="keyboard-container">{renderKeyboard()}</div>

          <button onClick={clearSession} className="button">
            Start New Game
          </button>
          <button onClick={() => setShowHintPopup(true)} className="button">
            Show Hint
          </button>
        </div>
      </div>
      {showHintPopup && <HintPopup hint={hint} closePopup={() => setShowHintPopup(false)} />}
    </>
  );
};

export default StartGame;
