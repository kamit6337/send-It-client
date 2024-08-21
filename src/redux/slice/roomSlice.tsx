import generateUniqueIDArray from "@/utils/javascript/generateUniqueIDArray";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Chat, Room } from "@/types";

type InitialState = {
  rooms: Room[];
  chats: Chat[];
  activeRoom: string | null;
};

const initialState: InitialState = {
  rooms: [],
  chats: [],
  activeRoom: null,
};

const roomSlice = createSlice({
  name: "RoomSlice",
  initialState,
  reducers: {
    addRoomsAndChats: (state, { payload }) => {
      const rooms = payload.rooms;
      const chats = payload.chats;
      state.rooms = rooms;
      state.chats = chats;
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
      state.chats = state.chats.filter((chat) => chat.room !== roomId);
      return state;
    },
    addChats: (state, { payload }) => {
      const chats = payload.data;
      state.chats = generateUniqueIDArray([...state.chats, ...chats], {
        latestBottom: true,
      });
      return state;
    },
    addSingleChat: (state, { payload }) => {
      const chat = payload;

      state.chats = generateUniqueIDArray([...state.chats, chat], {
        latestBottom: true,
      });
      return state;
    },
    setActiveRoom: (state, { payload }) => {
      state.activeRoom = payload;
      return state;
    },
  },
});

export const {
  addRoomsAndChats,
  addSingleRoom,
  addChats,
  addSingleChat,
  removeRoom,
  setActiveRoom,
} = roomSlice.actions;

export const roomReducer = roomSlice.reducer;

export const roomState = (state: RootState) => state.room;
