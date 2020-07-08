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
import { Button } from 'react-native-elements';
import { Store } from '../../store/store';
import { HomeService } from '../../services/homeservice';
import { uploadFile, TestuploadFile } from './UploadToS3';

interface Props {
    navigation: any
}

interface State {
    Name: string,
    Location: string,
    MobileNum: string,
    EMail: string,
    UserID: number,
    State: string,
    District: string,
    Locality: string,
}
class Review extends React.Component<Props, State>{

    postData: any = {};
    data = [{
        value: 'MALE',
    }, {
        value: 'FEMALE',
    }];
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Location: '',
            MobileNum: "",
            EMail: "",
            UserID: 0,
            State: "",
            District: "",
            Locality: ''
        }

    }

    generateRowId(shardId /* range 0-64 for shard/slot */) {
        var ts = new Date().getTime() - 1300000000000; // limit to recent
        var randid = Math.floor(Math.random() * 512);
        ts = (ts * 64);   // bit-shift << 6
        ts = ts + shardId;
        return (ts * 512) + (randid % 512);
    }
    // var newPrimaryHashKey = "obj_name:" + generateRowId(4);
    componentDidMount() {
        this.setState(this.getUserDetails())
    }

    getUserDetails() {
        return {
            Name: "Prasanth",
            MobileNum: "9037463199",
            EMail: "prashanthmsktm@gmail.com",
            UserID: 10001,
            State: "Kerala",
            District: "Kochi",
            Locality: 'Pallikkara'
        }
    }
    radio_props: any = [
        { label: 'I want to sell', value: 0 },
        { label: 'I want to buy', value: 1 }
    ];

    postAd = async () => { 
        Store.GetImageArray().then((data) => { 
            data.forEach(async (element )=> { 
                await uploadFile(this.generateRowId(4)+'/'+element.filename, element.uri);
            });

        })

      
        this.postData.UserName = this.state.Name
        this.postData.Locality = this.state.Locality
        this.postData.MobileNum = this.state.MobileNum
        this.postData.Email = this.state.EMail
        this.postData.UserId = this.state.UserID;
        this.postData.State = this.state.State
        this.postData.District = this.state.District
        this.postData.DisplayAdID = 'AD' + this.generateRowId(4)
        await Store.setContactData(this.postData);
        let inputModel: any = Store.getPostData();
        console.log(inputModel)
        HomeService.getInstance().postAd(Store.getPostData())
            .then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.props.navigation.navigate('Home')
            })
            .catch(error => console.log(error)) //to catch the errors if any
    }

    render() {
        return (
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <TouchableHighlight>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: "flex-start" }}>

                        <View style={styles.lineheader}>
                            <Text style={RecipeCard.headerTextColor}>
                                Price
                            </Text>
                        </View>

                        <View style={styles.priceRow}>
                            <TextInput placeholder="Price" style={styles.priceTextInput}
                                onChangeText={
                                    (text) => {
                                        this.postData.Price = text;
                                    }}
                            ></TextInput>
                        </View>

                        <View style={styles.lineheader}>
                            <Text style={RecipeCard.headerTextColor}>
                                Contact Details
                            </Text>
                        </View>

                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Name</Text>
                            <TextInput placeholder="Name" value={this.state.Name} onChangeText={
                                (text) => {
                                    this.setState({ Name: text })
                                }} style={styles.formTextInput}></TextInput>
                        </View>
                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Location</Text>
                            <TextInput placeholder="Location" value={this.state.Location} style={styles.formTextInput} onChangeText={
                                (text) => {
                                    this.setState({ Location: text })
                                }} ></TextInput>
                        </View>
                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Mobile Number</Text>
                            <TextInput value={this.state.MobileNum} placeholder="Mobile Number" style={styles.formTextInput} onChangeText={
                                (text) => {
                                    this.setState({ MobileNum: text })
                                }}></TextInput>
                        </View>
                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>EMail</Text>
                            <TextInput value={this.state.EMail} placeholder="Email" style={styles.formTextInput} onChangeText={
                                (text) => {
                                    this.setState({ EMail: text })
                                }}></TextInput>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, alignItems: 'flex-end', justifyContent: "flex-end" }}>
                            <Button title="Post Now" buttonStyle={{ width: '100%', borderRadius: 30, backgroundColor: '#038d91' }} onPress={() => {
                                this.postAd()
                            }} />

                        </View>

                    </View>
                </TouchableHighlight>
            </ScrollView>
        )
    }
}

export default Review