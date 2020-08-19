import React, { useEffect } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";

import { withAuthenticator } from "aws-amplify-react-native";

import Amplify from "@aws-amplify/core";
import config from "./aws-exports";
import BottomNavigation from "./src/components/BottomTabNavigator/bottomtabnavigator";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/screens/Login/Login";
import AppNavigator from "./src/appnavigator";
import { Store } from "./src/store/store";

Amplify.configure({
  Auth: {
    region: "ap-south-1",
    userPoolId: "ap-south-1_qIusAhdEc",
    userPoolWebClientId: "6fgc3qetcp0b634f1aflt4cj4g",
  },
});
interface Props {
  navigation: any;
}

function App(props) {
  useEffect(() => {
    _retrieveData()
    .then((data) => {
     
    })
    .catch((err) => {
      console.log(err);
    });
  });
  const _retrieveData = async () => {
    try {
      const userName = await AsyncStorage.getItem("userName");
      console.log(userName)
      const mobileNum = await AsyncStorage.getItem("mobileNum");
      console.log(mobileNum)
      Store.setUserDetails({
        userName,
        mobileNum,
      });
      return {
        userName,
        mobileNum,
      };
    } catch (error) {
      // Error retrieving data
    }
  };
  

  return <AppNavigator></AppNavigator>;
}

//export default withAuthenticator(App, { includeGreetings: true })
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
