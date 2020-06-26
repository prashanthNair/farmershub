import React, { useState, useEffect } from 'react';
import {
    FlatList,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    TouchableHighlight,
    TextInput
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';


const SetPrice = (props) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: "flex-start" }}>

            <View style={styles.detailsRow}>
                <Text style={styles.inputlabel}>Price</Text>
                <TextInput placeholder="Price" style={styles.formTextInput}></TextInput>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: "flex-end" }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#0a87f5', justifyContent: "flex-end", width: '100%' }}>
                    <Button title="Next" buttonStyle={{ width: '100%', borderRadius: 0, backgroundColor: '#0a87f5' }} onPress={() => {
                        props.navigation.navigate('Review Details');
                    }} />
                </View>

            </View>

        </View>

    );
}
const styles = StyleSheet.create({
    detailsRow: { 
        margin:10,
        width: '100%',
        justifyContent: 'space-between',
        padding: 5,
        fontSize: 22,

    }, formTextInput: {
        width: '98%',
        height: 50,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#c7c7c7',
        backgroundColor: '#fafafa',
        marginLeft: 10,
        marginRight: 10,
        padding:10
    },
    inputlabel: {
        marginLeft: 10, color: '#878686', fontSize: 15,marginBottom:10,
    }
})
export default withNavigation(SetPrice)