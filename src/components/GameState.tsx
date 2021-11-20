import { useState } from "react";
export {};

export type Value = "X" | "O" | null;

// the array of values that will be pushed in when clicked
export type BoardState = Value[];

// utility method to initialize the board with 9 null values
const createBoardState = () => Array<Value>(9).fill(null);

// type script logic
function calculateWinner(boardState: BoardState) {
  // winning combinations
  const winningCombinations = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];
  // iterates through the winning combinations
  for (let i = 0; i < winningCombinations.length; i++) {
    // assigns a,b,c to the elements in each array
    const [a, b, c] = winningCombinations[i];
    // checks the value of the boardState's array, if clicked
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    )
      // if it's clicked, it's a winner and all other combinations are clicked, return winner
      return boardState[a];
  }
  return null;
}

// keep history of all boardstates
export type GameState = {
  history: BoardState[];
  step: number;
};

// create a hook
export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    // starts the initial state with 9 null values
    history: [createBoardState()],
    step: 0,
  });

  // gets the current step
  const current = gameState.history[gameState.step];
  // which turn
  const xIsNext = gameState.step % 2 === 0;
  const winner = calculateWinner(current);

  function handleClick(square: number) {
    const history = gameState.history.slice(0, gameState.step + 1);
    const boardState = history[history.length - 1];
    if (calculateWinner(boardState) || boardState[square]) {
      return;
    }
    const newBoardState = boardState.slice();
    newBoardState[square] = gameState.step % 2 === 0 ? "X" : "O";
    history.push(newBoardState);
    setGameState({
      history: history,
      step: history.length - 1,
    });
  }

  function jumpTo(step: number) {
    setGameState({
      history: gameState.history,
      step,
    });
  }

  return {
    gameState,
    current,
    xIsNext,
    winner,
    handleClick,
    jumpTo,
  };
}
