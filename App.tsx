import "./gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider } from "react-redux";
import { HomeScreen } from "src/home/screens/home";
import { store } from "src/store/store";
import { RootStack } from "./src/navigation/app-navigator";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  return (
    <RootSiblingParent>
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
    </RootSiblingParent>
  );
}
