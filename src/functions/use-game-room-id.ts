import { useSearchParams } from "react-router";

export function useGameRoomId(): [
  string | null,
  (id: string) => void,
  () => void
] {
  const [urlSearchParams, setURLSearchParams] = useSearchParams();

  function setGameRoomId(id: string) {
    setURLSearchParams((prev) => {
      prev.set("id", id);
      return prev;
    });
  }

  function deleteGameRoomId() {
    setURLSearchParams((prev) => {
      prev.delete("id");
      return prev;
    });
  }
  
  return [urlSearchParams.get("id"), setGameRoomId, deleteGameRoomId];
}
