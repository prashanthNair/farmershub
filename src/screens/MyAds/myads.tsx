import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useState, useEffect } from "react";
import { Overlay } from "react-native-elements";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { RecipeCard } from "../../appstyles";
import { getCategoryName } from "../../data/MockDataAPI";
import { HomeService } from "../../services/homeservice";

interface Props {
  navigation;
  route: any;
  data: any;
}

interface State {
  dataSource;
  hasMenu: any;
  hasVisible: any;
}
class MyAds extends React.Component<Props, State> {
  state = {
    dataSource: [],
    hasMenu: false,
    hasVisible: false,
  };
  constructor(props) {
    super(props);
  }

  goToDetails = (item) => {
    this.props.navigation.navigate("Details", { item });
  };

  componentDidMount() {
    this.getAllAds();
  }

  getAllAds = () => {
    HomeService.getInstance()
      .getallAds()
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ dataSource: responseJson.body.data.Items });
        console.log(responseJson.data.Items);
      })
      .catch((error) => console.log(error));
  };

  deleteAd = (item) => {
    HomeService.getInstance()
      .deleteAd(item.AdId, item.UserId)
      .then((responseJson) => {
        this.setState({ hasVisible: true });
        this.getAllAds();
        console.log(responseJson);
      })
      .catch((error) => console.log(error));
  };

  renderMyAds = ({ item }) => (
    <TouchableHighlight underlayColor="#fff">
      <View>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: "#c4c4c4",
            height: 160,
            marginTop: 20,
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              borderColor: "#c4c4c4",
              height: 20,
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              flexDirection: "row",
              backgroundColor: "#fafafa",
            }}
          >
            <Text style={{ marginLeft: 10 }}>Jan 10 202</Text>
            <View>
              <TouchableHighlight
                onPress={() => {
                  this.setState({ hasMenu: true });
                }}
              >
                <Text style={{ marginRight: 10, fontWeight: "bold" }}>...</Text>
              </TouchableHighlight>
              {/* {this.state.hasMenu ? (
                <ModalDropdown
                  style={{ width: 100, zIndex: 100, backgroundColor: "grey" }}
                  dropdownStyle={{
                    marginBottom: 0,
                    height: 70,
                    marginRight: 10,
                  }}
                  defaultValue={"Select"}
                  options={["Edit", "Delete"]}
                  onSelect={(value) => {
                    if (value == 0) {
                      this.props.navigation.navigate("Sell", {
                        screen: "Ad Details",
                        params: { tittle: "FarmEquipments", data: item },
                      });
                    } else if (value == 1) {
                      this.deleteAd(item);
                    }
                  }}
                />
              ) : (
                <Text></Text>
              )} */}
            </View>
          </View>
          <View
            style={{
              borderColor: "#c4c4c4",
              height: 120,
              marginTop: 5,
              backgroundColor: "#ffffff",
              flex: 1,
              flexDirection: "row",
              width: "99%",
            }}
          >
            <View style={{ width: "35%" }}>
              <Image
                resizeMode={"contain"}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10,
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                }}
                source={{ uri: item.MainImageUri }}
              />
            </View>
            <View style={{ width: "65%", marginLeft: 15 }}>
              <View style={{ height: 90 }}>
                <Text style={styles.title} numberOfLines={2}>{item.Tittle}</Text>
                <Text style={styles.price}>{item.Price}</Text>
                {/* <Text style={styles.title}>{item.title}</Text> */}
              </View>
              <View
                style={{
                  marginTop: 15,
                  height: 30,
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text style={styles.title}>{"Views"}</Text>
                <Text style={styles.title}>{"Likes"}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );

  renderNearbytItems = ({ item }) => (
    <TouchableHighlight
      underlayColor="#fafafa"
      onPress={() => this.goToDetails(item)}
    >
      <View>
        <View style={styles.horizonatalContainer}>
          <View>
            <Image
              resizeMode={"contain"} style={styles.photo} source={{ uri: item.photo_url }} />
            resizeMode={"contain"}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10,
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                }}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Text style={styles.price}>{"$260000"}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Text style={styles.title}>{item.title}</Text>
          </View>

          <View style={styles.locationcontainer}>
            <Text style={styles.location}>
              {" "}
              <Image
                style={styles.locationimage}
                source={require("../../../assets/icons/location1.png")}
              />{" "}
              {getCategoryName(item.categoryId)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
  render() {
    return (
      <View style={styles.homeContainer}>
        <Overlay
          isVisible={this.state.hasVisible}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          overlayBackgroundColor="red"
          width="auto"
          height="auto"
          onBackdropPress={() => this.setState({ hasVisible: true })}
        >
          <Text>Your Ad has been deleted!</Text>
        </Overlay>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ backgroundColor: "#fafbff", margin: 5 }}>
            {/* <View>
            <Text style={RecipeCard.headerTextColor}>My Ads</Text>
          </View> */}

            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={1}
              data={this.state.dataSource}
              renderItem={this.renderMyAds}
              keyExtractor={(item) => `${item.AdId}`}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

// screen sizing
const { width, height } = Dimensions.get('window');
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
    marginVertical: 10,
  },
  favcontainer: {
    width: 40,
    position: "relative",
    marginRight: 30,
    top: 50,
    left: 35,
    marginVertical: 10,
    marginLeft: 10,
    zIndex: 100,
  },
  sliderContainer: {
    width: 500,
    height: 200,
    marginBottom: 10,
    marginTop: 10,
  },

  searchContainer: {
    marginTop: 15,
  },
  homeContainer: {
    backgroundColor: "#ffffff",
    margin: 5,
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
  highphoto: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    height: 100,
  },
  listcontainer: RecipeCard.container,
  locationcontainer: {
    marginTop: 50,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    paddingBottom: 0,
    marginBottom: 0,
  },
  horizonatalContainer: RecipeCard.horizonatalContainer,
  photo: {
    width: (SCREEN_WIDTH / 2),
    height: 80, 
    justifyContent: 'center',
    alignItems: 'center', 
    margin: 15, 
    resizeMode: "contain" 
  },
  title: RecipeCard.title,
  price: RecipeCard.price,
  location: RecipeCard.location,
  locationimage: RecipeCard.locationimage,
  category: RecipeCard.category,
});
export default MyAds;
