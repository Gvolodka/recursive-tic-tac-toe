import { JSX } from "react";
import { TSquareValue } from "../types";

export default function Square(props: {
  value: TSquareValue;
  onSquareClick: () => void;
}): JSX.Element {
  return (
    <div className="square" onClick={props.onSquareClick}>
      {props.value}
    </div>
  );
}
