import React from "react";
import "./Popup.css";

const Popup = ({ content, closePopup }) => {
  return (
    <div className="popup-container-landingpage">
      <div className="popup-content-landingpage">
        <span className="close" onClick={closePopup}>
          &times;
        </span>
        <h2 style={{ textAlign: "center" }}>{content}</h2>
        {getPopupContent(content)}
      </div>
    </div>
  );
};

const getPopupContent = (content) => {
  switch (content) {
    case "Information About the Game":
      return (
        <div>
          <ol>
            <li>Hangman is a timeless word-guessing game that has entertained people of all ages for generations. It's both fun and educational, helping to improve vocabulary and spelling skills. </li>
            <li>Originally a paper-and-pencil game, Hangman has evolved into various digital formats, making it accessible on computers, tablets, and smartphones.</li>
            <li>Early computer versions of Hangman appeared in the late 1970s and early 1980s, often included in educational software packages.</li>
            <li>Hangman is a classic game that has stood the test of time. From its uncertain beginnings in Victorian England to its modern digital incarnations, it continues to be a beloved game for learning and entertainment. Its enduring popularity is a testament to the simple yet engaging challenge it offers to players of all ages.</li>
          </ol>
        </div>
      );
    case "How to Play":
      return (
        <div>
          <ol>
            <li>Guess Letters: Start guessing letters you think might be in the word.</li>
            <li>Correct Guesses: If the guessed letter is in the word, it will be revealed in the correct position(s).</li>
            <li>Incorrect Guesses: If the guessed letter is not in the word, a part of the hangman drawing will be added.</li>
            <li>Hints: Use hints to get clues about the word.</li>
            <li>Tips: Start with common vowels (A, E, I, O, U) and consonants (R, S, T, L, N).</li>
          </ol>
        </div>
      );
    case "Support":
      return (
        <div>
          <ol>
            <li>Email: ajinkyanagare8@gmail.com</li>
            <li>Phone: +12135513271</li>
          </ol>
        </div>
      );
    default:
      return "";
  }
};

export default Popup;
