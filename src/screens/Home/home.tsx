import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
  RecyclerViewBackedScrollViewBase,
  ScrollView,
  TouchableHighlight,
  FlatList,
} from "react-native";
import { Card, Button, SearchBar } from "react-native-elements";
import { withNavigation, NavigationInjectedProps } from "react-navigation";
import { RecipeCard } from "../../appstyles";
import Categoryslider from "./categoryslider";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LocationSearch from "./locationsearch";
import { HomeService } from "../../services/homeservice";
import Spinner from "react-native-loading-spinner-overlay";
import {
  getLocation,
  geocodeLocationByCoords,
} from "../../services/locationService";
import { GetLocation } from "../../components/Location/location";

interface Props {
  navigation: any;
  route: any;
}

interface State {
  loading: false;
  dataSource: any;
  spinner: any;
  search: "";
  hasShowLocation: boolean;
  location: any;
}
class Home extends React.Component<Props, State> {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      dataSource: [],
      spinner: false,
      search: "",
      hasShowLocation: false,
      location: "Search Location",
    };
  }

  updateSearch = (search) => {
    this.setState({ search });
    this.search();
  };

  componentDidMount() {
    // setTimeout(() => {
    // this.setState({
    //   spinner: !this.state.spinner,
    // });
    //}, 1000); 

    // console.log(this.props.route.params.currentLocation)
    // if (this.props.route.params&&this.props.route.params.currentLocation) {
    //   this.setState({
    //     location:this.props.route.params.currentLocation ,
    //   });
    // }else{
    //   this.getLocation();
    // }
     this.getLocation();
    this.getAllAds();
    this.setState({
      spinner: false,
    });
  }

  async getLocation() {
    try {
      let locationCords: any = await getLocation();
      let locationObj: any = await geocodeLocationByCoords(
        locationCords.latitude,
        locationCords.longitude
      );
      this.setState({
        location: `${locationObj.address_components[1].long_name}, ${locationObj.address_components[2].long_name}`,
      });
    } catch (err) {
      console.log(err);
    }
  }
  getAllAds = () => {
    // this.setState({
    //   spinner: true,
    // });
    HomeService.getInstance()
      .getallAds()
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.body.data.Items,
          spinner: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          spinner: false,
        });
      });
  };

  search = () => {
    if (this.state.search == "") {
      this.getAllAds();
    } else if (this.state.search.length >= 2) {
      // this.setState({
      //   spinner: true,
      // });
      HomeService.getInstance()
        .search(this.state.search)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("Seraching Done", responseJson);
          this.setState({
            spinner: false,
            dataSource: responseJson.data.Items,
          });
        })
        .catch((error) => {
          this.setState({
            spinner: false,
          });
          console.log(error);
        });
    } else {
      this.getAllAds();
    }
  };

  render() {
    return (
      <View>
        <View style={{ marginTop: 50, backgroundColor: "#038d91" }}></View>
        <Spinner
          visible={this.state.spinner}
          //   textContent={"Loading..."}
          textStyle={RecipeCard.spinnerTextStyle}
        />

        <TouchableHighlight>
          <View style={styles.homeContainer}>
            {this.state.hasShowLocation ? (
              <View style={{ marginBottom: 50 }}>
                <GetLocation
                currentLocation={this.state.location}
                  handler={(reg) =>
                    this.setState({ location: reg, hasShowLocation: false })
                  }
                ></GetLocation>
              </View>
            ) : (
              <TouchableHighlight
                onPress={() => {
                  // this.props.navigation.navigate("Location", {
                  //   currentLocation: this.state.location,
                  // });
                  this.setState({ hasShowLocation: true }); 
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    // marginTop: 40,
                    // marginBottom: 30,
                  }}
                >
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 4,
                      marginLeft: 5,
                    }}
                    source={require("../../../assets/icons/location1.png")}
                  />
                  <Text style={{ textAlign: "left", color: "#8a8787" }}>
                    {this.state.location}
                  </Text>
                  <MaterialCommunityIcons
                    name="chevron-down"
                    color={"#8a8787"}
                    size={22}
                  />
                </View>
              </TouchableHighlight>
            )}

            <View style={styles.searchContainer}>
              <SearchBar
                placeholder="Search Here..."
                // lightTheme={true}
                // cancelIcon={true}
                platform="ios"
                inputContainerStyle={{
                  // backgroundColor: "#fcffff",
                  backgroundColor: "#ffffff",
                  borderColor: "#e8e8e8",
                  borderRightWidth: 0.5,
                  borderLeftWidth: 0.5,
                  borderBottomColor: "black",
                }}
                // containerStyle={{ backgroundColor: "#f0fcfa" }}
                containerStyle={{ backgroundColor: "#fcfcfc" }}
                onChangeText={(text) => {
                  this.updateSearch(text);
                }}
                value={this.state.search}
              />
            </View>
          { !this.state.hasShowLocation ?
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
              onScroll={() => {
                this.search();
              }}
              style={{ backgroundColor: "#fff" }}
            >
              <View
                style={{
                  // backgroundColor: "#f7fcfc",
                  backgroundColor: "#ffffff",
                  padding: 5,
                  borderColor: "#ffffff",
                  borderTopWidth: 1,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    marginLeft: 10,
                    margin: 10,
                    color: "#038d91",
                  }}
                >
                  Browse All Category
                </Text>
              </View>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.sliderContainer}>
                  <Categoryslider props={this.props}></Categoryslider>
                </View>
              </ScrollView>

              {/* <View
                style={{
                  backgroundColor: "#fffff",
                  marginTop: 10,
                  marginLeft: 5,
                  marginRight: 5,
                }}
              >
                <View>
                  <Text
                    style={{
                      marginLeft: 10,
                      marginRight: 10,
                      marginTop: 0,
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#000930",
                    }}
                  >
                    Popular Ads
                  </Text>
                </View>
                <FlatList
                  style={{ marginTop: 15 }}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  // numColumns={2}
                  data={this.state.dataSource}
                  renderItem={this.renderPopularItems}
                  keyExtractor={(item) => `${item.AdId}`}
                />
              </View> */}
              <View
                style={{
                  // marginBottom: 10,
                  marginTop: 10,
                  backgroundColor: "#ffffff",
                }}
              >
                <Text
                  style={{
                    margin: 10,
                    marginLeft: 15,
                    fontWeight: "bold",
                    fontSize: 18,
                    color: "#038d91",
                  }}
                >
                  Recommended Ads
                </Text>
                {/* <LocationSearch
                  handler={(reg) => this.setState({ location: reg })}
                ></LocationSearch> */}
              </View>
              <View
                style={{
                  backgroundColor: "#ffffff",
                  marginTop: 20,
                  borderColor: "#fcfcfc",
                  // borderTopWidth: 10,
                  marginBottom: 350,
                  width: "100%",
                }}
              >
                <FlatList
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  data={this.state.dataSource}
                  renderItem={this.renderRecommendedItems}
                  keyExtractor={(item) => `${item.AdId}`}
                />
              </View>
              <View></View>
            </ScrollView>
          :<View></View>}
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  renderHeader() {
    return (
      <View
        style={{
          flex: 1,
          zIndex: 101,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ marginLeft: 0 }}>
          <View style={styles.premiumcontainer}>
            <Text style={{ textAlign: "center", color: "black" }}>PREMIUM</Text>
          </View>
        </View>
        <View style={styles.favcontainer}>
          {/* <MaterialCommunityIcons name="heart" color={'black'} size={22} /> */}
          <MaterialCommunityIcons
            name="heart-outline"
            color={"black"}
            size={22}
          />
        </View>
      </View>
    );
  }

  renderPopularItems = ({ item }) => (
    <TouchableHighlight
      underlayColor="#fafafa"
      onPress={() => this.goToDetails(item)}
    >
      <View>
        {/* {this.renderHeader()} */}
        <View style={styles.horizonatalContainer}>
          <View style={styles.photo}>
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{ uri: item.MainImageUri }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.price}
            >{`$ ${item.Price}`}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
              {item.Tittle}
            </Text>
          </View>

          <View style={styles.locationcontainer}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.location}
            >
              <Image
                style={styles.locationimage}
                source={require("../../../assets/icons/location1.png")}
              />{" "}
              {item.Locality}
            </Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={RecipeCard.date}
            >
              {" "}
              {"Jun 20"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );

  renderRecommendedItems = ({ item }) => (
    <TouchableHighlight
      underlayColor="#fafafa"
      onPress={() => this.goToDetails(item)}
    >
      <View style={{ justifyContent: "flex-start" }}>
        {/* {this.renderHeader()} */}
        <View style={styles.listcontainer}>
          <View>
            <Image
              style={styles.highphoto}
              source={{ uri: item.MainImageUri }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.price}
            >{`$ ${item.Price}`}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.hightitle}
            >
              {item.Tittle}
            </Text>
          </View>

          <View style={styles.locationcontainer}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.location}
            >
              <Image
                style={styles.locationimage}
                source={require("../../../assets/icons/location1.png")}
              />{" "}
              {item.Locality}
            </Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={RecipeCard.date}
            >
              {" "}
              {"Jun 20"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );

  goToDetails = (item) => {
    this.props.navigation.navigate("Details", { item });
  };
}

