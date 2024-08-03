import { createStackNavigator } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  CryptoDetails: { id: string };
};

export const RootStack = createStackNavigator<RootStackParamList>();

