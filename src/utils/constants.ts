import { Dimensions } from "react-native";
import { Crypto } from "src/entities/crypto";

export const BASE_URL = "http://api.coincap.io";

export const USDollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  maximumFractionDigits: 2,
});

export const SCREEN_WIDTH = Dimensions.get("window").width;

export const ROUTINE_INTERVAL = 10000;

export const DEFAULT_CRYPTO: Crypto = {
  id: "",
  symbol: "",
  name: "",
  supply: 0,
  maxSupply: 0,
  marketCapUsd: 0,
  volumeUsd24Hr: 0,
  priceUsd: 0,
  changePercent24Hr: 0,
  vwap24Hr: 0,
  explorer: "",
};
