import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import { setupGameChanel } from "./api";

export function useSocket(gameRoomId: string | null, checked: boolean) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(!!socket?.connected);

  useEffect(() => {
    if (gameRoomId && checked) {
      setSocket(setupGameChanel(gameRoomId));
    } else {
      setSocket(null);
    }
  }, [gameRoomId, checked]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }
    function handleErrors(error: Error): void {
      console.warn("useSocketConnection ~ handleErrors ~ error:", error);
    }

    if (socket) {
      socket.on("connect", onConnect);
      socket.on("connect_error", handleErrors);
      socket.on("disconnect", onDisconnect);
      socket.connect();
    }

    return () => {
      if (socket) {
        socket.off("connect", onConnect);
        socket.off("connect_error", handleErrors);
        socket.off("disconnect", onDisconnect);
        socket.disconnect();
      }
    };
  }, [socket]);

  return { socket, isConnected };
}
