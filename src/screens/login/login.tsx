import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Button } from "react-native-elements";
import Amplify, { Auth } from "aws-amplify";
import AWS from "aws-sdk";
// const AWS = require('aws-sdk');
let conf = {
  region: "ap-south-1",
  accessKeyId: "AKIA5CMPPPU7LGA3254L",
  accessSecretKey: "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",
  AWS_SDK_LOAD_CONFIG: 1,
};
AWS.config.update(conf);
interface Props {
  navigation: any;
}
interface State {
  Otp: any;
  MobileNum: any;
}
class Login extends React.Component<Props, State> {
  user = {};

  constructor(props) {
    super(props);

    AWS.config.update(conf);
  }

  componentDidMount() {
    this.state = {
      Otp: "",
      MobileNum: "",
    };
  }
  async signUp() {
    try {
      console.log(`+91${this.state.MobileNum}`);
      await Auth.signUp({
        username: `+91${this.state.MobileNum}`,
        password: Date.now().toString(),
      })
        .then((data) => {
          console.log(data);
          if (data.userConfirmed) {
            this.sigIn();
          }
        })
        .catch((err) => {
          if (err.code == "UsernameExistsException") {
            this.sigIn();
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  sendSMS(phone, code) {
    const params = {
      Message: code /* required */,
      PhoneNumber: phone,
    };

    return new AWS.SNS({ apiVersion: "2010-03-31" }).publish(params).promise();
  }
  async sigIn() {
    try {
      this.sendSMS(this.state.MobileNum, "2255")
        .then((data) => {})
        .catch((err) => {});
      await Auth.signIn(`+91${this.state.MobileNum}`)
        .then((data) => {
          this.user = data;
          console.log(data);
        })
        .catch((err) => {
          if (err.code == "UserLambdaValidationException") {
            //this.sigIn();
          }
          console.log("error", err);
        });
    } catch {
      // Handle sign in errors
    }
  }

  async defineCustome() {
    try {
      console.log(this.state.Otp);
      const cognitoUser = await Auth.sendCustomChallengeAnswer(
        this.user,
        this.state.Otp
      )
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
      this.verifyAuth();
    } catch (err) {
      console.log(err);
    }
  }

  async verifyAuth() {
    try {
      const data = await Auth.currentAuthenticatedUser()
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(data);
    } catch {
      // User not logged in
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="+91 - Mobile number"
          style={styles.loginFormTextInput}
          onChangeText={(text) => {
            this.setState({ MobileNum: text });
            console.log(this.state.MobileNum);
          }}
        ></TextInput>
        <TextInput
          placeholder="OTP"
          style={styles.loginFormTextInput}
          onChangeText={(text) => {
            this.setState({ Otp: text });
            console.log(this.state.Otp);
          }}
        ></TextInput>
        <View style={styles.loginButtonSection}>
          <Button
            title="Send OTP"
            buttonStyle={styles.loginButton}
            onPress={async () => {
              await this.signUp();

              // setTimeout(this.sigIn(), 1000);
              // props.navigation.navigate('Home')
              // this.props.navigation.navigate("BottomNavigation");
            }}
          />

          <Button
            title="Login"
            buttonStyle={styles.loginButton}
            onPress={async () => {
              // this.signUp();

              this.defineCustome();
              // props.navigation.navigate('Home')
              // this.props.navigation.navigate("BottomNavigation");
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
    backgroundColor: "#3897f1",
    borderRadius: 5,
    marginTop: 20,
  },
});

export default Login;
