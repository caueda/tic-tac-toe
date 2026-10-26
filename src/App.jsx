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

const INIT_GAME_BOARD = [
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

const INIT_PLAYERS = {X: "Player 1", O: "Player 2"};

function findWinner(players, gameBoard) {
  let winner;
  for(const combination of WINNING_COMBINATION) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function updateGameBoard(gameTurns) {
  const gameBoard = INIT_GAME_BOARD.map(row=>[...row]);

  for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState({...INIT_PLAYERS});

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = updateGameBoard(gameTurns);

  const winner = findWinner(players, gameBoard);

  const hasDraw = gameTurns.length === 9 && !winner;

  function updatePlayerName(symbol, newPlayerName) {
    setPlayers((prev) => {
      const updatedPlayers = {...prev, [symbol]: newPlayerName};
      return updatedPlayers;
    });
  }

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
          <Player initialName={INIT_PLAYERS.X} updatePlayerName={updatePlayerName} symbol="X" isActive={activePlayer === 'X'}/>
          <Player initialName={INIT_PLAYERS.O} updatePlayerName={updatePlayerName} symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} handleRematch={rematch}/>}
        <GameBoard onSelectSquare={handleActivePlayer} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
