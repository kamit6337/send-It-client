import { Post } from "@/types";
import generateUniqueIDArray from "@/utils/javascript/generateUniqueIDArray";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type InitialState = {
  postList: string[];
  followingPosts: Post[];
  updatePost: Post[];
  deletePost: string[];
};

const initialState: InitialState = {
  postList: [],
  followingPosts: [],
  updatePost: [],
  deletePost: [],
};

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    addToPost: (state, { payload }) => {
      const postId = payload;
      state.postList = [...new Set([postId, ...state.postList])];
      return state;
    },
    addSingleFollowingPost: (state, { payload }) => {
      state.followingPosts = generateUniqueIDArray([
        payload,
        ...state.followingPosts,
      ]);
      return state;
    },
    clearFollowingPost: (state) => {
      state.followingPosts = [];
      return state;
    },
    addToUpdatePost: (state, { payload }) => {
      const post = payload;

      if (state.postList.includes(post._id)) {
        state.updatePost = [post, ...state.updatePost];
      }

      return state;
    },
    deletePost: (state, { payload }) => {
      const postId = payload;

      if (state.postList.includes(postId)) {
        state.deletePost = [...new Set([postId, ...state.deletePost])];
      }

      return state;
    },
  },
});

export const {
  addToPost,
  addSingleFollowingPost,
  clearFollowingPost,
  addToUpdatePost,
  deletePost,
} = postSlice.actions;

export const postReducer = postSlice.reducer;

export const postState = (state: RootState) => state.post;
