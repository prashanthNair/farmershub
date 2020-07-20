import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  RecyclerViewBackedScrollViewBase,
  ScrollView,
  TouchableHighlight,
  FlatList,
} from "react-native";
import { Card, Button, SearchBar } from "react-native-elements";
// import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { RecipeCard } from "../../appstyles";
import { recipes, recipesTemp } from "../../data/dataArrays";
import { getCategoryName } from "../../data/MockDataAPI";
import Categoryslider from "./categoryslider";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LocationSearch from "./locationsearch";
interface Props {
  navigation: any;
  route: any;
}

interface State {
  loading: false;
  dataSource: any;
}
class SearchResult extends React.Component<Props, State> {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      dataSource: [],
    };
  }
  componentDidMount() {
    this.getAllAds();
  }

  getAllAds = () => {
    HomeService.getInstance()
      .getAdByCategory(this.props.route.params.tittle)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson.data.Items,
        });
      });
  };

  render() {
    return (
      <View style={styles.homeContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: "#fafbff",
              margin: 5,
              marginTop: 10,
              marginBottom: 100,
            }}
          >
            <View style={{ marginTop: 10 }}>
              <Text style={RecipeCard.headerTextColor}>
                {this.state.dataSource.length} Ads Found
              </Text>
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={1}
              data={this.state.dataSource}
              renderItem={this.renderRecommendedItems}
              keyExtractor={(item) => `${item.recipeId}`}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  renderImage= ({ item }) => (
      <View>
        <Image style={styles.highphoto} source={{ uri: item }} />
      </View> 
  );

  renderHeader() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{ marginLeft: 0, position: "relative", top: 0, zIndex: 100 }}
        >
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
  renderRecommendedItems = ({ item }) => (
    // <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.goToDetails(item)}>
    <View>
      <View style={styles.listcontainer}>
        {this.renderHeader()}

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableHighlight
            underlayColor="#fafafa"
            onPress={() => this.goToDetails(item)}
          >
            {/* <View style={styles.sliderContainer}>{this.renderImage(item)}</View> */}
            <View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                // numColumns={1}
                horizontal={true}
                data={item.ImgaeList}
                renderItem={this.renderImage}
                keyExtractor={(item) => `${Math.random()}`}
              />
            </View>
          </TouchableHighlight>
        </ScrollView>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Text style={styles.price}>{item.Price}</Text>
          <View style={{ marginRight: 10 }}>
            <Button
              title={"Chat"}
              titleStyle={{ color: "#038d91" }}
              buttonStyle={{
                width: 50,
                backgroundColor: "#fff",
                padding: 2,
                borderColor: "green",
                height: 30,
                borderRadius: 15,
                borderWidth: 1,
              }}
              onPress={() => {
                this.props.navigation.navigate("Chat");
              }}
            />
          </View>
        </View>

        <TouchableHighlight
          underlayColor="#fafafa"
          onPress={() => this.goToDetails(item)}
        >
          <View
            style={{
              flex: 1,
              marginBottom: 10,
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Text numberOfLines={1} style={styles.title}>{item.Tittle}</Text>
            {/* <Text style={styles.location}>
              {item.Locality}
            </Text> */}
          </View>
        </TouchableHighlight>
        <View style={styles.locationcontainer}>
          <Text style={styles.location}>
            <Image
              style={styles.locationimage}
              source={require("../../../assets/icons/location1.png")}
            />{" "}
            {item.Locality}
          </Text>
          <Text style={styles.location}>{"04/05/2020"}</Text>
        </View>
      </View>
    </View>
    /* </TouchableHighlight> */
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
import { Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { HomeService } from "../../services/homeservice";

// screen sizing
const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

const NEAR_ITEM_HEIGHT = 100;
const styles = StyleSheet.create({
  sliderContainer: {
    width: 800,
    height: 270,
    marginBottom: 0,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  homeContainer: {
    backgroundColor: "#ffffff",
    margin: 5,
  },

  listcontainer: {
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
     marginBottom: 10,
    marginTop: 10,
    backgroundColor: "#ffffff",
    // width: 400,
    borderWidth: 0.5,
  },
  photo: {
    width: SCREEN_WIDTH / 2.2,
    height: NEAR_ITEM_HEIGHT,
    marginBottom: 10,
  },
  highphoto: {
    width: SCREEN_WIDTH -20,
    height: 250,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 5,
    paddingBottom: 0,
    // borderRadius: 10,
  },
  locationcontainer: {
    marginTop: 10,
    backgroundColor: "#fafafa",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  locationimage: {
    height: 10,
    width: 10,
    marginRight: 10,
    borderWidth: 1,
    marginLeft: 5,
  },
  premiumcontainer: {
    width: 120,
    maxHeight: 22,
    borderColor: "#ffffff",
    backgroundColor: "#fcf403",
    height: 30,
  },
  favcontainer: {
    width: 40,
    position: "relative",
    marginRight: 30,
    top: 0,
    zIndex: 100,
  },
  location: {
    fontSize: 11,
    // textAlign: 'left',fontFamily: 'Helvetica Neue',
    color: "grey",
    marginRight: 50,
    marginLeft: 5,
    flexWrap: "nowrap",
    marginBottom: 5,
  },
  title: RecipeCard.title,
  price: RecipeCard.price,
  category: RecipeCard.category,
});

export default withNavigation(SearchResult);
