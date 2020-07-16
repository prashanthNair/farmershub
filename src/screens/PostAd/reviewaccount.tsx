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
import { uploadFile } from './UploadToS3';

interface Props {
    navigation: any;
    route: any;
}

class Review extends React.Component<Props>{

    state = Store.getContactData()
    postData: any = {};
    mainImage = '';
    imageUriList;
    imageList;

    cloudfront = "https://d2hz6adm60005w.cloudfront.net/";

    data = [{
        value: 'MALE',
    }, {
        value: 'FEMALE',
    }];
    constructor(props) {
        super(props);
        this.state = Store.getContactData()
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
        this.imageUriList = [];
        this.imageList = [];
        this.setState(this.getUserDetails())
        Store.GetImageArray().then((data) => {
            data.forEach(async (element, index) => {
                let filename = this.generateRowId(4) + '/' + element.filename;
                let url = this.cloudfront + filename
                let imageObj =
                {
                    uri: element.uri,
                    filename: filename
                }
                this.imageList.push(imageObj)
                this.imageUriList.push(url)
            });
        })
    }

    getUserDetails() {
        return {
            Name: "Prasanth",
            MobileNum: "9037463199",
            EMail: "prashanthmsktm@gmail.com",
            UserID: '1',
            State: "Kerala",
            District: "Kochi",
            Locality: 'Pallikkara'
        }
    }
    radio_props: any = [
        { label: 'I want to sell', value: 0 },
        { label: 'I want to buy', value: 1 }
    ];

    private async postImagesToS3() {
        let arr = []

        this.imageList.forEach(async (element) => {
            let res = await uploadFile(element.filename, element.uri).then(() => {
                arr.push((this.cloudfront + element.filename))
                console.log('Uploaded')
            }).catch((error) => {
                console.log(error);
            });

        });

    }

    buildData() {
        let data;
        if (this.props.route.params.routeObj.tittle === 'Property') {
            data = Store.GetPropertyData();
        } else if (this.props.route.params.routeObj.tittle === 'LiveStock') {
            data = Store.getLiveStockData()
        }
        else if (this.props.route.params.routeObj.tittle === 'Job') {
            data = Store.getJobData()
        }
        else if (this.props.route.params.routeObj.tittle === 'Feeds') {
            data = Store.getFeedData()
        }
        else if (this.props.route.params.routeObj.tittle === 'Pets') {
            data = Store.getPetData()
        }
        else if (this.props.route.params.routeObj.tittle === 'FarmEquipments') {
            data = Store.getEquipmentData()
        }
        let contactData = Store.getContactData();
        let keys = Object.keys(contactData);

        keys.forEach((key, index) => {
            if (key)
                data[key] = contactData[key]
        })
        data.ImgaeList = this.imageUriList
        data.MainImageUri = this.imageUriList[0]
        data.AdId = "" + this.generateRowId(8)
        data.UserId = '3' 
        Store.setPostData(data);

    }

    private async postDataDynamo() {

        HomeService.getInstance().postAd(Store.getPostData())
            .then(response => response.json())
            .then((responseJson) => {
                this.imageUriList = [];
                console.log('Post Dynamo', Store.getPostData())
                // this.props.navigation.navigate('Home')
            })
            .catch(error => console.log(error)) //to catch the errors if any
    }

    private postAd = async () => {
        await Store.setContactData(this.state);
        await this.postImagesToS3().then(res => {
            console.log("Image uploaded to S 3");

            console.log('asasa', this.imageUriList)
            this.buildData();
            this.setState({ DisplayAdID: this.generateRowId(4) })
            this.postDataDynamo();
        });

        // this.postData.UserName = this.state.UserName
        // this.postData.Locality = this.state.Locality
        // this.postData.MobileNum = this.state.MobileNum
        // this.postData.Email = this.state.Email
        // this.postData.UserId = this.state.UserName;
        // this.postData.State = this.state.State
        // this.postData.District = this.state.District
        //this.postData.DisplayAdID = 'AD' + this.generateRowId(4)


    }

    render() {
        return (
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <TouchableHighlight>
                    <View>
                        {
                            (this.props.route.params.name != 'Job') ?
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
                                                    this.setState({ Price: text })
                                                }}
                                        ></TextInput>
                                    </View>

                                </View> : <View></View>
                        }
                        <View style={styles.lineheader}>
                            <Text style={RecipeCard.headerTextColor}>
                                Contact Details
                            </Text>
                        </View>

                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Name</Text>
                            <TextInput placeholder="Name" value={this.state.UserName} onChangeText={
                                (text) => {
                                    this.setState({ Name: text })
                                }} style={styles.formTextInput}></TextInput>
                        </View>
                        <View style={styles.detailsRow}>
                            <Text style={styles.inputlabel}>Location</Text>
                            <TextInput placeholder="Location" value={this.state.Locality} style={styles.formTextInput} onChangeText={
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
                            <TextInput value={this.state.Email} placeholder="Email" style={styles.formTextInput} onChangeText={
                                (text) => {
                                    this.setState({ EMail: text })
                                }}></TextInput>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: "center" }}>
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