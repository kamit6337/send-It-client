import { configureStore } from "@reduxjs/toolkit";
import { exampleReducer } from "./slice/exampleSlice";
import { roomReducer } from "./slice/roomSlice";
import { postReducer } from "./slice/postSlice";
import { followingReducer } from "./slice/followingSlice";

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    room: roomReducer,
    post: postReducer,
    following: followingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable strict mode
    }),
  devTools: false,
});

// Define and export RootState type
export type RootState = ReturnType<typeof store.getState>;
