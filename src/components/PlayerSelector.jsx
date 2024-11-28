import React, { useState } from "react";
import "./../index.css";

const PlayerSelector = ({ onSelect }) => {
  const defaultPlayers = [
    "Quân",
    "Hiếu",
    "Ngọc",
    "Nga",
    "Anh",
    "Bôn",
    "Mơ",
    "Hằng",
  ];
  const [players, setPlayers] = useState([...defaultPlayers]);
  const [selected, setSelected] = useState([]);
  const [newPlayer, setNewPlayer] = useState("");

  const handleAddPlayer = () => {
    if (newPlayer.trim() && !players.includes(newPlayer)) {
      setPlayers([...players, newPlayer]);
      setNewPlayer("");
    }
  };

  const handleSelect = (player) => {
    const updatedSelected = selected.includes(player)
      ? selected.filter((p) => p !== player)
      : [...selected, player];
    setSelected(updatedSelected);
  };

  const handleStartGame = () => {
    if (selected.length === 4) {
      onSelect(selected);
    } else {
      alert("Hãy chọn đủ 4 người chơi!");
    }
  };

  return (
    <div className="player-selector">
      <h2>Nhập tên người chơi</h2>
      <input
        type="text"
        value={newPlayer}
        onChange={(e) => setNewPlayer(e.target.value)}
        placeholder="Tên người chơi"
      />
      <button onClick={handleAddPlayer}>Thêm</button>

      <div className="player-list">
        {players.map((player, index) => (
          <div
            key={index}
            className={`player-item ${
              selected.includes(player) ? "selected" : ""
            }`}
            onClick={() => handleSelect(player)}
          >
            {player}
          </div>
        ))}
      </div>

      <button
        className="start-btn"
        onClick={handleStartGame}
        disabled={selected.length !== 4}
      >
        Bắt đầu
      </button>
    </div>
  );
};

export default PlayerSelector;
