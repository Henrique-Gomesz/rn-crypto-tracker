import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusBarStyle } from "expo-status-bar";

interface ThemeState {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    white: string;
    darkGreen: string;
    darkGray: string;
    lightGreen: string;
  };
  fontSizes: {
    small: number;
    medium: number;
    large: number;
  };
  statusBarStyle: StatusBarStyle;
}

const initialState: ThemeState = {
  colors: {
    primary: "#302D40",
    secondary: "#6c757d",
    tertiary: "#f8f9fa",
    white: "#FFFFFF",
    lightGreen: "#01FFB7",
    darkGreen: "#125549",
    darkGray: "#302D40",
  },
  fontSizes: {
    small: 14,
    medium: 16,
    large: 18,
  },
  statusBarStyle: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {},
});

export const themeReducer = themeSlice.reducer;
