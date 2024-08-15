import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import generateUniqueIDArray from "@/utils/javascript/generateUniqueIDArray";
import { Post } from "@/types";

type InitialState = {
  followingPosts: Post[];
};

const initialState: InitialState = {
  followingPosts: [],
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addFollowingPosts: (state, { payload }) => {
      state.followingPosts = generateUniqueIDArray([
        ...payload,
        ...state.followingPosts,
      ]);
      return state;
    },
    addSingleFollowingPost: (state, { payload }) => {
      state.followingPosts = generateUniqueIDArray([
        payload,
        ...state.followingPosts,
      ]);
      return state;
    },
    removeSingleFollowingPost: (state, { payload }) => {
      state.followingPosts = state.followingPosts.filter(
        (obj) => obj._id !== payload
      );
      return state;
    },
  },
});

export const {
  addFollowingPosts,
  addSingleFollowingPost,
  removeSingleFollowingPost,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

export const userInitialState = (state: RootState) => state.user;
