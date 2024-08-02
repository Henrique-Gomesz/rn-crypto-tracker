import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { remove } from "lodash";
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
    removeUserCrypto: (state, action: PayloadAction<Crypto>) => {
      remove(state.userCryptos, (crypto) => crypto.id === action.payload.id);
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCryptos, addUserCrypto, setIsLoading, removeUserCrypto } =
  appSlice.actions;
export const appReducer = appSlice.reducer;
