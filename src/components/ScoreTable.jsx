import React, { useState } from "react";
import { Button, Flex } from "antd";

const specialButtons = [
  { label: "+ gà", type: "+gà" },
  { label: "- gà", type: "-gà" },
  { label: "tứ quý", type: "tứ quý" },
  { label: "2K", type: "2K" },
  { label: "3K", type: "3K" },
  { label: "4K", type: "4K" },
  { label: "Ù", type: "Ù" },
  { label: "ù tròn", type: "ù tròn" },
  { label: "cháy", type: "cháy" },
  { label: "ù khan", type: "ù khan" },
];

const ScoreTable = ({ players }) => {
  const [playerNames, setPlayerNames] = useState(players);
  const [scores, setScores] = useState(players.map(() => 0));
  const [rounds, setRounds] = useState([]);
  const [isEditingNames, setIsEditingNames] = useState(false);

  const handleSaveNames = (newNames) => {
    setPlayerNames(newNames);
    setIsEditingNames(false);
  };

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

  return (
    <div className="score-table">
      <h2>Bảng tính điểm</h2>
      <table>
        <thead>
          <tr>
            <th>Ván</th>
            {isEditingNames
              ? playerNames.map((name, idx) => (
                  <th key={idx}>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        const updatedNames = [...playerNames];
                        updatedNames[idx] = e.target.value;
                        setPlayerNames(updatedNames);
                      }}
                    />
                  </th>
                ))
              : playerNames.map((name, idx) => <th key={idx}>{name}</th>)}
            <th>
              <Button onClick={() => setIsEditingNames(!isEditingNames)}>
                {isEditingNames ? "Lưu tên" : "Sửa tên"}
              </Button>
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

const RoundRow = ({ index, round, players, onEdit }) => {
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
          <Button onClick={() => setIsEditing(true)}>Sửa</Button>
        )}
      </td>
    </tr>
  );
};

const RoundInput = ({ players, onSubmit }) => {
  const [roundScores, setRoundScores] = useState(players.map(() => 0));
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSpecialScore = (playerIndex, type) => {
    const updatedScores = [...roundScores];
    switch (type) {
      case "+gà":
        updatedScores[playerIndex] += 1;
        break;
      case "-gà":
        updatedScores[playerIndex] -= 1;
        break;
      case "tứ quý":
        updatedScores[playerIndex] += 3;
        updatedScores.forEach((_, idx) => {
          if (idx !== playerIndex) updatedScores[idx] -= 1;
        });
        break;
      case "2K":
        updatedScores[playerIndex] += 6;
        updatedScores.forEach((_, idx) => {
          if (idx !== playerIndex) updatedScores[idx] -= 2;
        });
        break;
      case "3K":
        updatedScores[playerIndex] += 9;
        updatedScores.forEach((_, idx) => {
          if (idx !== playerIndex) updatedScores[idx] -= 3;
        });
        break;
      case "4K":
        updatedScores[playerIndex] += 30;
        updatedScores.forEach((_, idx) => {
          if (idx !== playerIndex) updatedScores[idx] -= 10;
        });
        break;
      case "Ù":
        updatedScores[playerIndex] += 15;
        updatedScores.forEach((_, idx) => {
          if (idx !== playerIndex) updatedScores[idx] -= 5;
        });
        break;
      case "ù tròn":
        updatedScores[playerIndex] += 30;
        updatedScores.forEach((_, idx) => {
          if (idx !== playerIndex) updatedScores[idx] -= 10;
        });
        break;
      case "cháy":
        updatedScores[playerIndex] -= 4;
        break;
      case "ù 40k":
        updatedScores[playerIndex] += 12;
        updatedScores.forEach((_, idx) => {
          if (idx !== playerIndex) updatedScores[idx] -= 4;
        });
        break;
      default:
        break;
    }
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
  };

  const handleIncrement = (index, amount) => {
    const updatedScores = [...roundScores];
    updatedScores[index] += amount;
    setRoundScores(updatedScores);
  };

  const handleSubmit = () => {
    onSubmit(roundScores);
    setRoundScores(players.map(() => 0));
    setIsPopupOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setIsPopupOpen(true)} style={{ marginTop: 10 }}>
        Nhập điểm
      </Button>
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Nhập điểm</h3>
            {players.map((player, idx) => (
              <div key={idx} className="input-group">
                <label>{player}</label>
                <div className="input-container">
                  <div className="">
                    <Button onClick={() => handleIncrement(idx, -1)}>-</Button>
                    <input
                      type="text"
                      value={roundScores[idx]}
                      onChange={(e) => handleChange(idx, e.target.value)}
                    />
                    <Button onClick={() => handleIncrement(idx, 1)}>+</Button>
                  </div>
                   <div className="button_wrapper">
                    {specialButtons.map(({ label, type }, i) => (
                      <Button
                        key={i}
                        onClick={() => handleSpecialScore(idx, type)}
                        style={{ margin: "5px" }}
                      >
                        {label}
                      </Button>
                    ))}
                   </div>
                </div>
              </div>
            ))}
            <Button
              onClick={handleSubmit}
              style={{ marginRight: 10, marginTop: 10 }}
            >
              Xác nhận
            </Button>
            <Button onClick={handleReset} style={{ marginRight: 10 }}>
                Reset
              </Button>
            <Button onClick={() => setIsPopupOpen(false)}>Hủy</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreTable;
