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
import Property from '../Property/Property';
import Feed from '../Feeds/Feed';
import Pet from '../Pets/Pets';
import Job from '../Job/Job';



interface Props {
    navigation: any;
    route: any;
    data:any;
    
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
        console.log('route name', this.props.route.params);
        return (


            <ScrollView style={styles.scrollContainer}>
                <TouchableHighlight>
                    <View>
                        <View style={styles.lineheader}>
                            <Text style={RecipeCard.headerTextColor}>
                                CATEGORY DETAIL
            </Text>
                        </View>

                        {
                            (this.props.route.params.tittle == 'LiveStock') ?
                                <LiveStock data ={this.props.route.params.data} navigation={this.props.navigation} route={this.props.route}></LiveStock> :
                                (this.props.route.params.tittle == 'Property') ?
                                    <Property navigation={this.props.navigation} route={this.props.route}></Property> :
                                    (this.props.route.params.tittle == 'FarmEquipments') ?
                                        <FarmEquipments navigation={this.props.navigation} route={this.props.route}></FarmEquipments> :
                                        (this.props.route.params.tittle == 'Feeds') ?
                                            <Feed navigation={this.props.navigation} route={this.props.route}></Feed> :
                                            (this.props.route.params.tittle == 'Pets') ?
                                            <Pet navigation={this.props.navigation} route={this.props.route}></Pet> :
                                            (this.props.route.params.tittle == 'Job') ?
                                            <Job navigation={this.props.navigation} route={this.props.route}></Job> :
                                         
                                            (this.props.route.params.tittle == 'Training') ?
                                                <LiveStock navigation={this.props.navigation} route={this.props.route}></LiveStock> :
                                                <LiveStock navigation={this.props.navigation} route={this.props.route}></LiveStock>
                        }
                    </View>
                </TouchableHighlight>
            </ScrollView>
        )
    }
}

export default CreateAd


