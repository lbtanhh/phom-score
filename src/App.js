import React, { useState } from "react";
import PlayerSelector from "./components/PlayerSelector";
import ScoreTable from "./components/ScoreTable";
import "./index.css";

const App = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleSelectPlayers = (selected) => {
    setSelectedPlayers(selected);
    setIsGameStarted(true);
  };

  return (
    <div className="app">
      {!isGameStarted ? (
        <PlayerSelector onSelect={handleSelectPlayers} />
      ) : (
        <ScoreTable players={selectedPlayers} />
      )}
    </div>
  );
};

export default App;
