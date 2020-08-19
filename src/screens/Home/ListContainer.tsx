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
  Platform,
  ActivityIndicator,
} from "react-native";
import { HomeService } from "../../services/homeservice";
import { RecipeCard } from "../../appstyles";
import { withNavigation } from "react-navigation";
interface Props {
  navigation: any;
  route: any;
}
interface State {
  dataSource: any;
}
class ListContainer extends React.Component<Props, State> {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentWillUnmount() {
    // this.setState({dataSource:this.props.dataSource})
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._getAllAds();
    if (this._isMounted) {
    }
  }

  _getAllAds = () => {
    // this.setState({
    //   spinner: true,
    // });
    HomeService.getInstance()
      .getallAds()
      .then((response) => response.json())
      .then((responseJson) => {
        if (this._isMounted) {
          this.setState({
            dataSource: responseJson.body.data.Items,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderRecommendedItems = ({ item }) => (
    <TouchableHighlight
      key={item.AdId}
      underlayColor="#fafafa"
      //   onPress={() => this.goToDetails(item)}
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

  render() {
    return (
      <View
        style={{
          backgroundColor: "#ffffff",
          borderColor: "#fcfcfc",
          // borderTopWidth: 10,
          marginBottom: 350,
          margin: 5,
          width: "100%",
        }}
      >
        <FlatList
          //   ListFooterComponent={this._renderFooter}
          //   onRefresh={this._handleRefresh}
          //   refreshing={this.state.refreshing}
          // onEndReached={this._handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={2}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.state.dataSource}
          // initialNumToRender={1}
          legacyImplementation={true}
          disableVirtualization={true}
          renderItem={this.renderRecommendedItems}
          key={Math.random()}
          keyExtractor={(item) => `${item.AdId}`}
        />
      </View>
    );
  }
}

export default withNavigation(ListContainer);

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
    //  width: 600,
    // height: 40,
    //  margin: 10,
    // paddingTop: 10,
    // paddingBottom: 10,
    // backgroundColor: "#ffffff",
    borderColor: "#f7f5f5",
    // borderBottomWidth: 30,
    // borderTopWidth: 30,
  },

  searchContainer: {
    backgroundColor: "#ffffff",
  },
  homeContainer: {
    // backgroundColor: "#d1fbeb",
    // backgroundColor: "#ffffff",
    // marginLeft: 5,
    borderColor: "#fcfcfc",
    // borderWidth: 5,
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
