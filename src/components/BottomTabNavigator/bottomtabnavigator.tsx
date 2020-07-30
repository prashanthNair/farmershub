import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../screens/Home/home";
import SearchResult from "../../screens/Home/searchresult";

import Details from "../../screens/Recipe/recipeScreen";
import Categories from "../../screens/Categories/categories";
import CreateAd from "../../screens/PostAd/createAd";
import CameraPage from "../../screens/PostAd/camera";
import ImagePickerExample from "../../screens/PostAd/imagePicker";
import AddImages from "../../screens/PostAd/imagePicker";
import CamerPage from "../../screens/PostAd/camera";
import Account from "../../screens/Account/account";
import ChannelScreen from "../../screens/Chat/chat";
import Profile from "../../screens/Account/profile";
import MainNavigator from "../../appnavigator";
import Review from "../../screens/PostAd/reviewaccount";
import SetPrice from "../../screens/PostAd/price";
import ImagePicker from "../../screens/PostAd/imagePicker";
import ImageBrowser from "../../screens/PostAd/imageBrowse";
import TabNavigator from "../../screens/MyAds/tabnavigator";
import MyAds from "../../screens/MyAds/myads";
const Stack = createStackNavigator();

function HomeTab() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SearchResult" component={SearchResult} />

      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Chat" component={ChannelScreen} />
      {/* <Stack.Screen name="Upload Images"  component={AddImages} /> */}
    </Stack.Navigator>
  );
}

function PostAdTab() {
  return (
    <Stack.Navigator
    // screenOptions={{
    //   headerShown: false }}
    >
      <Stack.Screen name="Select Category" component={Categories} />
      <Stack.Screen name="Ad Details" component={CreateAd} />
      <Stack.Screen name="Review Details" component={Review} />
      <Stack.Screen name="Set a price" component={SetPrice} />
      <Stack.Screen name="Upload Images" component={ImageBrowser} />
      <Stack.Screen name="Camera Images" component={CamerPage} />
    </Stack.Navigator>
  );
}

function AccountTab() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notifications!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#e91e63",
        style: { backgroundColor: "#f0f0f0" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          tabBarLabel: "Home  ",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Sell"
        component={PostAdTab}
        options={{
          tabBarLabel: "Post",
          tabBarVisible: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="camera" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="My Ads"
        component={TabNavigator}
        options={{
          tabBarLabel: "Ads",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dropbox" color={color} size={size} />
          ),
        }}
      />

      {/* <Tab.Screen
      name="ImagePicker"
      component={ImagePickerExample}
      options={{
        tabBarLabel: 'ImagePicker',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="camera" color={color} size={size} />
        ),
      }}
    /> */}
      <Tab.Screen
        name="Account"
        component={AccountTab}
        options={{
          tabBarLabel: "Account",
          tabBarVisible: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function BottomNavigation() {
  return <MyTabs />;
}
