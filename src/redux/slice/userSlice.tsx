import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import generateUniqueIDArray from "@/utils/javascript/generateUniqueIDArray";
import { Post } from "@/types";

type InitialState = {
  followingPosts: Post[];
  userPostsCount: number;
  likePostsCount: number;
  savedPostCount: number;
};

const initialState: InitialState = {
  followingPosts: [],
  userPostsCount: 0,
  likePostsCount: 0,
  savedPostCount: 0,
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
  addFollowingPosts,
  addSingleFollowingPost,
  removeSingleFollowingPost,
  addUserPostsCount,
  addUserLikePostsCount,
  addUserSavedPostsCount,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

export const userInitialState = (state: RootState) => state.user;
