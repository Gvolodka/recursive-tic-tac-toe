import { drawSign, lines } from "../constants";
import { TBoardValue } from "../types";

export function calculateWinner(board: TBoardValue): string | null {
  for (let index = 0; index < lines.length; index++) {
    const [a, b, c] = lines[index];
    const qA = board[a];
    const qB = board[b];
    const qC = board[c];
    if (!Array.isArray(qA) && qA !== drawSign && qA && qA === qB && qA === qC) {
      return qA;
    }
  }
  for (let index = 0; index < 9; index++) {
    const value = board[index];
    if (!value || Array.isArray(value)) {
      return null;
    }
  }
  return drawSign;
}

export function scaleReducer(state: number, action: "inc" | "dec"): number {
  if (action === "inc") {
    return state + 1;
  }
  if (action === "dec") {
    return state - 1;
  }
  return state;
}
