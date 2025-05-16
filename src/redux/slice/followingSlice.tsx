import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type INITIALSTATE = {
  allView: string[];
  followings: string[];
};

type PAYLOAD = {
  userId: string;
  isFollowed: boolean;
};

const initialState: INITIALSTATE = {
  allView: [],
  followings: [],
};

const followingSlice = createSlice({
  name: "followingSlice",
  initialState,
  reducers: {
    viewAndAddFollowing: (state, { payload }) => {
      const user = payload as PAYLOAD;

      const isAlreadyView = state.allView.includes(user.userId);
      if (isAlreadyView) return state;

      state.allView = [...new Set([...state.allView, user.userId])];

      if (user.isFollowed) {
        state.followings = [...new Set([...state.followings, user.userId])];
      }

      return state;
    },
    addFollowing: (state, { payload }) => {
      const userId = payload as string;

      state.allView = [...new Set([...state.allView, userId])];
      state.followings = [...new Set([...state.followings, userId])];

      return state;
    },
    removeFollowing: (state, { payload }) => {
      const userId = payload as string;

      state.allView = [...new Set([...state.allView, userId])];

      state.followings = state.followings.filter(
        (followingUserId) => followingUserId !== userId
      );

      return state;
    },
  },
});

export const { viewAndAddFollowing, addFollowing, removeFollowing } =
  followingSlice.actions;

export const followingReducer = followingSlice.reducer;

export const followingState = (state: RootState) => state.following;
