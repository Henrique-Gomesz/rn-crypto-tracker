import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Crypto } from "src/entities/crypto";

interface AppState {
  cryptos: Crypto[];
  userCryptos: Crypto[];
  isLoading: boolean;
}

const initialState: AppState = {
  cryptos: [],
  userCryptos: [],
  isLoading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCryptos: (state, action: PayloadAction<Crypto[]>) => {
      state.cryptos = action.payload;
    },
    addUserCrypto: (state, action: PayloadAction<Crypto>) => {
      state.userCryptos.push(action.payload);
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCryptos, addUserCrypto, setIsLoading } = appSlice.actions;
export const appReducer = appSlice.reducer;
