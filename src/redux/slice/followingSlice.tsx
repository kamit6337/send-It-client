import generateUniqueIDArray from "@/utils/javascript/generateUniqueIDArray";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  followings: [],
};

const followingSlice = createSlice({
  name: "followingSlice",
  initialState,
  reducers: {
    updateFollowing: (state, { payload }) => {
      const obj = payload;
      state.followings = generateUniqueIDArray([obj, state.followings]);
      return state;
    },
  },
});

export const { updateFollowing } = followingSlice.actions;

export const followingReducer = followingSlice.reducer;

export const followingState = (state: RootState) => state.following;
