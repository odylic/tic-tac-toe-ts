import * as React from "react";
import styled from "styled-components";
import { BoardState, useGameState, Value } from "./GameState";

// seems like the main typescript difference
type LayoutProps = {
  gap: number;
};

const Row = styled.div<LayoutProps>`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.gap}px;
`;
const Column = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap}px;
`;

function Game() {
  const { gameState, current, xIsNext, jumpTo, winner, handleClick } =
    useGameState();
  return (
    <Row gap={20}>
      <Column gap={20}>
        <div>
          {winner ? `Winner ${winner}` : `Next Player ${xIsNext ? "X" : "O"}`}
        </div>
        <Board board={current} onClick={handleClick} />
      </Column>
      <Log history={gameState.history} jumpTo={jumpTo} />
    </Row>
  );
}

type Boardprops = {
  board: BoardState;
  onClick: (square: number) => void;
};

function Board({ board, onClick }: Boardprops) {
  const createProps = (square: number): SquareProps => {
    return {
      // shows the value of the square
      value: board[square],
      // carries the onClick function of the square
      onClick: () => onClick(square),
    };
  };
  return (
    <Column gap={0}>
      <Row gap={0}>
        {/* gives each the properties of each square in the board array from 0 to 8 */}
        <Square {...createProps(0)} />
        <Square {...createProps(1)} />
        <Square {...createProps(2)} />
      </Row>
      <Row gap={0}>
        <Square {...createProps(3)} />
        <Square {...createProps(4)} />
        <Square {...createProps(5)} />
      </Row>
      <Row gap={0}>
        <Square {...createProps(6)} />
        <Square {...createProps(7)} />
        <Square {...createProps(8)} />
      </Row>
    </Column>
  );
}

const StyledSquare = styled.button`
  width: 34px;
  height: 34px;
  background: #fff;
  border: 1px solid #999;
  padding: 0px;
  font-size: 24px;
  font-weight: bold;
  /* &:hover {
    background-color: red;
  } */
`;

type SquareProps = {
  value: Value;
  onClick: () => void;
};

function Square(props: SquareProps) {
  return <StyledSquare onClick={props.onClick}>{props.value} </StyledSquare>;
}

type LogProps = {
  history: BoardState[];
  jumpTo: (step: number) => void;
};

function Log(props: LogProps) {
  return (
    <ol>
      <li>
        <button>Go to Move</button>
      </li>
    </ol>
  );
}

export default Game;
