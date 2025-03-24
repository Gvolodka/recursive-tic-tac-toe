import { JSX, useReducer, useState } from "react";

import { AppContext } from "../constants";
import { TGameValue } from "../types";

import { scaleReducer } from "../functions";

import Status from "./Status";
import Square from "./Square";
import Board from "./Board";
import HistoryList from "./History";

export default function Game(): JSX.Element {
  const [scale, dispatchScale] = useReducer(scaleReducer, 10);
  const [history, setHistory] = useState<Array<TGameValue>>([[]]);
  const [currentMove, setCurrentMove] = useState(0);

  function handlePlay(nextValue: TGameValue): void {
    const nextHistory = [...history.slice(0, currentMove + 1), nextValue];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
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
            scale={actualScale}
            zoomIn={() => {
              dispatchScale("inc");
            }}
            zoomOut={() => {
              dispatchScale("dec");
            }}
            restart={() => {
              setHistory([[]]);
              setCurrentMove(0);
            }}
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
