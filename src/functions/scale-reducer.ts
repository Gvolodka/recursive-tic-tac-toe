export function scaleReducer(state: number, action: "inc" | "dec"): number {
  if (action === "inc") {
    return state + 1;
  }
  if (action === "dec") {
    return state - 1;
  }
  return state;
}
