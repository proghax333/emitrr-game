import { configureStore } from "@reduxjs/toolkit";

import { gameSlice } from "@/features/game/gameSlice";
import { sessionSlice } from "../session/sessionSlice";

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    session: sessionSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
