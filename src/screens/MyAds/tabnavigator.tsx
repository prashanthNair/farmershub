import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import MyAds from "./myads";
import FavAds from "./favoriteads";
import { createStackNavigator } from "@react-navigation/stack";
import Categories from "../Categories/categories";
import CreateAd from "../PostAd/createAd";
import ImageBrowser from "../PostAd/imageBrowse";
const Tab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12, marginTop: 30 },
      }}
    >
      <Tab.Screen name="My Ads" component={MyAds} />
      {/* <Tab.Screen name="Favorite" component={FavAds} /> */}
    </Tab.Navigator>
  );
}

function MyAdsTab() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="MyAds" component={MyAds} />
      <Stack.Screen name="Ad Details" component={CreateAd} />
      <Stack.Screen name="Review Details" component={View} />
      <Stack.Screen name="Upload Images" component={ImageBrowser} />
    </Stack.Navigator>
  );
}
export default TabNavigator;
