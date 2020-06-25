import React from 'react';
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
import styles from '../PostAd/styles';
import Textarea from 'react-native-textarea';
import { Button } from 'react-native-elements';

const CreateAd = (props) => {

    return (
        <ScrollView style={styles.scrollContainer}>
            <TouchableHighlight>
                <View>
                    <View style={styles.infoDetailsContainer}>
                       
                    </View>
                    <View style={styles.detailsRow}>
                        <Text style={{ textAlign: "left", fontStyle: 'normal', fontWeight: 'bold' }}>
                            Ad Tittle
                    </Text>
                    </View>
                    <View style={styles.detailsRow}>
                        <TextInput placeholder="Ad Tittle" style={styles.loginFormTextInput}></TextInput>
                    </View>

                    <View style={styles.detailsRow}>
                        <Text style={{ textAlign: "left", fontStyle: 'normal', fontWeight: 'bold' }}>
                            Breed
                    </Text>
                    </View>
                    <View style={styles.detailsRow}>
                        <TextInput placeholder="Breed" style={styles.loginFormTextInput}></TextInput>
                    </View>
                    <View style={styles.detailsRow}>
                        <Text style={{ textAlign: "left", fontStyle: 'normal', fontWeight: 'bold' }}>
                            Age
                    </Text>
                    </View>
                    <View style={styles.detailsRow}>
                        <TextInput placeholder="Breed" style={styles.loginFormTextInput}></TextInput>
                    </View>

                    <View style={styles.detailsRow}>
                        <Text style={{ textAlign: "left", fontStyle: 'normal', fontWeight: 'bold' }}>
                            Gender
                    </Text>
                    </View>
                    <View style={styles.detailsRow}>
                        <TextInput placeholder="Breed" style={styles.loginFormTextInput}></TextInput>
                    </View>

                    <View style={styles.detailsRow}>
                        <Text style={{ textAlign: "left", fontStyle: 'normal', fontWeight: 'bold' }}>
                            Weight
                    </Text>
                    </View>
                    <View style={styles.detailsRow}>
                        <TextInput placeholder="Weight" style={styles.loginFormTextInput}></TextInput>
                    </View>
                    <View style={styles.detailsRow}>
                        <Text style={{ textAlign: "left", fontStyle: 'normal', fontWeight: 'bold' }}>
                            Additional Information
                    </Text>
                    </View>
                    <View style={styles.container}>
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText={() => { console.log('click') }}
                            // defaultValue={' Additional Information'}
                            maxLength={120}
                            placeholder={'Additional Information'}
                            placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>

                    <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: "flex-end", backgroundColor: '#446ffc' }}>

                        <Button title="Next" buttonStyle={{ width: 200, borderRadius: 0, backgroundColor: '#446ffc' }} onPress={() => {
                         props.navigation.navigate('Upload Images');
                        }} />
                    </View>

                </View>
            </TouchableHighlight>
        </ScrollView>
    )
}

export default CreateAd