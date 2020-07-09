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

import { RecipeCard } from '../../appstyles';
import styles from '../PostAd/styles';
import Textarea from 'react-native-textarea';
import { Button } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import { Dropdown } from 'react-native-material-dropdown'; 
import LiveStock from '../LiveStock/LiveStock'; 
import FarmEquipments from '../FarmEquipments/FarmEquipments';
import PropertyAd from '../Property/property';

interface Props {
    navigation: any;
    route: any;

    Category: String;
    Breed: String;
    Gender: String;
    Age: any;
    Weight: any;
    Color: String;
    Type: String;
    MilkingCapacity: String;
    NoOfKids: String;
    KidsWeight: any;
    KidsDetails: String;
    Tittle: String;
    Description: String;
    State: String;
    District: String;
    Locality: String;
    Date: String;
    imageRef: any;
    UserId: any;
    Price: any
}

interface State {
    Category: String;
    Breed: String;
    Gender: String;
    Age: any;
    Weight: any;
    Color: String;
    Type: String;
    MilkingCapacity: String;
    NoOfKids: String;
    KidsWeight: any;
    KidsDetails: String;
    tittle: String;
    Description: String;
    State: String;
    District: String;
    Locality: String;
    Date: String;
    imageRef: any;
    UserId: any;
    Price: any;
    id
}
class CreateAd extends React.Component<Props>{
    state = {
        value: 0
    }
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

    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <TouchableHighlight>
                    <ScrollView style={styles.scrollContainer}>
                        <TouchableHighlight>
                            {
                                (this.props.route == 'LiveStock') ?
                                    <LiveStock navigation={this.props.navigation}></LiveStock> :
                                    // (this.props.route == 'Property') ?
                                        // <PropertyAd></PropertyAd> :
                                        (this.props.route == 'FarmEquipments') ?
                                            <FarmEquipments navigation={this.props.navigation}></FarmEquipments> :
                                            (this.props.route == 'Feeds') ?
                                                <LiveStock navigation={this.props.navigation}></LiveStock> :
                                                (this.props.route == 'Traing') ?
                                                    <LiveStock navigation={this.props}></LiveStock> :
                                                    <LiveStock navigation={this.props}></LiveStock>

                            }
                        </TouchableHighlight>
                    </ScrollView>
                </TouchableHighlight>
            </ScrollView>
        )
    }
}

export default CreateAd


