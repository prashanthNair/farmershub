import * as React from "react";
import { Text, View, AsyncStorage } from "react-native";
import { createAppContainer, withNavigation } from "react-navigation";
// import {createDrawerNavigator} from 'react-navigation-drawer'
// import Login from './components/login/login'
import Home from "./screens/Home/home";
// import DrawerContainer from './components/DrawerContainer/DrawerContainer';
import Recipe from "./screens/Recipe/recipeScreen";
// import createAd from './components/PostAd/CreateAd';
import App from "../App";
import ChannelScreen from "./screens/Chat/chat";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./screens/Login/Login";
import { LoginWithOutSSO } from "./screens/Login/LoginWithOutSSO";
import BottomNavigation from "./components/BottomTabNavigator/bottomtabnavigator";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Store } from "./store/store";
const Stack = createStackNavigator();

function LoginNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginWithOutSSO} />
      <Stack.Screen name="Main" component={BottomNavigation} />
    </Stack.Navigator>
  );
}
export default function AppNavigator() {
  // if (Store.getUserDetails().MobileNum) {
  //   return BottomNavigation();
  // } else {
  //   return <LoginNavigator />;
  // }
  return (
   
    <NavigationContainer>
      {/* <View
        style={{
          backgroundColor: "#b7dedd",
          height: 40,
        }}
      ></View> */}
      {Store.getUserDetails().MobileNum ? (
        <BottomNavigation></BottomNavigation>
      ) : (
        <BottomNavigation></BottomNavigation>
      )}
    </NavigationContainer>
  );
}
