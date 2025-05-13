import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type INITIALSTATE = {
  rooms: string[];
};

const initialState: INITIALSTATE = {
  rooms: [],
};

const roomSlice = createSlice({
  name: "roomSlice",
  initialState,
  reducers: {
    addRooms: (state, { payload }) => {
      state.rooms = [...payload];
      return state;
    },
  },
});

export const { addRooms } = roomSlice.actions;

export const roomReducer = roomSlice.reducer;

export const roomState = (state: RootState) => state.room;
