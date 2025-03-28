import { io } from "socket.io-client";

// ToDo: Use env variable
const apiUrl = "http://localhost:3000";

async function post<T>(
  url: string,
  body: { [key: string]: any },
  init?: RequestInit
): Promise<T | { aborted: true }> {
  try {
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const response = await fetch(request, init);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    if (init?.signal?.aborted) {
      return { aborted: true };
    }
    throw new Error("post request failed", { cause: error });
  }
}

export async function startGame(init?: { signal: AbortSignal }) {
  return post<{ key: string }>(`${apiUrl}/start-game`, {}, init);
}

export function checkGame(key: string, init?: { signal: AbortSignal }) {
  return post<{ status: boolean }>(`${apiUrl}/check-game`, { key }, init);
}

export function setupGameChanel(gameRoomId: string) {
  return io(`${apiUrl}/game-${gameRoomId}`, {
    ackTimeout: 10000,
    retries: 3,
    auth: {
      serverOffset: 0,
      gameRoomId,
    },
    autoConnect: false,
  });
}
