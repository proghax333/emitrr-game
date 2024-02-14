import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "./Card";

export type GameState = {
  counter: number;
  cards: Card[];
  selectedCard: Card | null;
  viewedCards: Card[];
  specialCards: Card[];
  status: "unknown" | "running" | "done";
  result: "unknown" | "win" | "lose";
};

const initialState: GameState = {
  counter: 0,
  cards: [],
  viewedCards: [],
  specialCards: [],
  selectedCard: null,
  status: "unknown",
  result: "unknown",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameState: (state, action: PayloadAction<Partial<GameState>>) => {
      Object.assign(state, action.payload);
    },

    removeCard: (state, action: PayloadAction<Card>) => {
      state.cards = state.cards.filter((x) => x.id !== action.payload.id);
    },
    addViewedCard: (state, action: PayloadAction<Card>) => {
      state.viewedCards.push(action.payload);
    },
    addSpecialCard: (state, action: PayloadAction<Card>) => {
      state.specialCards.push(action.payload);
    },

    viewCard: (state, action: PayloadAction<Card>) => {
      const card: Card = {
        ...action.payload,
        isFlipped: true,
      };

      state.cards = state.cards.filter((x) => x.id !== card.id);
      state.viewedCards.push(card);
      state.selectedCard = card;
    },
    defuseCard: (state, action: PayloadAction<Card>) => {
      const card = action.payload;
      state.specialCards.pop();

      state.viewedCards.map((x) => {
        if (x.id === card.id) {
          return {
            ...card,
            isDefused: true,
          };
        }

        return x;
      });

      if (state.selectedCard?.id === card.id) {
        state.selectedCard.isDefused = true;
      }
    },
    takeSpecialCard: (state) => {
      state.specialCards.pop();
    },

    shuffle: (state, action: PayloadAction<Partial<GameState>>) => {
      state.cards = action.payload.cards!;
      state.counter = action.payload.counter!;

      for (const x of state.viewedCards) {
        if (x.id === state.selectedCard?.id) {
          x.isShuffled = true;
          break;
        }
      }

      if (state.selectedCard) {
        state.selectedCard.isShuffled = true;
      }
    },

    gameWin: (state) => {
      state.status = "done";
      state.result = "win";
    },
    gameLose: (state) => {
      state.status = "done";
      state.result = "lose";
    },
    gameReset: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setGameState,
  removeCard,
  addViewedCard,
  addSpecialCard,

  viewCard,
  takeSpecialCard,
  defuseCard,

  shuffle,
  gameWin,
  gameLose,
  gameReset,
} = gameSlice.actions;
