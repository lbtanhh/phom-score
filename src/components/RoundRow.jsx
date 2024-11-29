import React, { useState } from "react";
import { Button } from "antd";

export const RoundRow = ({ index, round, players, onEdit, onDelete }) => {
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