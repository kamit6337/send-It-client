import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import generateUniqueIDArray from "@/utils/javascript/generateUniqueIDArray";

const initialState = {
  followingPosts: [],
  addLikes: [],
  removeLikes: [],
  addFollowings: [],
  removeFollowings: [],
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

    addLike: (state, { payload }) => {
      const postId = payload;

      state.addLikes = [...new Set([postId, ...state.addLikes])];
      state.removeLikes = state.removeLikes.filter((id) => id !== postId);
      return state;
    },
    removeLike: (state, { payload }) => {
      const postId = payload.data;

      state.removeLikes = [...new Set([postId, ...state.removeLikes])];
      state.addLikes = state.addLikes.filter((id) => id !== postId);
      return state;
    },
    addFollowing: (state, { payload }) => {
      const userId = payload;

      state.addFollowings = [...new Set([userId, ...state.addFollowings])];
      state.removeFollowings = state.removeFollowings.filter(
        (id) => id !== userId
      );

      return state;
    },
    removeFollowing: (state, { payload }) => {
      const userId = payload;

      state.removeFollowings = [
        ...new Set([userId, ...state.removeFollowings]),
      ];
      state.addFollowings = state.addFollowings.filter((id) => id !== userId);

      return state;
    },
  },
});

export const {
  addFollowingPosts,
  addSingleFollowingPost,
  addLike,
  removeLike,
  addFollowing,
  removeFollowing,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

export const userInitialState = (state: RootState) => state.user;
