import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "./Screens/Auth/RegistrationScreen";
import LoginScreen from "./Screens/Auth/LoginScreen";
import Home from "./Screens/Main/Home";

const Auth = createStackNavigator();
const Main = createStackNavigator();

export default function renderScreen(params) {
  if (params) {
    return (
      <Main.Navigator>
        <Main.Screen options={{ headerShown: false }} name="Home" component={Home} />
      </Main.Navigator>
    );
  }
  return(
    <Auth.Navigator>
      <Auth.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <Auth.Screen
        options={{ headerShown: false }}
        name="Registration"
        component={RegistrationScreen}
      />
    </Auth.Navigator>
  );
}


