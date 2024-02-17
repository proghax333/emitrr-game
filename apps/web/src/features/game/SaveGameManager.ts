import { User } from "../user/user";
import { GameState } from "./gameSlice";

export class SaveGameManager {
  constructor(private user: User) {}

  private async getRawSaveGames(): Promise<any> {
    const data = localStorage.getItem("saveGames");
    if (!data) {
      return null;
    }

    try {
      const contents = JSON.parse(data);
      if (!contents || typeof contents !== "object") {
        return null;
      }
      return contents;
    } catch (e) {
      return null;
    }
  }

  async getSaveGame(): Promise<GameState | null> {
    const rawSaveGames = await this.getRawSaveGames();

    if (!rawSaveGames) {
      return null;
    }

    const saveGame = rawSaveGames[this.user.id] || null;
    return saveGame;
  }

  async setSaveGame(saveGame: GameState) {
    let rawSaveGames = await this.getRawSaveGames();
    if (!rawSaveGames || typeof rawSaveGames != "object") {
      rawSaveGames = {};
    }

    rawSaveGames[this.user.id] = saveGame;

    localStorage.setItem("saveGames", JSON.stringify(rawSaveGames));
  }

  async removeSaveGame() {
    const rawSaveGames = await this.getRawSaveGames();

    if (rawSaveGames) {
      delete rawSaveGames[this.user.id];
      localStorage.setItem("saveGames", JSON.stringify(rawSaveGames));
    }
  }
}
