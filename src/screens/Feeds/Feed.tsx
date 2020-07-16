
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
class Feed extends React.Component<Props>{
    state = Store.getFeedData()
   
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
    
    componentDidMount() {
        this.setState({ sell: 0 })
    }


    render() {
        return (

            <View>
                
                <View style={styles.detailsRow}>
                    <Text style={styles.inputlabel} >Type</Text>
                    <TextInput placeholder="Category" value=
                        {this.props.route.params.name} style={styles.formTextInput} onChangeText={
                            (text) => {
                                this.setState({ Category: text })
                            }}></TextInput>
                </View>
                <View style={styles.detailsRow}>
                    <Text style={styles.inputlabel}>Product Name</Text>
                    <TextInput placeholder="Product Name" style={styles.formTextInput} onChangeText={
                        (text) => {
                            this.setState({ ProductName: text })
                        }}></TextInput>
                </View>
                <View style={styles.detailsRow}>
                    <Text style={styles.inputlabel}>Feed Type</Text>
                    <TextInput placeholder="Exmple: For Cow, Goat etc" style={styles.formTextInput} onChangeText={
                        (text) => {
                            this.setState({ Brand: text })
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
                    <Text style={styles.inputlabel}>Brand</Text>
                    <TextInput placeholder="Brand" style={styles.formTextInput} onChangeText={
                        (text) => {
                            this.setState({ Brand: text })
                        }}></TextInput>
                </View>
                <View style={styles.detailsRow}>
                    <Text style={styles.inputlabel}>Package Weight</Text>
                    <TextInput placeholder="Example: 50 KG, 100 KG" style={styles.formTextInput} onChangeText={
                        (text) => {
                            this.setState({ Brand: text })
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
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 0, marginBottom:20,alignItems: 'center', justifyContent: "center" }}>
                    <Button title="Next" buttonStyle={{ width: '100%', borderRadius: 30, backgroundColor: '#038d91' }} onPress={() => {
                        Store.setFeedData(this.state);
                        this.props.navigation.navigate('Upload Images', { name: 'FarmEquipment' });
                    }} />

                </View>
            </View>

        )
    }
}

export default Feed