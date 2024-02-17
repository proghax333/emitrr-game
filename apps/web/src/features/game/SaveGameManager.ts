import { GameState } from "./gameSlice";

export async function getSaveGame(): Promise<GameState | null> {
  const data = localStorage.getItem("saveGame");
  if (!data) {
    return null;
  }

  try {
    const saveGame = JSON.parse(data);
    return saveGame;
  } catch (e) {
    return null;
  }
}

export async function setSaveGame(saveGame: GameState) {
  localStorage.setItem("saveGame", JSON.stringify(saveGame));
}
export async function removeSaveGame() {
  localStorage.removeItem("saveGame");
}
