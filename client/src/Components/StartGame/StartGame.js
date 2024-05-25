import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StartGame.css";

const StartGame = () => {
  const [gameId, setGameId] = useState(null);
  const [word, setWord] = useState("");
  const [guessed, setGuessed] = useState([]);
  const [attempts, setAttempts] = useState(6);
  const [letter, setLetter] = useState("");

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
    setWord(game.word);
    setGuessed(game.guessed);
    setAttempts(game.attempts);
  };

  const handleGuess = async () => {
    if (!letter) return;
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/guess`, { gameId, letter });
    const game = response.data;
    setGuessed(game.guessed);
    setAttempts(game.attempts);
    setLetter("");
  };

  const renderWord = () => {
    return word
      .split("")
      .map((char, index) => (guessed.includes(char) ? char : "_"))
      .join(" ");
  };

  return (
    <div className="hangman-container">
      <h1 className="title">Hangman</h1>
      <div className="word">Word: {renderWord()}</div>
      <div className="attempts">Attempts left: {attempts}</div>
      <div className="input-container">
        <input type="text" value={letter} onChange={(e) => setLetter(e.target.value)} maxLength="1" className="letter-input" />
        <button onClick={handleGuess} className="guess-button">
          Guess
        </button>
      </div>
      <button onClick={startNewGame} className="new-game-button">
        Start New Game
      </button>
    </div>
  );
};

export default StartGame;
