import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  creatPost: {
    bool: false,
  },
};

const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState,
  reducers: {
    toggleCreatePost: (state, { payload }) => {
      const { bool } = payload;

      state.creatPost.bool = bool;
      return state;
    },
  },
});

export const { toggleCreatePost } = toggleSlice.actions;

export const toggleReducer = toggleSlice.reducer;

export const toggleState = (state: RootState) => state.toggle;
