import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable strict mode
    }),
  devTools: true,
});

// Define and export RootState type
export type RootState = ReturnType<typeof store.getState>;
