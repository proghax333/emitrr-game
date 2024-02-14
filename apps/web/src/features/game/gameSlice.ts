import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "./Card";

export type GameState = {
  gameId: string;
  counter: number;
  cards: Card[];
  selectedCard: Card | null;
  viewedCards: Card[];
  status: "unknown" | "running" | "done";
};

const initialState: GameState = {
  gameId: "",
  counter: 0,
  cards: [
    {
      id: 1,
      type: "none",
    },
    {
      id: 2,
      type: "none",
    },
    {
      id: 3,
      type: "none",
    },
    {
      id: 4,
      type: "none",
    },
  ],
  selectedCard: null,
  viewedCards: [],
  status: "unknown",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameState: (state, action: PayloadAction<Partial<GameState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setGameState } = gameSlice.actions;
