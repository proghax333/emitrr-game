
import { configureStore } from "@reduxjs/toolkit";

import { gameSlice } from "@/features/game/gameSlice";

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
