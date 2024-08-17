import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice/userSlice";
import { toggleReducer } from "./slice/toggleSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    toggle: toggleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable strict mode
    }),
  devTools: true,
});

// Define and export RootState type
export type RootState = ReturnType<typeof store.getState>;
