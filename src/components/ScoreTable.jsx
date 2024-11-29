import React, { useState } from "react";
import { Button, Flex } from "antd";

const specialButtons = [
  { label: "+ gà", type: "+gà" },
  { label: "- gà", type: "-gà" },
  { label: "Tứ Quý", type: "Tứ Quý" },
  { label: "2K", type: "2K" },
  { label: "3K", type: "3K" },
  { label: "4K", type: "4K" },
  { label: "Ù", type: "Ù" },
  { label: "Ù tròn", type: "Ù tròn" },
  { label: "Ù khan", type: "Ù khan" },
  { label: "Nhất", type: "Nhất" },
  { label: "Nhì", type: "Nhì" },
  { label: "Ba", type: "Ba" },
  { label: "Chót", type: "Chót" },
  { label: "Cháy", type: "Cháy" },
];

const ScoreTable = ({ players }) => {
  const [playerNames, setPlayerNames] = useState(players);
  const [scores, setScores] = useState(players.map(() => 0));
  const [rounds, setRounds] = useState([]);
  const [isEditingNames, setIsEditingNames] = useState(false);


  const handleAddRound = (roundScores) => {
    const updatedScores = scores.map((score, idx) => score + roundScores[idx]);
    setScores(updatedScores);
    setRounds([...rounds, roundScores]);
  };

  const handleEditRound = (roundIndex, newScores) => {
    const updatedRounds = rounds.map((round, idx) =>
      idx === roundIndex ? newScores : round
    );

    setRounds(updatedRounds);

    // Recalculate total scores
    const updatedScores = players.map((_, idx) =>
      updatedRounds.reduce((total, round) => total + round[idx], 0)
    );
    setScores(updatedScores);
  };

  const handleDeleteRound = (roundIndex) => {
    const updatedRounds = rounds.filter((_, idx) => idx !== roundIndex);

    // Recalculate total scores after deletion
    const updatedScores = players.map((_, idx) =>
      updatedRounds.reduce((total, round) => total + round[idx], 0)
    );

    setRounds(updatedRounds);
    setScores(updatedScores);
  };

  return (
    <div className="score-table">
      <h2>Bảng tính điểm</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            {playerNames.map((name, idx) => <th key={idx}>{name}</th>)}
            <th>
            </th>
          </tr>
        </thead>
        <tbody>
          {rounds.map((round, idx) => (
            <RoundRow
              key={idx}
              index={idx}
              round={round}
              players={players}
              onEdit={handleEditRound}
              onDelete={handleDeleteRound}
            />
          ))}
          <tr className="total-row">
            <td>Tổng</td>
            {scores.map((score, idx) => (
              <td key={idx}>{score}</td>
            ))}
            <td>{scores.reduce((total, score) => total + score, 0)}</td>
          </tr>
        </tbody>
      </table>

      <RoundInput players={players} onSubmit={handleAddRound} />
    </div>
  );
};


const RoundRow = ({ index, round, players, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedScores, setEditedScores] = useState(round);

  const handleChange = (playerIndex, value) => {
    const updatedScores = [...editedScores];
    updatedScores[playerIndex] = parseInt(value, 10) || 0;
    setEditedScores(updatedScores);
  };

  const handleSave = () => {
    onEdit(index, editedScores);
    setIsEditing(false);
  };

  return (
    <tr>
      <td>{index + 1}</td>
      {isEditing
        ? players.map((_, idx) => (
            <td key={idx}>
              <input
                type="number"
                value={editedScores[idx]}
                onChange={(e) => handleChange(idx, e.target.value)}
              />
            </td>
          ))
        : round.map((score, idx) => <td key={idx}>{score}</td>)}
      <td>
        {isEditing ? (
          <Button onClick={handleSave}>Lưu</Button>
        ) : (
          <Button onClick={() => onDelete(index)} style={{ marginLeft: 8 }} color="danger" variant="solid">
          Xóa
        </Button>
        )}

      </td>
    </tr>
  );
};


