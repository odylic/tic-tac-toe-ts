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
      <Log />
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
      value: board[square],
      onClick: () => onClick(square),
    };
  };
  return (
    <Column gap={0}>
      <Row gap={0}>
        <Square />
        <Square />
        <Square />
      </Row>
      <Row gap={0}>
        <Square />
        <Square />
        <Square />
      </Row>
      <Row gap={0}>
        <Square />
        <Square />
        <Square />
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

function Log() {
  return (
    <ol>
      <li>
        <button>Go to Move</button>
      </li>
    </ol>
  );
}

export default Game;
