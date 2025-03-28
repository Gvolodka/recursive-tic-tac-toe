import { JSX, useContext } from "react";

import { TSquareValue } from "../types";
import { AppContext } from "../constants";

export default function Status(props: {
  winner: TSquareValue;
  isConnected: boolean;
  scale: number;
  zoomIn: () => void;
  zoomOut: () => void;
  restart: () => void;
}): JSX.Element {
  const { xIsNext } = useContext(AppContext);
  const statusText = props.winner
    ? "Winner: " + props.winner
    : "Next player: " + (xIsNext ? "X" : "O");
  const connectionStatus = `Client: ${
    props.isConnected ? "online" : "offline"
  }`;

  return (
    <div className="status">
      <span>{statusText}</span>
      <span>{connectionStatus}</span>
      <div className="actions">
        <span>{"Scale: " + props.scale}</span>
        <button className="zoom-in" onClick={props.zoomIn}>
          +
        </button>
        <button className="zoom-out" onClick={props.zoomOut}>
          -
        </button>
        <button className="restart" onClick={props.restart}>
          Restart
        </button>
      </div>
    </div>
  );
}
