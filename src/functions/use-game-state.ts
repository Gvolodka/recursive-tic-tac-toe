import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import { TGameValue } from "../types";

export function useGameState(socket: Socket | null) {
  const [history, setHistory] = useState<Array<TGameValue>>([[]]);
  const [currentMove, setCurrentMove] = useState(0);

  function onPlay(newHistory: Array<TGameValue>) {
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
    socket?.emit("play", newHistory);
  }

  useEffect(() => {
    function handle(newHistory: Array<TGameValue>) {
      setHistory(newHistory);
      setCurrentMove(newHistory.length - 1);
    }
    socket?.on("play", handle);
    return () => {
      socket?.off("play", handle);
    };
  }, [socket]);

  return {
    history,
    currentMove,
    onPlay,
    setCurrentMove,
  };
}
