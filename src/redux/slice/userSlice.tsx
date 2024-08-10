import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  addLikes: [],
  removeLikes: [],
  addFollowings: [],
  removeFollowings: [],
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addLike: (state, { payload }) => {
      const postId = payload;
      state.addLikes = [postId, ...state.addLikes];
      state.removeLikes = state.removeLikes.filter((id) => id !== postId);
      return state;
    },
    removeLike: (state, { payload }) => {
      const postId = payload.data;
      state.removeLikes = [postId, ...state.removeLikes];
      state.addLikes = state.addLikes.filter((id) => id !== postId);
      return state;
    },
    addFollowing: (state, { payload }) => {
      const userId = payload;

      state.addFollowings = [userId, ...state.addFollowings];
      state.removeFollowings = state.removeFollowings.filter(
        (id) => id !== userId
      );

      return state;
    },
    removeFollowing: (state, { payload }) => {
      const userId = payload;
      state.removeFollowings = [userId, ...state.removeFollowings];
      state.addFollowings = state.addFollowings.filter((id) => id !== userId);

      return state;
    },
  },
});

export const { addLike, removeLike, addFollowing, removeFollowing } =
  userSlice.actions;

export const userReducer = userSlice.reducer;

export const userInitialState = (state: RootState) => state.user;
