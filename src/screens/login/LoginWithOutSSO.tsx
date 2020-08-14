import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, AsyncStorage } from "react-native";

import { Button } from "react-native-elements";
export const LoginWithOutSSO = (props) => {
  const [userName, setUserName] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const storeData = async () => {
    try {
      await AsyncStorage.setItem("userName", userName);
      await AsyncStorage.setItem("mobileNum", mobileNum);
    } catch (error) {
      console.log("AsyncStorage", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        style={styles.loginFormTextInput}
        onChangeText={(text) => {
          setUserName(text);
        }}
      ></TextInput>
      <TextInput
        placeholder="+91 - Mobile number"
        style={styles.loginFormTextInput}
        onChangeText={(text) => {
          setMobileNum(text);
        }}
      ></TextInput>
      <View style={styles.loginButtonSection}>
        <Button
          title="Login"
          buttonStyle={styles.loginButton}
          titleStyle={{ color: "#007272" }}
          onPress={async () => {
            await storeData();
            props.navigation.navigate("Main");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#b7dedd",
  },
  loginButtonSection: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    marginTop: 20,
  },
  loginFormTextInput: {
    width: "90%",
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    flexDirection: "row",
    backgroundColor: "#b7dedd",
    borderWidth: 1,
    borderColor: "#007272",
    borderRadius: 5,
    width: 100,
    marginTop: 20,
  },
});