const Search = () => {
  const [searchState, setsearchState] = useState("");
  let updateSearch = (search) => {
    // setsearchState({ '' });
  };

  const { search } = searchState;
  return (
    <SearchBar
      placeholder="Type Here..."
      onChangeText={updateSearch}
      //   value={search}
    />
  );
};

// screen sizing
const { width, height } = Dimensions.get("window");
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  premiumcontainer: {
    width: 80,
    maxHeight: 18,
    borderColor: "#ffffff",
    backgroundColor: "#fcf403",
    height: 30,
    marginLeft: 1,
  },
  favcontainer: {
    width: 40,
    position: "relative",
    top: 10,
    marginLeft: 10,
    zIndex: 100,
  },
  sliderContainer: {
    width: 500,
    // height: 40,
    //  margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#ffffff",
    borderColor: "#fcfcfc",
    // borderTopWidth: 10,
    borderBottomWidth: 10,
  },

  searchContainer: {
    marginTop: 10,
    // borderTopWidth: 1,
    // borderColor: "#befaec",
    // backgroundColor: "#cafaf0",
    backgroundColor: "#ffffff",
  },
  homeContainer: {
    // backgroundColor: "#d1fbeb",
    backgroundColor: "#ffffff",
    // margin: 5,
    borderColor: "#fcfcfc",
    borderWidth: 5,
    marginBottom: 0,
  },

  container: {
    backgroundColor: "#ffffff",
    borderColor: "black",
    borderWidth: 0.5,
    margin: 5,
  },
  searchInput: {
    borderColor: "#d7d9ce",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  listcontainer: RecipeCard.container,
  horizonatalContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ffffff",
    height: 190,
    position: "relative",
    bottom: 30,
    margin: 10,
    marginLeft: 0,
    width: SCREEN_WIDTH / 1.5,
    borderColor: "#038d91",
    borderWidth: 0.75,
  },
  photo: RecipeCard.photo,
  highphoto: RecipeCard.highphoto,
  title: RecipeCard.title,
  hightitle: RecipeCard.hightitle,
  price: RecipeCard.price,
  location: RecipeCard.location,
  locationimage: RecipeCard.locationimage,
  locationcontainer: RecipeCard.locationcontainer,
  category: RecipeCard.category,
});

export default withNavigation(Home);
