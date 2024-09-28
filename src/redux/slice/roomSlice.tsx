import generateUniqueIDArray from "@/utils/javascript/generateUniqueIDArray";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Room } from "@/types";

type InitialState = {
  rooms: Room[];
  activeRoom: string | null;
};

const initialState: InitialState = {
  rooms: [],
  activeRoom: null,
};

const roomSlice = createSlice({
  name: "RoomSlice",
  initialState,
  reducers: {
    addRoomsAndChats: (state, { payload }) => {
      const rooms = payload;
      state.rooms = rooms;
      return state;
    },
    addSingleRoom: (state, { payload }) => {
      const room = payload;
      state.rooms = generateUniqueIDArray([room, ...state.rooms]);
      return state;
    },
    removeRoom: (state, { payload }) => {
      const roomId = payload;
      state.rooms = state.rooms.filter((room) => room._id !== roomId);
      return state;
    },
    setActiveRoom: (state, { payload }) => {
      state.activeRoom = payload;
      return state;
    },
  },
});

export const { addRoomsAndChats, addSingleRoom, removeRoom, setActiveRoom } =
  roomSlice.actions;

export const roomReducer = roomSlice.reducer;

export const roomState = (state: RootState) => state.room;
