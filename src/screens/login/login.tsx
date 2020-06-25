import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { Button } from 'react-native-elements';

const Login = (props: any) => {

    return (
        // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <TextInput placeholder="+91 - Mobile number" style={styles.loginFormTextInput}></TextInput>
            <TextInput placeholder="OTP" style={styles.loginFormTextInput}></TextInput>
            <View style={styles.loginButtonSection}>
                <Button title="Login" buttonStyle={styles.loginButton} onPress={() => {
                    // props.navigation.navigate('Home')
                    props.navigation.navigate('BottomNavigation')
                }} />
            </View>
        </View>
        // </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        },
        loginButtonSection: {
            width: '100%',
            height: '10%',
            justifyContent: 'center',
            alignItems: 'center',
            textAlignVertical: 'center'
        },
        loginFormTextInput: {
            width: '90%',
            height: 43,
            fontSize: 14,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#eaeaea',
            backgroundColor: '#fafafa',
            paddingLeft: 10,
            marginLeft: 15,
            marginRight: 15,
            marginTop: 5,
            marginBottom: 5,

        },
        loginButton: { 
            flexDirection:'row',
            backgroundColor: '#3897f1',
            borderRadius: 5, 
        }
    }

)

export default Login;


