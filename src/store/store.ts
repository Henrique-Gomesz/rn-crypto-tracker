import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./app/app-store";
import { themeReducer } from "./theme/theme-store";

export const store = configureStore({
  reducer: {
    app: appReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
