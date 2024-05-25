import React, { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import StartGame from "./Components/StartGame/StartGame";

function App() {
  const [restore, setRestore] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // Add a state to ensure initial check

  useEffect(() => {
    const storedGameId = localStorage.getItem("gameId");
    console.log("Landing page session id is", storedGameId);

    if (storedGameId) {
      setRestore(true);
    } else {
      setRestore(false);
    }
    setIsChecked(true);
  }, []);

  useEffect(() => {
    console.log("Restore value is now:", restore);
  }, [restore]);

  if (!isChecked) {
    return null; // Render nothing until the check is done
  }

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={restore ? <Navigate replace to={"/start-game"} /> : <LandingPage />} />
        <Route path="/start-game" element={<StartGame />} />
      </Routes>
    </Router>
  );
}

export default App;
