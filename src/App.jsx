import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from './components/Log';
import GameOver from './components/GameOver';
import { useState } from "react";

const WINNING_COMBINATION = [
  [{row: 0, column: 0},{row: 0, column: 1}, {row: 0, column: 2}],
  [{row: 1, column: 0},{row: 1, column: 1}, {row: 1, column: 2}],
  [{row: 2, column: 0},{row: 2, column: 1}, {row: 2, column: 2}],
  [{row: 0, column: 0},{row: 1, column: 0}, {row: 2, column: 0}],
  [{row: 0, column: 1},{row: 1, column: 1}, {row: 2, column: 1}],
  [{row: 0, column: 2},{row: 1, column: 2}, {row: 2, column: 2}],
  [{row: 0, column: 0},{row: 1, column: 1}, {row: 2, column: 2}],
  [{row: 0, column: 2},{row: 1, column: 1}, {row: 2, column: 0}]
];

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = initialGameBoard.map(row=>[...row]);

  let winner;

  for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
  }

  for(const combination of WINNING_COMBINATION) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleActivePlayer(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ square: {row: rowIndex, col: colIndex}, player: currentPlayer},
        ...prevTurns];

      return updatedTurns;
    });
  }

  function rematch() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} handleRematch={rematch}/>}
        <GameBoard onSelectSquare={handleActivePlayer} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
