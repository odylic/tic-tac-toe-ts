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
