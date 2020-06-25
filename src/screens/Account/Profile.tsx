import React from 'react';
import {
    FlatList,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    TouchableHighlight, Linking,
    TextInput
} from 'react-native';
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { Button } from 'react-native-elements';

const accountDetails = [
    {
        name: 'Settings',
        id: 1,
        tag: "Privacy and logout"
    },
    {
        name: 'Help & Support',
        id: 2,
        tag: "Help center and legal terms"
    },
    {
        name: 'Select Lanquage',
        id: 3,
        tag: "English"
    }
]

const Profile = () => {

    return (
        <View>
            {/* <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'> */}
            <View style={styles.header}>
                <View style={styles.circle} ></View>
                <View>
                    <View style={{ marginTop: 10,marginLeft:15 }}>
                        <TextInput placeholder="Name" defaultValue='Prasanth' style={styles.loginFormTextInput}></TextInput>

                    </View>

                </View>
            </View>
            <ScrollView style={styles.container}>
            {/* <View> */}
                <View style={styles.infoDetailsContainer}>

                </View>
                <View style={styles.detailsRow}>
                    <Text style={{ textAlign: "left", fontStyle: 'normal', fontWeight: 'bold' }}>
                        Tell us about you
                    </Text>
                </View>
                <View style={styles.detailsRow}>
                    <TextInput placeholder="Ad Tittle" defaultValue='Business, Music' style={styles.loginFormTextInput}></TextInput>
                </View>

                <View style={styles.detailsRow}>
                    <Text style={{ textAlign: "left", fontStyle: 'normal', fontWeight: 'bold' }}>
                        Contact information
                    </Text>
                </View>
                <View style={styles.detailsRow}>
                    <TextInput placeholder="Breed" defaultValue='9037463199' style={styles.loginFormTextInput}></TextInput>
                </View>
                <View style={styles.detailsRow}>
                    <Text style={{ textAlign: "left", fontStyle: 'normal', fontWeight: 'bold' }}>
                        Email
                    </Text>
                </View>
                <View style={styles.detailsRow}>
                    <TextInput placeholder="Breed" defaultValue='emailMe@wolhstand.com' style={styles.loginFormTextInput}></TextInput>
                </View>
                <View style={{ marginTop: 70, flexDirection: 'row', justifyContent: 'flex-end',  }}>
                <Button title="Save" buttonStyle={{ width: 200, borderRadius: 0, backgroundColor: '#446ffc' }} onPress={() => {
                        console.log('save')
                    }} />
                   
                {/* </View> */}

            </View>
            </ScrollView>
        </View>
    );
}

export default Profile