import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import MyAds from './myads';
import FavAds from './favoriteads';
const Tab = createMaterialTopTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator  tabBarOptions={{
        labelStyle: { fontSize: 12, marginTop:30 }, 
        
      }}>
      <Tab.Screen name="My Ads" component={MyAds} />
      <Tab.Screen name="Favorite" component={FavAds} />
    </Tab.Navigator>
  );
}

export default TabNavigator