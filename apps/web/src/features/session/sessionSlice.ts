import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../user/user";

export type SessionState = {
  status: "unknown" | "inactive" | "active" | "expired";
  user?: User;
};

const initialState: SessionState = {
  status: "unknown",
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.status = "active";
      state.user = action.payload;
    },
    logout: (state) => {
      state.status = "inactive";
      delete state.user;
    },
    inactive: (state) => {
      state.status = "inactive";
      delete state.user;
    },
    expired: (state) => {
      state.status = "inactive";
      delete state.user;
    },
  },
});

export const { login, logout, expired, inactive } = sessionSlice.actions;
