export type TSquareValue = undefined | string;
export type TBoardValue = Array<TSquareValue | TBoardValue>;
export type TGameValue = TSquareValue | TBoardValue;
