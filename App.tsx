import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider } from "react-redux";
import { store } from "src/store/store";
import "./gesture-handler";
import { RootStack } from "./src/navigation/app-navigator";
import { HomeScreen } from "src/home/screens/home";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >
          <RootStack.Screen name="Home" component={HomeScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
