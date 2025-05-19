import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ROOM } from "@/types";

type INITIALSTATE = {
  activeRoom: ROOM | null;
};

const initialState: INITIALSTATE = {
  activeRoom: null,
};

const roomSlice = createSlice({
  name: "roomSlice",
  initialState,
  reducers: {
    setActiveRoom: (state, { payload }) => {
      const room = payload as ROOM | null;

      state.activeRoom = room;
      return state;
    },
  },
});

export const { setActiveRoom } = roomSlice.actions;

export const roomReducer = roomSlice.reducer;

export const roomState = (state: RootState) => state.room;
