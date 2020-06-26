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
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import { Dropdown } from 'react-native-material-dropdown';

interface Props {
    navigation: any
}
class CreateAd extends React.Component<Props>{
    state = {
        value: 0
    }
    data = [{
        value: 'MALE',
    }, {
        value: 'FEMALE',
    }];
    constructor(props) {
        super(props);

    }


    radio_props: any = [
        { label: 'I want to sell', value: 0 },
        { label: 'I want to buy', value: 1 }
    ];

    onPress = (value) => {
        this.setState({ value: value })
    }

    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <TouchableHighlight>
                    <View>

                        <View style={styles.lineheader}>
                            <Text style={{ textAlign: "center", fontStyle: 'normal', color: 'black' }}>
                                CATEGORY DETAILD
                    </Text>
                        </View>
                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Category</Text>
                            <TextInput placeholder="Category" style={styles.formTextInput}></TextInput>
                        </View>
                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Breed</Text>
                            <TextInput placeholder="Breed" style={styles.formTextInput}></TextInput>
                        </View>
                        <View style={styles.radioRow}>
                            <RadioForm
                                formHorizontal={true}
                                animation={true}
                            >
                                {/* To create radio buttons, loop through your array of options */}
                                {
                                    this.radio_props.map((obj, i) => (
                                        <RadioButton labelHorizontal={true} key={i} >
                                            {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                            <RadioButtonInput
                                                obj={obj}
                                                index={i}
                                                isSelected={this.state.value === i}
                                                onPress={this.onPress}
                                                borderWidth={1}
                                                buttonInnerColor={'#0a87f5'}
                                                buttonOuterColor={'#c7c7c7'}
                                                buttonSize={15}
                                                buttonOuterSize={20}
                                                buttonInnerSize={20}
                                                buttonStyle={{}}
                                                buttonWrapStyle={{ marginLeft: 10 }}
                                            />
                                            <RadioButtonLabel
                                                obj={obj}
                                                index={i}
                                                labelHorizontal={true}
                                                onPress={this.onPress}
                                                labelStyle={{ color: 'black' }}
                                                labelWrapStyle={{}}
                                            />
                                        </RadioButton>
                                    ))
                                }
                            </RadioForm>

                        </View>
                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Age</Text>
                            <TextInput placeholder="Age" style={styles.formTextInput}></TextInput>
                        </View>

                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Gender</Text>
                            <View style={{
                                width: '97%',
                                justifyContent: 'space-between',
                                marginBottom: 1,
                                marginLeft: 10,
                                marginRight: 10,
                            

                            }}>
                                <Dropdown containerStyle={{marginTop:0}}
                                    label='Male'animationDuration={0}
                                    data={this.data}
                                />
                            </View>
                        </View>
                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Weight</Text>
                            <TextInput placeholder="Weight" style={styles.formTextInput}></TextInput>
                        </View>

                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Milking Capacity</Text>
                            <TextInput placeholder="Milking Capacity" style={styles.formTextInput}></TextInput>
                        </View>

                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Ad Tittle</Text>
                            <TextInput placeholder="Enter Ad tittle (Min 10 character)" style={styles.formTextInput}></TextInput>
                        </View>
                        
                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Additional Information</Text>
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

                        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: "flex-end", backgroundColor: '#0a87f5' }}>
                            <Button title="Next" buttonStyle={{ width: 200, borderRadius: 0, backgroundColor: '#0a87f5' }} onPress={() => {
                                this.props.navigation.navigate('Upload Images');
                            }} />
                        </View>

                    </View>
                </TouchableHighlight>
            </ScrollView>
        )
    }
}

export default CreateAd