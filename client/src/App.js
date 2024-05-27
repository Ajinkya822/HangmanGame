import React, { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import StartGame from "./Components/StartGame/StartGame";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/start-game" element={<StartGame />} />
      </Routes>
    </Router>
  );
}

export default App;
