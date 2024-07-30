import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  cryptos: string[];
}

const initialState: AppState = {
  cryptos: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addCrypto: (state, action: PayloadAction<string>) => {
      state.cryptos.push(action.payload);
    },
  },
});

export const { addCrypto } = appSlice.actions;
export const appReducer = appSlice.reducer;
