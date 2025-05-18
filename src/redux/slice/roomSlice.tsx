import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ROOM } from "@/types";

type INITIALSTATE = {
  rooms: string[];
  activeRoom: ROOM | null;
};

const initialState: INITIALSTATE = {
  rooms: [],
  activeRoom: null,
};

const roomSlice = createSlice({
  name: "roomSlice",
  initialState,
  reducers: {
    addRooms: (state, { payload }) => {
      const roomIds = payload as string[];

      state.rooms = [...roomIds];
      return state;
    },
    addSingleRoom: (state, { payload }) => {
      const roomId = payload as string;
      state.rooms = [roomId, ...state.rooms];
      return state;
    },
    setActiveRoom: (state, { payload }) => {
      const room = payload as ROOM | null;

      state.activeRoom = room;
      return state;
    },
  },
});

export const { addRooms, addSingleRoom, setActiveRoom } = roomSlice.actions;

export const roomReducer = roomSlice.reducer;

export const roomState = (state: RootState) => state.room;
