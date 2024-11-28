import React, { useState } from "react";

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
            {isEditingNames ? (
              playerNames.map((name, idx) => (
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
            ) : (
              playerNames.map((name, idx) => <th key={idx}>{name}</th>)
            )}
             <th>
              <button onClick={() => setIsEditingNames(!isEditingNames)}>
                {isEditingNames ? "Lưu tên" : "Sửa tên"}
              </button>
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
      {isEditing ? (
        players.map((_, idx) => (
          <td key={idx}>
            <input
              type="number"
              value={editedScores[idx]}
              onChange={(e) => handleChange(idx, e.target.value)}
            />
          </td>
        ))
      ) : (
        round.map((score, idx) => <td key={idx}>{score}</td>)
      )}
      <td>
        {isEditing ? (
          <button onClick={handleSave}>Lưu</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Sửa</button>
        )}
      </td>
    </tr>
  );
};

const RoundInput = ({ players, onSubmit }) => {
    const [roundScores, setRoundScores] = useState(players.map(() => 0));
    const [isPopupOpen, setIsPopupOpen] = useState(false);
  
    const handleChange = (index, value) => {
      if (/^-?\d*$/.test(value)) {
        const updatedScores = [...roundScores];
        updatedScores[index] = parseInt(value, 10) || 0;
        setRoundScores(updatedScores);
      }
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
        <button onClick={() => setIsPopupOpen(true)}>Nhập điểm</button>
        {isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>Nhập điểm</h3>
              {players.map((player, idx) => (
                <div key={idx} className="input-group">
                  <label>{player}</label>
                  <div className="input-container">
                    <button onClick={() => handleIncrement(idx, -1)}>-</button>
                    <input
                      type="text"
                      value={roundScores[idx]}
                      onChange={(e) => handleChange(idx, e.target.value)}
                    />
                    <button onClick={() => handleIncrement(idx, 1)}>+</button>
                  </div>
                </div>
              ))}
              <button onClick={handleSubmit}>Xác nhận</button>
              <button onClick={() => setIsPopupOpen(false)}>Hủy</button>
            </div>
          </div>
        )}
      </div>
    );
  };
  

export default ScoreTable;
