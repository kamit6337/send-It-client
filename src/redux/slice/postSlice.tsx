import { POST } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type INITIAL_STATE = {
  allPostIds: string[];
  updatePosts: POST[];
  deletePostIds: string[];
};

const initialState: INITIAL_STATE = {
  allPostIds: [],
  updatePosts: [],
  deletePostIds: [],
};

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    addToPost: (state, { payload }) => {
      const postId = payload as string;
      state.allPostIds = [...new Set([...state.allPostIds, postId])];
      return state;
    },
    addUpdatePost: (state, { payload }) => {
      const updatePost = payload as POST;

      const isFindPost = state.allPostIds.includes(updatePost._id);
      if (!isFindPost) return state;

      const isUpdatePostAvailable = state.updatePosts.find(
        (post) => post._id === updatePost._id
      );

      if (!isUpdatePostAvailable) {
        state.updatePosts = [...state.updatePosts, updatePost];
        return state;
      }

      state.updatePosts = state.updatePosts.map((post) =>
        post._id === updatePost._id ? updatePost : post
      );

      return state;
    },
    addDeletePostId: (state, { payload }) => {
      const deletePostId = payload as string;

      const isFindPost = state.allPostIds.includes(deletePostId);
      if (!isFindPost) return state;

      if (!state.deletePostIds.includes(deletePostId)) {
        state.deletePostIds = [...state.deletePostIds, deletePostId];
      }

      return state;
    },
  },
});

export const { addToPost, addUpdatePost, addDeletePostId } = postSlice.actions;

export const postReducer = postSlice.reducer;

export const postState = (state: RootState) => state.post;
