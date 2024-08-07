import { Dimensions } from "react-native";

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
