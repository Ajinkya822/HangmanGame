const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const axios = require("axios");
app.use(express.json());

//api for testing
// app.get("/api", (req, res) => {
//     res.json({"users":["user one", "user ten", "user four"]})
// })

let gameCurrentState = {}; //Save information related to game state
let randomWordGenerateApi = "https://random-word-api.herokuapp.com/word?number=1";

const getRandomWord = async () => {
  const response = await axios.get(randomWordGenerateApi);
  return response.data[0];
};

app.post("/start-new-game", async (req, res) => {
  const gameId = Math.random().toString(36).substring(2, 15);
  const word = await getRandomWord();
  gameCurrentState[gameId] = {
    word,
    guessed: [],
    attempts: 6,
  };
  res.json({ gameId });
});

app.post("/guess-letter", (req, res) => {
  const { gameId, letter } = req.body;
  const game = gameCurrentState[gameId];

  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }

  if (game.guessed.includes(letter)) {
    return res.json(game);
  }

  game.guessed.push(letter);
  if (!game.word.includes(letter)) {
    game.attempts -= 1;
  }

  res.json(game);
});

app.get("/game-state/:gameId", (req, res) => {
  const { gameId } = req.params;
  const game = gameCurrentState[gameId];

  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }

  res.json(game);
});

app.listen(5678, () => {
  console.log("Server is listening on port 5678");
});
