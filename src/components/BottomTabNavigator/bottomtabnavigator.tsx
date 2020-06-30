import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home/home';
import SearchResult from '../../screens/Home/searchresult';

import Details from '../../screens/Recipe/RecipeScreen';
import Categories from '../../screens/Categories/Categories';
import CreateAd from '../../screens/PostAd/CreateAd';
import CameraPage from '../../screens/PostAd/Camera';
import ImagePickerExample from '../../screens/PostAd/ImagePicker';
import AddImages from '../../screens/PostAd/ImagePicker';
import CamerPage from '../../screens/PostAd/Camera';
import Account from '../../screens/Account/Account';
import ChannelScreen from '../../screens/Chat/Chat';
import Profile from '../../screens/Account/Profile';
import MainNavigator from '../../appnavigator';
import Review from '../../screens/PostAd/reviewaccount';
import SetPrice from '../../screens/PostAd/price';
import ImagePicker from '../../screens/PostAd/ImagePicker';
import ImageBrowser from '../../screens/PostAd/ImageBrowse';
const Stack = createStackNavigator();

function HomeTab() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
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
    <Stack.Navigator>
    <Stack.Screen name="Select Category" component={Categories} />
    <Stack.Screen name="Ad Details" component={CreateAd} />
    <Stack.Screen name="Review Details" component={Review} />
    <Stack.Screen name="Set a price" component={SetPrice} /> 
    <Stack.Screen name="Upload Images"  component={ImageBrowser} />
    <Stack.Screen name="Camera Images"  component={CamerPage} />
    
  </Stack.Navigator>
  );
} 

function AccountTab() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
    <Stack.Screen name="Account" component={Account} /> 
    <Stack.Screen name="Profile"  component={Profile} /> 
    
  </Stack.Navigator>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
      activeTintColor: '#e91e63',
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeTab}
      options={{
        tabBarLabel: 'Home  ',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Sell"
      component={PostAdTab}
      options={{
        tabBarLabel: 'Post',tabBarVisible:false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="camera" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="My Ads"
      component={CameraPage}
      options={{
        tabBarLabel: 'Ads',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="camera" color={color} size={size} />
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
        tabBarLabel: 'Account',
        tabBarVisible:false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
  );
}

export default function BottomNavigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
