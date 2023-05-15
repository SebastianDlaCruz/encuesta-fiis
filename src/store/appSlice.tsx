import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState, UserProfile } from "./types";

export const userInitialState: AppState = {
  isFetching: false,
  user: null,
}

export const appSlice = createSlice({
  name: "app",
  initialState: userInitialState,
  reducers: {
    initUser: (state, { payload }: PayloadAction<UserProfile>) => {
      state.user = payload;
    },
    initData: () =>{
      return userInitialState;
    }
  },
});

export const { initUser, initData } =
  appSlice.actions;

export default appSlice.reducer;
