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

interface Props {
  navigation: any;
}

interface State {
  loading: false;
  dataSource: any;
  spinner: any;
  search: "";
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

    this.getAllAds();
    this.setState({
      spinner: false,
    });
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
          dataSource: responseJson.data.Items,
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
        <Spinner
          visible={this.state.spinner}
          //   textContent={"Loading..."}
          textStyle={RecipeCard.spinnerTextStyle}
        />
        <TouchableHighlight>
          <View style={styles.homeContainer}>
            {/* <View>
              <LocationSearch></LocationSearch>
            </View> */}
            <View
              style={{ flexDirection: "row", marginTop: 35, marginBottom: 0 }}
            >
              <Text style={{ textAlign: "left", fontWeight: "bold" }}>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    marginRight: 4,
                    marginLeft: 5,
                  }}
                  source={require("../../../assets/icons/location1.png")}
                />
                Kakkanad, Kochi
              </Text>
              <MaterialCommunityIcons
                name="chevron-down"
                color={"black"}
                size={22}
              />
            </View>
            <View style={styles.searchContainer}>
              <SearchBar
                placeholder="Search Here..."
                // lightTheme={true}
                // cancelIcon={true}
                platform="ios"
                inputContainerStyle={{
                  backgroundColor: "#fcffff",
                  borderColor: "#dbdbdb",
                  borderWidth: 1,
                }}
                containerStyle={{ backgroundColor: "#f0fcfa" }}
                onChangeText={(text) => {
                  this.updateSearch(text);
                }}
                value={this.state.search}
              />
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              onScroll={() => {
                this.search();
              }}
              style={{ backgroundColor: "#fff" }}
            >
              <View
                style={{
                  marginTop: 0,
                  backgroundColor: "#f7fcfc",
                  padding: 5,
                  borderColor: "#f7fcfc",
                  borderTopWidth: 1,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    color: "#000930",
                    marginLeft: 10,
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

              <View
                style={{
                  backgroundColor: "#fafbff",
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
              </View>
              <View
                style={{
                  backgroundColor: "#f7fcfc",
                  marginTop: 10,
                  marginBottom: 150,
                  width: "100%",
                }}
              >
                <View style={{ margin: 10 }}>
                  <Text
                    style={{
                      marginRight: 10,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Recommended Ads
                  </Text>
                </View>

                <FlatList
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  data={this.state.dataSource}
                  renderItem={this.renderRecommendedItems}
                  keyExtractor={(item) => `${item.AdId}`}
                />
              </View>
            </ScrollView>
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
        {this.renderHeader()}
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
      <View style={{ marginLeft: 5, marginRight: 5 }}>
        {this.renderHeader()}
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
    height: 240,
    // marginBottom: 10,
    backgroundColor: "#fafcfb",
    borderBottomWidth: 1,
    borderColor: "#fafcfb",
  },

  searchContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: "#befaec",
    backgroundColor: "#cafaf0",
  },
  homeContainer: {
    backgroundColor: "#d1fbeb",
    // margin: 5,
    marginBottom: 350,
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
