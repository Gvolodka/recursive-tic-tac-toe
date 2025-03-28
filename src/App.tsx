import { useEffect, useState } from "react";

import { checkGame, startGame, useGameRoomId, useSocket } from "./functions";
import Game from "./conponents/Game";

function App() {
  const [gameRoomId, setGameRoomId, deleteGameRoomId] = useGameRoomId();
  const [checked, setChecked] = useState(false);
  const { socket, isConnected } = useSocket(gameRoomId, checked);

  useEffect(() => {
    const abortController = new AbortController();
    const init = { signal: abortController.signal };

    if (!gameRoomId) {
      startGame(init)
        .then((response) => {
          if ("aborted" in response) {
            return;
          }
          setGameRoomId(response.key);
          setChecked(true);
        })
        .catch((error) => {
          console.error("startGame:", error);
        });
    } else if (!checked) {
      checkGame(gameRoomId, init)
        .then((response) => {
          if ("aborted" in response) {
            return;
          }
          if (!response.status) {
            deleteGameRoomId();
            setChecked(false);
          } else {
            setChecked(true);
          }
        })
        .catch((error) => {
          console.error("checkGame:", error);
        });
    }

    return () => {
      abortController.abort("gameRoomId is changed");
    };
  }, [gameRoomId]);

  return <Game socket={socket} isConnected={isConnected} />;
}

export default App;
