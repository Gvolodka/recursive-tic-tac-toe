import { JSX } from "react";

import { TGameValue } from "../types";

export default function HistoryList(props: {
  history: Array<TGameValue>;
  currentMove: number;
  onSelected: (index: number) => void;
}): JSX.Element {
  return (
    <div className="history">
      {props.history.map((_, index) => (
        <button
          key={index}
          className={props.currentMove < index ? "outdated" : ""}
          onClick={() => props.onSelected(index)}
        >
          {index}
        </button>
      ))}
    </div>
  );
}
