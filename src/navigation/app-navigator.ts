import { createStackNavigator } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
};

export const RootStack = createStackNavigator<RootStackParamList>();
