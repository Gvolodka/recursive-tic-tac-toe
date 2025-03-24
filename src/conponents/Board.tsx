import { JSX, useContext } from "react";

import { TBoardValue, TGameValue } from "../types";
import { AppContext } from "../constants";

import Square from "./Square";
import { calculateWinner } from "../functions";

function getBoardList(
  value: TBoardValue,
  onBoardPlay: (index: number, value: TGameValue) => void,
  onSquareClick: (index: number) => void
): JSX.Element[] {
  const renderList: JSX.Element[] = [];
  for (let index = 0; index < 9; index++) {
    const currentValue = value[index];
    if (Array.isArray(currentValue)) {
      renderList.push(
        <Board
          key={index}
          value={currentValue}
          onPlay={(value) => onBoardPlay(index, value)}
        />
      );
    } else {
      renderList.push(
        <Square
          key={index}
          value={currentValue}
          onSquareClick={() => onSquareClick(index)}
        />
      );
    }
  }
  return renderList;
}

export default function Board(props: {
  value: TBoardValue;
  onPlay: (value: TGameValue) => void;
}): JSX.Element {
  const { xIsNext } = useContext(AppContext);

  function onBoardPlay(index: number, value: TGameValue) {
    const copy = [...props.value];
    copy[index] = value;
    const winner = calculateWinner(copy);
    props.onPlay(winner || copy);
  }

  function onSquareClick(index: number) {
    if (props.value[index]) {
      return;
    }
    const quantumEntanglement = props.value.map((value) =>
      Array.isArray(value) ? undefined : value
    );
    quantumEntanglement[index] = xIsNext ? "X" : "O";
    const winner = calculateWinner(quantumEntanglement);
    if (winner) {
      props.onPlay(winner);
    } else {
      const copy = [...props.value];
      copy[index] = quantumEntanglement;
      props.onPlay(copy);
    }
  }

  const renderList = getBoardList(props.value, onBoardPlay, onSquareClick);
  return <div className="board">{renderList}</div>;
}
