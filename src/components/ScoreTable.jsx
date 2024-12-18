import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { RoundRow } from "./RoundRow";
import { specialButtons } from "../constants/button";
import { RoundInput } from "./RoundInput";

const ScoreTable = ({ players }) => {
  const [playerNames, setPlayerNames] = useState(players);
  const [scores, setScores] = useState(players.map(() => 0));
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  localStorage.setItem("playerNames", JSON.stringify(playerNames));

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
            {playerNames.map((name, idx) => (
              <th key={idx}>{name}</th>
            ))}
            <th></th>
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
          <tr
            className="total-row"
            style={{
              color:
                scores.reduce((total, score) => total + score, 0) !== 0
                  ? "red"
                  : "inherit",
            }}
          >
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

export default ScoreTable;
