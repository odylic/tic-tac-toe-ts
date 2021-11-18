import * as React from "react";
import styled from "styled-components";

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
  return (
    <Column gap={20}>
      <div>Like</div>
      <div>Share</div>
      <div>Subscribe</div>
    </Column>
  );
}

function Board() {
  return <div>TODO: Board</div>;
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