const RoundInput = ({ players, onSubmit }) => {
  const [roundScores, setRoundScores] = useState(players.map(() => 0));
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activePlayer, setActivePlayer] = useState(null); // Người chơi đang được chọn
  const [nhatPlayer, setNhatPlayer] = useState(null);

  const handleSpecialScore = (type) => {
    if (activePlayer === null) return; // Không làm gì nếu chưa chọn người chơi
    const updatedScores = [...roundScores];
  
    switch (type) {
      case "+gà":
        updatedScores[activePlayer] += 1;
        break;
      case "-gà":
        updatedScores[activePlayer] -= 1;
        break;
      case "Tứ Quý":
        updatedScores[activePlayer] += 3;
        updatedScores.forEach((_, idx) => {
          if (idx !== activePlayer) updatedScores[idx] -= 1;
        });
        break;
      case "2K":
        updatedScores[activePlayer] += 6;
        updatedScores.forEach((_, idx) => {
          if (idx !== activePlayer) updatedScores[idx] -= 2;
        });
        break;
      case "3K":
        updatedScores[activePlayer] += 9;
        updatedScores.forEach((_, idx) => {
          if (idx !== activePlayer) updatedScores[idx] -= 3;
        });
        break;
      case "4K":
        updatedScores[activePlayer] += 30;
        updatedScores.forEach((_, idx) => {
          if (idx !== activePlayer) updatedScores[idx] -= 10;
        });
        break;
      case "Ù":
        updatedScores[activePlayer] += 15;
        updatedScores.forEach((_, idx) => {
          if (idx !== activePlayer) updatedScores[idx] -= 5;
        });
        break;
      case "Ù tròn":
        updatedScores[activePlayer] += 30;
        updatedScores.forEach((_, idx) => {
          if (idx !== activePlayer) updatedScores[idx] -= 10;
        });
        break;
      case "Ù khan":
        updatedScores[activePlayer] += 12;
        updatedScores.forEach((_, idx) => {
          if (idx !== activePlayer) updatedScores[idx] -= 4;
        });
        break;
      case "Cháy":
        updatedScores[activePlayer] -= 4;
        break;
  
      case "Nhất":
        updatedScores[activePlayer] += 6
        break;
      case "Nhì":
        updatedScores[activePlayer] -= 1;
        break;
      case "Ba":
        updatedScores[activePlayer] -= 2;
        break;
      case "Chót":
        updatedScores[activePlayer] -= 3;
        break;
      default:
        break;
    }
    setRoundScores(updatedScores);
  };
  

    const handleIncrement = (index, amount) => {
    const updatedScores = [...roundScores];
    updatedScores[index] += amount;
    setRoundScores(updatedScores);
  };
  

  const handleChange = (index, value) => {
    if (/^-?\d*$/.test(value)) {
      const updatedScores = [...roundScores];
      updatedScores[index] = parseInt(value, 10) || 0;
      setRoundScores(updatedScores);
    }
  };

  const handleReset = () => {
    setRoundScores(players.map(() => 0)); // Reset all scores to 0
    setActivePlayer(null); // Reset người chơi được chọn
  };

  const handleSubmit = () => {
    onSubmit(roundScores);
    setRoundScores(players.map(() => 0));
    setIsPopupOpen(false);
  };

  return (
    <div>
      {/* Button Nhập điểm bên ngoài popup */}
      <Button onClick={() => setIsPopupOpen(true)} style={{ marginTop: 10 }} color="primary" variant="solid">
        Nhập điểm
      </Button>
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Nhập điểm</h3>
            {players.map((player, idx) => (
              <div
                key={idx}
                className={`input-group ${
                  activePlayer === idx ? "active" : ""
                }`}
                onClick={() => setActivePlayer(idx)} // Chọn người chơi
                style={{
                  border: activePlayer === idx ? "2px solid blue" : "none",
                  padding: "5px",
                  cursor: "pointer",
                }}
              >
                <label>{player}</label>
                <div className="input-container">
                <Button onClick={() => handleIncrement(idx, -5)} color="primary" variant="outlined">-5</Button>
                <Button onClick={() => handleIncrement(idx, -1)} color="primary" variant="outlined">-</Button>
                  <input
                    type="text"
                    value={roundScores[idx]}
                    onChange={(e) => handleChange(idx, e.target.value)}
                  />
                  <Button onClick={() => handleIncrement(idx, 1)} color="primary" variant="outlined">+</Button>
                  <Button onClick={() => handleIncrement(idx, 5)} color="primary" variant="outlined">+5</Button>
                </div>
              </div>
            ))}

            {/* Danh sách button chỉ áp dụng cho activePlayer */}
            <div className="button-wrapper" style={{ marginTop: "20px" }}>
              {specialButtons.map(({ label, type }, i) => (
                <Button
                  key={i}
                  onClick={() => handleSpecialScore(type)}
                  style={{ margin: "5px" }}
                  disabled={activePlayer === null} // Chỉ cho phép khi có người được chọn
                >
                  {label}
                </Button>
              ))}
            </div>

            <div style={{ marginTop: "20px" }}>
              <Button
                type="primary"
                onClick={handleSubmit}
                style={{ marginRight: 10, marginTop: 10 }}
              >
                Xác nhận
              </Button>
              <Button onClick={handleReset} style={{ marginRight: 10 }} color="primary" variant="outlined">
                Reset
              </Button>
              <Button color="danger" variant="solid" onClick={() => setIsPopupOpen(false)}>Hủy</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreTable;
