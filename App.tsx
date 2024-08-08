import "./gesture-handler";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { CryptoDetailsScreen } from "src/crypto-details/crypto-detail";
import { HomeScreen } from "src/home/screens/home";
import { persistor, store } from "src/store/store";
import { RootStack } from "./src/navigation/app-navigator";

export default function App() {
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer
            theme={{
              ...DefaultTheme,
              colors: {
                ...DefaultTheme.colors,
                background: "#302D40",
              },
            }}
          >
            <RootStack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName="Home"
            >
              <RootStack.Screen name="Home" component={HomeScreen} />
              <RootStack.Screen
                initialParams={{
                  id: "",
                }}
                name="CryptoDetails"
                component={CryptoDetailsScreen}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </RootSiblingParent>
  );
}
