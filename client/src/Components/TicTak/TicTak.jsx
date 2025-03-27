


import React, { useState } from "react";
import './TicTak.css';

const TicTak = () => {
  const [gameBoard, setGameBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [isGameActive, setIsGameActive] = useState(false);
  const [players, setPlayers] = useState({ X: "Player X", O: "Player O" });
  const [gameMessage, setGameMessage] = useState("X's Turn");
  const [winnerMessage, setWinnerMessage] = useState("");

  const [showNamesDialog, setShowNamesDialog] = useState(true);
  const [showResultDialog, setShowResultDialog] = useState(false);

  const handleNameSubmit = (event) => {
    event.preventDefault();
    const player1 = event.target.name1.value || "Player X";
    const player2 = event.target.name2.value || "Player O";
    setPlayers({ X: player1, O: player2 });
    setIsGameActive(true);
    setGameMessage(`${player1}'s Turn`);
    setShowNamesDialog(false);
  };

  const checkWinner = (board) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]
    ];

    for (let [a, b, c] of winPatterns) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return the winning player ("X" or "O")
      }
    }

    return board.includes("") ? null : "Tie"; // Check if board is full
  };

  const handleBoardClick = (index) => {
    if (!isGameActive || gameBoard[index] !== "") return;

    const newBoard = [...gameBoard];
    newBoard[index] = currentPlayer;
    setGameBoard(newBoard);

    const winner = checkWinner(newBoard);

    if (winner) {
      setIsGameActive(false);
      if (winner === "Tie") {
        setWinnerMessage("It's a Tie!");
      } else {
        setWinnerMessage(`${players[winner]} Wins!`);
      }
      setShowResultDialog(true);
    } else {
      const nextPlayer = currentPlayer === "X" ? "O" : "X";
      setCurrentPlayer(nextPlayer);
      setGameMessage(`${players[nextPlayer]}'s Turn`);
    }
  };

  // Mobile touch support
  const mobileTouchEvent = (event, index) => {
    event.preventDefault();
    handleBoardClick(index);
  };

  const resetGame = () => {
    setGameBoard(["", "", "", "", "", "", "", "", ""]);
    setCurrentPlayer("X");
    setIsGameActive(true);
    setGameMessage(`${players["X"]}'s Turn`);
  };

  return (
    <div>
      <h3>JavaScript Tic-Tac-Toe Game</h3>
      <div id="game-message">{gameMessage}</div>

      <div className="board-container">
        {gameBoard.map((value, index) => (
          <div
            key={index}
            className="boards"
            data-index={index}
            onClick={() => handleBoardClick(index)}
            onTouchStart={(e) => mobileTouchEvent(e, index)} // Mobile support
          >
            {value}
          </div>
        ))}
      </div>

      <button id="reset-btn" onClick={resetGame}>
        Reset Game
      </button>

      {showNamesDialog && (
        <dialog open className="names-dialog">
          <form onSubmit={handleNameSubmit}>
            <p>Enter Player Names:</p>
            <label>Player X: <input type="text" name="name1" required /></label>
            <label>Player O: <input type="text" name="name2" required /></label>
            <button type="submit">Start Game</button>
          </form>
        </dialog>
      )}

      {showResultDialog && (
        <dialog open className="result-dialog">
          <h1 id="winner-message">{winnerMessage}</h1>
          <button onClick={() => setShowResultDialog(false)}>OK</button>
        </dialog>
      )}
    </div>
  );
};

export default TicTak;