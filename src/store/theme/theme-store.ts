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
    beige: string;
    lightGray: string;
    secondaryDarkGray: string;
    red: string;
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
    lightGreen: "#13E37F",
    darkGreen: "#125549",
    secondaryDarkGray: "#8883A3",
    darkGray: "#302D40",
    lightGray: "#C7C7C7",
    beige: "#F4E0E0",
    red: "#FF0000",
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
