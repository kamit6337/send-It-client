import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type InitialState = {
  userPostsCount: number;
  likePostsCount: number;
  savedPostCount: number;
};

const initialState: InitialState = {
  userPostsCount: 0,
  likePostsCount: 0,
  savedPostCount: 0,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addUserPostsCount: (state, { payload }) => {
      state.userPostsCount = payload;
      return state;
    },
    addUserLikePostsCount: (state, { payload }) => {
      state.likePostsCount = payload;
      return state;
    },
    addUserSavedPostsCount: (state, { payload }) => {
      state.savedPostCount = payload;
      return state;
    },
  },
});

export const {
  addUserPostsCount,
  addUserLikePostsCount,
  addUserSavedPostsCount,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

export const userInitialState = (state: RootState) => state.user;
