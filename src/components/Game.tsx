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

function Game() {
  return (
    <Row gap={20}>
      <div>Like</div>
      <div>Share</div>
      <div>Subscribe</div>
    </Row>
  );
}

export default Game;
