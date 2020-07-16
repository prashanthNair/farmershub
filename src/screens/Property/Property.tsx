import React from 'react';
import { ScrollView, Text, View, TouchableHighlight, TextInput } from 'react-native';
import { RecipeCard } from '../../appstyles';
import styles from '../PostAd/styles';
import Textarea from 'react-native-textarea';
import { Button } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Dropdown } from 'react-native-material-dropdown';
import { Store } from '../../store/store';

interface Props {
    navigation: any;
    route: any;
}

interface State {
    listedBy: string;
    propertyType: string;
    plotArea: string;
    cents: string;
    landType: string;
    farmHouselength: string;
    farmHouseSize: string;
    adTitle: string;
    adDiscription: string;
    sell: number;
    buy: number;

}
class Property extends React.Component<Props> {
    //  state =this.props.data; 

    state = Store.GetPropertyData() 
    data = [{
        value: 'MALE',
    }, {
        value: 'FEMALE',
    }];
    constructor(props) {
        super(props);
        console.log('route', this.props.route.name)
    }


    radio_props: any = [
        { label: 'I want to sell', value: 0 },
        { label: 'I want to buy', value: 1 }
    ];

    onPress = (value) => {
        //  this.setState({ value: value })
    }

    componentDidMount() {
        this.setState({ sell: 0 })
    }

    render() {
 
        return (

            <View style={styles.scrollContainer}>

                
                <View style={styles.detailsRow}>
                    <Text style={styles.inputlabel} >Type</Text>
                    <TextInput placeholder="Category" value=
                        {this.props.route.params.name} style={styles.formTextInput} onChangeText={
                            (text) => {
                                this.setState({ Category: text })
                            }}></TextInput>
                </View>
                <View style={styles.detailsRow}>
                    <Text style={styles.inputlabel} >Plot Area</Text>
                    <TextInput placeholder="In Cents/Acers" style={styles.formTextInput} onChangeText={
                        (text) => {
                            this.setState({ plotArea: text })
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
                                        this.state.buyOrSell = text;
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
                                        labelStyle={{ color: 'black' }}
                                        labelWrapStyle={{}}
                                    />
                                </RadioButton>
                            ))
                        }
                    </RadioForm>

                </View>
                <View style={styles.detailsRow}>
                    <Text style={styles.inputlabel}>Farm House Length (Optional)</Text>
                    <TextInput placeholder="Length" style={styles.formTextInput} onChangeText={
                        (text) => {
                            this.setState({ farmHouselength: text })
                        }}></TextInput>
                </View>

                <View style={styles.detailsRow}>
                    <Text style={styles.inputlabel}>Farm House Size (Optional)</Text>
                    <TextInput placeholder="Size" style={styles.formTextInput} onChangeText={
                        (text) => {
                            this.setState({ farmHouseSize: text })
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
                                this.state.adTitle = text;
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
                                this.state.adDiscription = text;
                            }}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: 'row',marginBottom:20, alignItems: 'center', justifyContent: "center" }}>
                    <Button title="Next" buttonStyle={{ width: '100%', borderRadius: 30, backgroundColor: '#038d91' }} onPress={() => {
                        Store.SetPropertyData(this.state);
                        this.props.navigation.navigate('Upload Images', { name: "Property" });
                    }} />

                </View>

            </View>

        )
    }
}

export default Property