import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
  TextInput,
} from "react-native";

import Spinner from "react-native-loading-spinner-overlay";
import styles from "../PostAd/styles";
import { RecipeCard } from "../../appstyles";
import { Button } from "react-native-elements";
import { Store } from "../../store/store";
import { HomeService } from "../../services/homeservice";
import { uploadFile } from "./uploadToS3";

interface Props {
  navigation: any;
  route: any;
}

class Review extends React.Component<Props> {
  state = Store.getContactData();
  postData: any = {};
  mainImage = "";
  imageUriList;
  imageList;

  cloudfront = "https://d2hz6adm60005w.cloudfront.net/";

  data = [
    {
      value: "MALE",
    },
    {
      value: "FEMALE",
    },
  ];

  inputValidation = {
    price: {
      color: "#c7c7c7",
    },
  };

  constructor(props) {
    super(props);
    this.state = Store.getContactData();
    this.state.spinner = false;
  }

  generateRowId(shardId /* range 0-64 for shard/slot */) {
    var ts = new Date().getTime() - 1300000000000; // limit to recent
    var randid = Math.floor(Math.random() * 512);
    ts = ts * 64; // bit-shift << 6
    ts = ts + shardId;
    return ts * 512 + (randid % 512);
  }
  // var newPrimaryHashKey = "obj_name:" + generateRowId(4);
  componentDidMount() {
    this.imageUriList = [];
    this.imageList = [];
    this.setState(this.getUserDetails());
    Store.GetImageArray().then((data) => {
      data.forEach(async (element, index) => {
        let filename = "3" + "/" + element.filename;
        let url = this.cloudfront + filename;
        let imageObj = {
          uri: element.uri,
          filename: filename,
        };
        this.imageList.push(imageObj);
        this.imageUriList.push(url);
      });
    });
  }

  componentWillUnmount() {
    this.setState({
      spinner: false,
    });
  }
  getUserDetails() {
    return {
      Name: "Prasanth",
      MobileNum: "9037463199",
      EMail: "prashanthmsktm@gmail.com",
      State: "Kerala",
      District: "Kochi",
      Locality: "Pallikkara",
    };
  }
  radio_props: any = [
    { label: "I want to sell", value: 0 },
    { label: "I want to buy", value: 1 },
  ];

  private async postImagesToS3() {
    let arr = [];

    this.imageList.forEach(async (element) => {
      let res = await uploadFile(element.filename, element.uri)
        .then(() => {
          arr.push(this.cloudfront + element.filename);
          console.log("Uploaded");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  buildData(): any {
    console.log(this.props.route.params.routeObj);
    let data;
    if (this.props.route.params.routeObj.tittle === "Property") {
      data = Store.GetPropertyData();
    } else if (this.props.route.params.routeObj.tittle === "LiveStock") {
      data = Store.getLiveStockData();
    } else if (this.props.route.params.routeObj.tittle === "Job") {
      data = Store.getJobData();
    } else if (this.props.route.params.routeObj.tittle === "Feeds") {
      data = Store.getFeedData();
    } else if (this.props.route.params.routeObj.tittle === "Pets") {
      data = Store.getPetData();
    } else if (this.props.route.params.routeObj.tittle === "FarmEquipments") {
      data = Store.getEquipmentData();
    }
    let contactData = Store.getContactData();
    let keys = Object.keys(contactData);

    keys.forEach((key, index) => {
      if (key) data[key] = contactData[key];
    });
    return data;
  }

  private async updateAd() {
    let data = Store.getPostData();
    delete data.spinner;
    delete data.HasError;
    HomeService.getInstance()
      .UpdateAd(data)
      .then((response) => response.json())
      .then((responseJson) => {
        this.imageUriList = [];
        console.log("Update Dynamo", data);
        this.props.navigation.navigate.push("Home");
        this.setState({
          spinner: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          spinner: false,
        });
      }); //to catch the errors if any
  }

  private async postDataDynamo() {
    let data = Store.getPostData();
    delete data.spinner;
    delete data.HasError;
    HomeService.getInstance()
      .postAd(data)
      .then((response) => response.json())
      .then((responseJson) => {
        this.imageUriList = [];
        console.log("Post Dynamo", data);
        this.props.navigation.navigate.push("Home");
        this.setState({
          spinner: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          spinner: false,
        });
      }); //to catch the errors if any
  }

  private postAd = async () => {
    if (!this.state.Price) {
      this.inputValidation = {
        price: {
          color: "#fa1c0c",
        },
      };
      return;
    }

    setTimeout(() => {
      this.setState({
        spinner: !this.state.spinner,
      });
    }, 3000);

    await Store.setContactData(this.state);
    await this.postImagesToS3().then((res) => {
      console.log("Image uploaded to S 3");

      console.log("asasa", this.imageUriList);
      let data = this.buildData();
      data.ImgaeList = this.imageUriList;
      data.MainImageUri = this.imageUriList[0];
      if (data.AdId) {
        Store.setPostData(data);
        this.updateAd();
      } else {
        data.AdId = "" + this.generateRowId(8);
        data.UserId = "3";
        Store.setPostData(data);
        this.setState({ DisplayAdID: this.generateRowId(4) });
        this.postDataDynamo();
      }
    });
  };

  render() {
    return (
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <TouchableHighlight>
          <View>
            <Spinner
              visible={this.state.spinner}
              textContent={"Loading..."}
              textStyle={RecipeCard.spinnerTextStyle}
            />
            {this.props.route.params.name != "Job" ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <View style={styles.lineheader}>
                  <Text style={RecipeCard.headerTextColor}>Price</Text>
                </View>

                <View style={styles.priceRow}>
                  <TextInput
                    placeholder="Price"
                    style={styles.priceTextInput}
                    placeholderTextColor={this.inputValidation.price.color}
                    onChangeText={(text) => {
                      this.setState({ Price: text });
                    }}
                  ></TextInput>
                </View>
              </View>
            ) : (
              <View></View>
            )}
            <View style={styles.lineheader}>
              <Text style={RecipeCard.headerTextColor}>Contact Details</Text>
            </View>

            <View style={styles.detailsRow}>
              <Text style={styles.inputlabel}>Name</Text>
              <TextInput
                placeholder="Name"
                value={this.state.UserName}
                onChangeText={(text) => {
                  this.setState({ Name: text });
                }}
                style={styles.formTextInput}
              ></TextInput>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.inputlabel}>Location</Text>
              <TextInput
                placeholder="Location"
                value={this.state.Locality}
                style={styles.formTextInput}
                onChangeText={(text) => {
                  this.setState({ Location: text });
                }}
              ></TextInput>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.inputlabel}>Mobile Number</Text>
              <TextInput
                value={this.state.MobileNum}
                placeholder="Mobile Number"
                style={styles.formTextInput}
                onChangeText={(text) => {
                  this.setState({ MobileNum: text });
                }}
              ></TextInput>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.inputlabel}>EMail</Text>
              <TextInput
                value={this.state.Email}
                placeholder="Email"
                style={styles.formTextInput}
                onChangeText={(text) => {
                  this.setState({ EMail: text });
                }}
              ></TextInput>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginTop: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                title="Post Now"
                buttonStyle={{
                  width: "100%",
                  borderRadius: 30,
                  backgroundColor: "#038d91",
                }}
                onPress={() => {
                  this.postAd();
                }}
              />
            </View>
          </View>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

export default Review;
