import React from "react";
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
  const _retrieveData = async () => {
    try {
      const userName = await AsyncStorage.getItem("userName");
      const mobileNum = await AsyncStorage.getItem("mobileNum");
      return {
        userName,
        mobileNum,
      };
    } catch (error) {
      // Error retrieving data
    }
  };
  _retrieveData()
    .then((data) => {
      if (data) {
        Store.setUserDetails(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <NavigationContainer>
      {/* <Login navigation={props.navigation}/> */}
      <AppNavigator></AppNavigator>
    </NavigationContainer>
  );
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
