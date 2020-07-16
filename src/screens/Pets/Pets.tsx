import React from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    TouchableHighlight,
    TextInput
} from 'react-native';

import { RecipeCard } from '../../appstyles';
import styles from '../PostAd/styles';
import Textarea from 'react-native-textarea';
import { Button } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import { Dropdown } from 'react-native-material-dropdown';
import { Store } from '../../store/store';
import PropertyAd from '../Property/property';
import PostDataButton from '../../components/PostDataButton/PostDataButton';

interface Props {
    navigation;
    route: any;
}
class Pets extends React.Component<Props> {
    state = Store.getPetData()
    postData = {
        Category: "",
        Breed: "",
        Gender: '',
        Age: '',
        Weight: '',
        Color: '',
        Type: 'Male',
        MilkingCapacity: '',
        NoOfKids: '',
        KidsWeight: '',
        KidsDetails: '',
        Tittle: '',
        Description: '',
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
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.route.params.title,
        };
    };

    componentDidMount() {
        this.setState({ sell: 0 })
    }

    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <TouchableHighlight>
                    <View>
                       
                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel} >Category Type</Text>
                            <TextInput placeholder="Category" value=
                                {this.props.route.params.name} style={styles.formTextInput} onChangeText={
                                    (text) => {
                                        this.setState({ Category: text })
                                    }}></TextInput>
                        </View>

                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel} >Pet Type</Text>
                            <TextInput placeholder="Example: Dog, Kitten etc"style={styles.formTextInput} onChangeText={
                                    (text) => {
                                        this.setState({ PetTye: text })
                                    }}></TextInput>
                        </View>
                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Breed</Text>
                            <TextInput placeholder="Breed" style={styles.formTextInput} onChangeText={
                                (text) => {
                                    this.setState({ Breed: text })
                                }}></TextInput>
                        </View>
                        <View style={styles.radioRow}>
                            <RadioForm
                                formHorizontal={true}
                                animation={true}
                            >
                                {/* To create radio buttons, loop through your array of options */}
                                {
                                    this.radio_props.map((obj, i) => (
                                        <RadioButton labelHorizontal={true} key={i} onChangeText={
                                            (text) => {
                                                this.setState({ buyOrSell: text })
                                            }} >
                                            <RadioButtonInput
                                                obj={obj}
                                                index={i}
                                                isSelected={this.state.sell == i}
                                                onPress={(text) => {
                                                    this.setState({ sell: 1 })
                                                    this.setState({ buy: 0 })
                                                }}
                                                borderWidth={1}
                                                buttonInnerColor={'#0a87f5'}
                                                buttonOuterColor={'#c7c7c7'}
                                                buttonSize={15}
                                                buttonOuterSize={20}
                                                buttonInnerSize={20}
                                                buttonStyle={{}}
                                                buttonWrapStyle={{ marginLeft: 10, }}
                                            />
                                            <RadioButtonLabel
                                                obj={obj}
                                                index={i}
                                                isSelected={this.state.buy == i}
                                                labelHorizontal={true}
                                                onPress={(text) => {
                                                    this.state.buyOrSell = text;
                                                    this.setState({ sell: 0 })
                                                    this.setState({ buy: 1 })
                                                }}
                                                labelStyle={{ color: 'black', fontWeight: 'bold' }}
                                                labelWrapStyle={{}}
                                            />
                                        </RadioButton>
                                    ))
                                }
                            </RadioForm>

                        </View>

                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Age</Text>
                            <TextInput placeholder="Age" style={styles.formTextInput} onChangeText={
                                (text) => {
                                    this.setState({ Age: text })
                                }}></TextInput>
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
                                <Dropdown containerStyle={{ marginTop: 0 }}
                                    label='Male' animationDuration={0}
                                    data={this.data}
                                    onChangeText={
                                        (text) => {
                                            this.setState({ Gender: text })
                                        }}
                                />
                            </View>
                        </View>
                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Color</Text>
                            <TextInput placeholder="Red, Yellow" style={styles.formTextInput} onChangeText={
                                (text) => {
                                    this.setState({ Weight: text })
                                }}></TextInput>
                        </View>
                       
                        <View style={styles.lineheader}>
                            <Text style={RecipeCard.headerTextColor}>
                                Ad Details
                     </Text>
                        </View>
                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Ad Tittle</Text>
                            <TextInput placeholder="Enter Ad tittle (Min 10 character)" style={styles.formTextInput}
                                onChangeText={
                                    (text) => {
                                        this.postData.Tittle = text;
                                    }}></TextInput>
                        </View>

                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Additional Information</Text>
                            <Textarea
                                containerStyle={styles.textareaContainer}
                                style={styles.textarea}
                                // defaultValue={' Additional Information'}
                                maxLength={120}
                                placeholder={'Additional Information'}
                                placeholderTextColor={'#c7c7c7'}
                                underlineColorAndroid={'transparent'}
                                onChangeText={
                                    (text) => {
                                        this.setState({ Description: text })
                                    }}
                            />
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 0, marginBottom:20,alignItems: 'center', justifyContent: "center" }}>
                            <Button title="Next" buttonStyle={{ width: '100%', borderRadius: 30, backgroundColor: '#038d91' }} onPress={() => {
                                Store.setPetData(this.state);
                                this.props.navigation.navigate('Upload Images');
                            }} />

                        </View>

                    </View>
                </TouchableHighlight>
            </ScrollView>
        )
    }
}

export default Pets