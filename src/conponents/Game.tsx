import { JSX, useReducer } from "react";
import { Socket } from "socket.io-client";

import { AppContext } from "../constants";
import { TGameValue } from "../types";
import { scaleReducer, useGameState } from "../functions";

import Status from "./Status";
import Square from "./Square";
import Board from "./Board";
import HistoryList from "./History";

export default function Game(props: {
  socket: Socket | null;
  isConnected: boolean;
}): JSX.Element {
  const [scale, dispatchScale] = useReducer(scaleReducer, 10);
  const { history, currentMove, onPlay, setCurrentMove } = useGameState(
    props.socket
  );

  function handlePlay(nextValue: TGameValue): void {
    onPlay([...history.slice(0, currentMove + 1), nextValue]);
  }
  function handleRestart(): void {
    onPlay([[]]);
  }

  const xIsNext = currentMove % 2 === 0;
  const currentValue = history[currentMove];

  const winner = Array.isArray(currentValue) ? undefined : currentValue;
  const actualScale = scale / 10;

  console.time("rendering");
  const content = (
    <AppContext.Provider value={{ xIsNext }}>
      <div className="container">
        <div className="header">
          <Status
            winner={winner}
            isConnected={props.isConnected}
            scale={actualScale}
            zoomIn={() => {
              dispatchScale("inc");
            }}
            zoomOut={() => {
              dispatchScale("dec");
            }}
            restart={handleRestart}
          />
          <HistoryList
            history={history}
            currentMove={currentMove}
            onSelected={setCurrentMove}
          />
        </div>
        <div className="game-container">
          <div className="game" style={{ transform: `scale(${actualScale})` }}>
            {Array.isArray(currentValue) ? (
              <Board value={currentValue} onPlay={handlePlay} />
            ) : (
              <Square value={currentValue} onSquareClick={() => {}} />
            )}
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
  console.timeEnd("rendering");

  return content;
}
