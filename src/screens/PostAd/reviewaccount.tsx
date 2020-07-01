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
import { RecipeCard } from '../../appstyles';
import Textarea from 'react-native-textarea';
import { Button } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import { Dropdown } from 'react-native-material-dropdown';

interface Props {
    navigation: any
}
class Review extends React.Component<Props>{
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
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: "flex-start" }}>

                        <View style={styles.lineheader}>
                        <Text style={RecipeCard.headerTextColor}>
                                Profile Details
                            </Text>
                        </View>
                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Name</Text>
                            <TextInput placeholder="Name" value={"Prasanth M S"} style={styles.formTextInput}></TextInput>
                        </View>
                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Location</Text>
                            <TextInput placeholder="Location" style={styles.formTextInput}></TextInput>
                        </View>
                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Mobile Number</Text>
                            <TextInput placeholder="Mobile Number" value={"9037463199"} style={styles.formTextInput}></TextInput>
                        </View>
                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>EMail</Text>
                            <TextInput placeholder="Email" value={"prashanthmsktm@gmail.com"} style={styles.formTextInput}></TextInput>
                        </View>




                        <View style={{ flex: 1, flexDirection: 'row', marginTop:20, alignItems: 'flex-end', justifyContent: "flex-end" }}>
                        <Button title="Post Now" buttonStyle={{ width: '100%', borderRadius: 20, backgroundColor: '#0a87f5' }} onPress={() => {
                                   alert('Your Ad is being posted')
                                }} />

                        </View>

                    </View>
                </TouchableHighlight>
            </ScrollView>
        )
    }
}

export default Review