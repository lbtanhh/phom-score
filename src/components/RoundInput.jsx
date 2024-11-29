import React, { useState } from "react";
import { Button } from "antd";
import { specialButtons } from "../constants/button";

export const RoundInput = ({ players, onSubmit }) => {
  const [roundScores, setRoundScores] = useState(players.map(() => 0));
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activePlayer, setActivePlayer] = useState(null); // Người chơi đang được chọn

  // Cập nhật điểm cho người chơi
  const updateScores = (newScores) => setRoundScores([...newScores]);

  // Cập nhật điểm cho từng người chơi
  const handleIncrement = (index, amount) => {
    const updatedScores = [...roundScores];
    updatedScores[index] += amount;
    updateScores(updatedScores);
  };

  // Xử lý sự kiện thay đổi điểm
  const handleChange = (index, value) => {
    if (/^-?\d*$/.test(value)) {
      const updatedScores = [...roundScores];
      updatedScores[index] = parseInt(value, 10) || 0;
      updateScores(updatedScores);
    }
  };

  // Reset lại điểm
  const handleReset = () => {
    updateScores(players.map(() => 0));
    setActivePlayer(null); // Reset người chơi được chọn
  };

  // Cập nhật điểm cho các loại điểm đặc biệt
  const handleSpecialScore = (type) => {
    if (activePlayer === null) return; // Không làm gì nếu chưa chọn người chơi

    const updatedScores = [...roundScores];
    
    const specialScores = {
      "+gà": () => updatedScores[activePlayer] += 1,
      "-gà": () => updatedScores[activePlayer] -= 1,
      "Tứ Quý": () => {
        updatedScores[activePlayer] += 3;
        updatedScores.forEach((_, idx) => {
          if (idx !== activePlayer) updatedScores[idx] -= 1;
        });
      },
      "2K": () => {
        updatedScores[activePlayer] += 6;
        updatedScores.forEach((_, idx) => {
          if (idx !== activePlayer) updatedScores[idx] -= 2;
        });
      },
      "3K": () => {
        updatedScores[activePlayer] += 9;
        updatedScores.forEach((_, idx) => {
          if (idx !== activePlayer) updatedScores[idx] -= 3;
        });
      },
      "4K": () => {
        updatedScores[activePlayer] += 30;
        updatedScores.forEach((_, idx) => {
          if (idx !== activePlayer) updatedScores[idx] -= 10;
        });
      },
      "Ù": () => {
        updatedScores[activePlayer] += 15;
        updatedScores.forEach((_, idx) => {
          if (idx !== activePlayer) updatedScores[idx] -= 5;
        });
      },
      "Ù tròn": () => {
        updatedScores[activePlayer] += 30;
        updatedScores.forEach((_, idx) => {
          if (idx !== activePlayer) updatedScores[idx] -= 10;
        });
      },
      "Ù khan": () => {
        updatedScores[activePlayer] += 12;
        updatedScores.forEach((_, idx) => {
          if (idx !== activePlayer) updatedScores[idx] -= 4;
        });
      },
      "Cháy": () => updatedScores[activePlayer] -= 4,
      "Nhất": () => updatedScores[activePlayer] += 6,
      "Nhì": () => updatedScores[activePlayer] -= 1,
      "Ba": () => updatedScores[activePlayer] -= 2,
      "Chót": () => updatedScores[activePlayer] -= 3,
    };

    // Kiểm tra và gọi hàm cập nhật điểm cho loại đặc biệt
    if (specialScores[type]) {
      specialScores[type]();
      updateScores(updatedScores);
    }
  };

  // Xử lý việc submit điểm
  const handleSubmit = () => {
    onSubmit(roundScores);
    setRoundScores(players.map(() => 0));
    setIsPopupOpen(false);
  };

  return (
    <div>
      <Button
        onClick={() => setIsPopupOpen(true)}
        style={{ marginTop: 10 }}
        color="primary"
        variant="solid"
      >
        Nhập điểm
      </Button>
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Nhập điểm</h3>
            {players.map((player, idx) => (
              <div
                key={idx}
                className={`input-group ${activePlayer === idx ? "active" : ""}`}
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
              <Button
                onClick={handleReset}
                style={{ marginRight: 10 }}
                color="primary"
                variant="outlined"
              >
                Reset
              </Button>
              <Button
                color="danger"
                variant="solid"
                onClick={() => setIsPopupOpen(false)}
              >
                Hủy
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
