
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

interface Props {
    navigation: any;
    route:any;
}
class Job extends React.Component<Props>{
    state = Store.getJobData()
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
        { label: 'I am an Employeer', value: 0 },
        { label: 'I need a job', value: 1 }
    ];

    onPress = (value) => {
        this.setState({ value: value })
    }

    componentDidMount() {
        this.setState({ sell: 0 })
    }

    render() {
        return (

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
                    <Text style={styles.inputlabel}>Job Type</Text>
                    <TextInput placeholder="Example: Farm keeper, Delivery Boy" style={styles.formTextInput} onChangeText={
                        (text) => {
                            this.setState({ JobType: text })
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
                                        buttonWrapStyle={{ marginLeft: 10 }}
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
                    <Text style={styles.inputlabel}>Min Salary</Text>
                    <TextInput placeholder="Brand" style={styles.formTextInput} onChangeText={
                        (text) => {
                            this.setState({ MinSal: text })
                        }}></TextInput>
                </View>
                <View style={styles.detailsRow}>
                    <Text style={styles.inputlabel}>Max Salary</Text>
                    <TextInput placeholder="Brand" style={styles.formTextInput} onChangeText={
                        (text) => {
                            this.setState({ MaxSal: text })
                        }}></TextInput>
                </View>
                <View style={styles.lineheader}>
                    <Text style={RecipeCard.headerTextColor}>
                        Ad DETAIL
                     </Text>
                </View>
                <View style={styles.detailsRow}>
                    <Text style={styles.inputlabel}>Ad Tittle</Text>
                    <TextInput placeholder="Enter Ad tittle (Min 10 character)" style={styles.formTextInput}
                        onChangeText={
                            (text) => {
                                this.setState({ Tittle: text })
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
                <View style={{ flex: 1, flexDirection: 'row',marginBottom:20, marginTop: 0, alignItems: 'center', justifyContent: "center" }}>
                    <Button title="Next" buttonStyle={{ width: '100%', borderRadius: 30, backgroundColor: '#038d91' }} onPress={() => {
                        Store.setJobData(this.state);
                        this.props.navigation.navigate('Review Details', { name: 'Job' });
                    }} />

                </View>
            </View>

        )
    }
}

export default Job