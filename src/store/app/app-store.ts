import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { remove, update } from "lodash";
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
      state.userCryptos.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }

        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    },
    updateUserCrypto: (state) => {
      state.userCryptos.forEach((item) => {
        const crypto = state.cryptos.find((crypto) => crypto.id === item.id);

        if (crypto) {
          item.priceUsd = crypto.priceUsd;
          item.changePercent24Hr = crypto.changePercent24Hr;
        }
      });
    },
    updateCrypto: (state, action: PayloadAction<Crypto>) => {
      const index = state.cryptos.findIndex(
        (crypto) => crypto.id === action.payload.id
      );

      if (index !== -1) {
        state.cryptos[index] = action.payload;
      }
    },
    removeUserCrypto: (state, action: PayloadAction<Crypto>) => {
      remove(state.userCryptos, (crypto) => crypto.id === action.payload.id);
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCryptos,
  addUserCrypto,
  setIsLoading,
  removeUserCrypto,
  updateCrypto,
  updateUserCrypto,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
