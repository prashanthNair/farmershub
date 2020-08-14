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
import LocationSearch from "../Home/locationsearch";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GetLocation } from "../../components/Location/location";
import {
  getLocation,
  geocodeLocationByCoords,
} from "../../services/locationService";
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogButton,
  FadeAnimation,
} from "react-native-popup-dialog";
import { StackActions, NavigationActions } from "react-navigation";

interface Props {
  navigation: any;
  route: any;
}

interface state {
  hasShowLocation: boolean;
  State: string;
  District: string;
  Locality: string;
  Price: string;
  UserName: string;
  MobileNum: string;
  Email: string;
  spinner: boolean;
  HasError: boolean;
  hasShowAlert: boolean;
  status: string;
}
class Review extends React.Component<Props, state> {
  state = {
    UserName: "Prasanth",
    MobileNum: "9037463199",
    Email: "prashanthmsktm@gmail.com",
    State: "Kerala",
    District: "Kochi",
    Price: "",
    Locality: "Location",
    spinner: false,
    hasShowLocation: false,
    HasError: false,
    hasShowAlert: false,
    status: "",
  };
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

  radio_props: any = [
    { label: "I want to sell", value: 0 },
    { label: "I want to buy", value: 1 },
  ];

  inputValidation = {
    price: {
      color: "#c7c7c7",
    },
    MobileNum: {
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

  async getLocation() {
    try {
      let locationCords: any = await getLocation();
      let locationObj: any = await geocodeLocationByCoords(
        locationCords.latitude,
        locationCords.longitude
      );
      this.setState({
        Locality: `${locationObj.address_components[1].long_name}, ${locationObj.address_components[2].long_name}`,
        District: locationObj.address_components[2].long_name,
        State: locationObj.address_components[0].long_name,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {
    this.setState({
      hasShowAlert: false,
    });
    this.getUserDetails();
    await this.getLocation();
    this.imageUriList = [];
    this.imageList = [];
    // this.setState(this.getUserDetails());
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
    this.setState({
      UserName: "Prasanth",
      MobileNum: "9037463199",
      Email: "prashanthmsktm@gmail.com",
      State: "Kerala",
      District: "Kochi",
      Locality: "Location",
    });
  }

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
        this.setState({
          spinner: false,
          hasShowAlert: true,
          status: "Your Ad has been posted",
        });
      })
      .catch((error) => {
        data["HasError"] = "Insert";
        this.setState({
          spinner: false,
          hasShowAlert: true,
          status: "An error occured",
        });
      }); //to catch the errors if any
  }

  private async postDataDynamo() {
    let data = Store.getPostData();
    delete data.spinner;
    delete data.HasError;
    console.log("inputModel", data);
    HomeService.getInstance()
      .postAd(data)
      .then((response) => response.json())
      .then((responseJson) => {
        this.imageUriList = [];
        console.log("Post Dynamo", data);
        // this.props.navigation.navigate("My Ads", {
        //   screen: "My Ads",
        //   params: { tittle: data.Category },
        // });
        this.setState({
          spinner: false,
          hasShowAlert: true,
          status: "Your Ad has been posted",
        });
      })
      .catch((error) => {
        data["HasError"] = "Update";
        this.setState({
          spinner: false,
          hasShowAlert: true,
          status: "An error occured",
        });
      }); //to catch the errors if any
  }

  private postAd = async () => {
    if (!this.state.Price) {
      this.inputValidation.price = {
        color: "#fa1c0c",
      };
      this.setState({ HasError: true });
      return;
    } else if (!this.state.MobileNum) {
      this.inputValidation.MobileNum = {
        color: "#fa1c0c",
      };
      this.setState({ HasError: true });
      return;
    }

    //  setTimeout(() => {
    this.setState({
      spinner: true,
    });
    // }, 1000);

    await Store.setContactData(this.state);
    await this.postImagesToS3().then((res) => {
      let data = this.buildData();
      data.ImgaeList = this.imageUriList;
      data.MainImageUri = this.imageUriList[0];

      data.UserId = "3";
      data.Place = Store.getLocation().Place;
      data.Latitude = Store.getLocation().Latitude;
      data.Longitude = Store.getLocation().Longitude;
      //  Store.setPostData(data);
      // this.setState({ DisplayAdID: this.generateRowId(4) });
      // this.postDataDynamo();
      if (data.AdId) {
        Store.setPostData(data);
        console.log("data After Post", data);
        this.updateAd();
      } else {
        data.AdId = "" + this.generateRowId(8);
        data.UserId = "3";
        Store.setPostData(data);
        // this.setState({ DisplayAdID: this.generateRowId(4) });
        this.postDataDynamo();
      }
    });
  };

  resetHandler = (category) => {
    Store.clearStore();
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: "My Ads" }],
    });
  };

  render() {
    return (
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <TouchableHighlight>
          <View>
            <Spinner
              visible={this.state.spinner}
              textContent={"Processing..."}
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
                  this.setState({ UserName: text });
                }}
                style={styles.formTextInput}
              ></TextInput>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.inputlabel}>Location</Text>

              {this.state.hasShowLocation ? (
                <View style={{ marginBottom: 50 }}>
                  <GetLocation
                    currentLocation={this.state.Locality}
                    handler={(reg) =>
                      this.setState({ Locality: reg, hasShowLocation: false })
                    }
                  ></GetLocation>
                </View>
              ) : (
                <TouchableHighlight
                  onPress={() => {
                    this.setState({ hasShowLocation: true });
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomColor: "#e6e8e8",
                      borderBottomWidth: 1,
                      marginLeft: 5,
                      // backgroundColor: "#e6e8e8",
                      // marginBottom: 30,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "left",
                        // fontWeight: "bold",
                        margin: 5,
                        // color: "#038d91",
                      }}
                    >
                      {this.state.Locality}
                    </Text>
                    <MaterialCommunityIcons
                      name="chevron-down"
                      color={"black"}
                      style={{ marginTop: 5 }}
                      size={22}
                    />
                  </View>
                </TouchableHighlight>
              )}
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.inputlabel}>Mobile Number</Text>
              <TextInput
                value={this.state.MobileNum}
                placeholder="Mobile Number"
                style={styles.formTextInput}
                placeholderTextColor={this.inputValidation.price.color}
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
                  this.setState({ Email: text });
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
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "flex-start",
                height: 120,
                width: "100%",
                padding: 5,
                paddingTop: 5,
              }}
            >
              {/* {this.state.hasShowAlert ? ( */}
              <Dialog
                visible={this.state.hasShowAlert}
                opacity={1}
                style={{width:'99%'}}
                dialogAnimation={
                  new FadeAnimation({
                    initialValue: 0, // optional
                    animationDuration: 150, // optional
                    useNativeDriver: true, // optional
                  })
                }
                dialogTitle={
                  <DialogTitle
                    title="Status"
                    style={{
                      backgroundColor: "#007272",
                      color: "#007272",
                    }}
                  />
                }
                hasOverlay={true}
                onDismiss={() => {
                  let category = Store.getPostData().Category;
                  Store.setPostData({});
                  // this.resetHandler(category);
                  // this.props.navigation.navigate("My Ads", {
                  //   screen: "My Ads",
                  //   params: { tittle: category },
                  // });
                  this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: "My Ads" }],
                  });
                }}
                footer={
                  <DialogFooter>
                    <DialogButton
                      text="OK"
                      buttonStyle={{
                        flexDirection: "row",
                        backgroundColor: "#b7dedd",
                        borderWidth: 1,
                        borderColor: "#007272",
                        borderRadius: 5,
                        width: 100,
                        marginTop: 20,
                      }}
                      textStyle={{color:'#007272'}}
                      onPress={async () => {
                        console.log(this.state.hasShowAlert);
                        this.setState({ hasShowAlert: false });
                      }}
                      key="button-1"
                    />
                  </DialogFooter>
                }
              >
                <DialogContent style={{width:'90%'}}>
                  <View >
                    <Text
                      style={{
                        color: "#007272",
                        fontSize: 16, 
                      }}
                    >
                      {this.state.status}
                    </Text>
                  </View>
                </DialogContent>
              </Dialog>
              {/* ) : (
              <View></View>
              )} */}
            </View>
          </View>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

export default Review;
