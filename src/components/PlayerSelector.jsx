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

  const savedScores = JSON.parse(localStorage.getItem("scores") || "[]");
  const savedPlayerNames = JSON.parse(
    localStorage.getItem("playerNames") || "[]"
  );

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

      {savedScores.length !== 0 && savedPlayerNames.length !== 0 && (
        <div className="score-table">
          <h2>Tổng điểm ván trước</h2>
          <table>
            <thead>
              <tr>
                {savedPlayerNames?.map((name, idx) => (
                  <th key={idx}>{name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="total-row">
                {savedScores.map((score, idx) => (
                  <td key={idx}>{score}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PlayerSelector;
