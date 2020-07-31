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
import { RecipeCard } from "../../appstyles";
import { recipes, allCategories } from "../../data/dataArrays";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const data = [
  {
    id: 1,
    title: "Cow",
    imageUrl: "",
  },
];
const Categoryslider = (props) => {
  const goToResult = (item) => {
    props.props.navigation.navigate("SearchResult", { tittle: item.title });
  };
  return (
    <View>
      <View style={{ justifyContent: "space-around", alignContent: "center" }}>
        <View style={styles.menuContainer}>
          {allCategories.farmItems.map((item, index) => {
            return (
              <TouchableHighlight onPress={() => goToResult(item)}>
                <View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <View
                      style={{
                        borderRadius: 100,
                        // borderColor: "green",
                        backgroundColor: '#f7f7f7',//"#f0f0f0", // item.color,  
                        width: 70,
                        height: 70,
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View>
                        <MaterialCommunityIcons
                          name={item.icon}
                          color={item.color}
                          size={46}
                        />
                        {/* <Image style={{ marginLeft: 19 }} source={value.imageUrl}></Image> */}
                      </View>
                    </View>
                  </View>
                  <Text
                    style={{
                      textAlign: "center",
                      justifyContent: "center",
                      marginTop: 10,
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
      </View>

      <View style={{ justifyContent: "space-around", alignContent: "center" }}>
        <View style={styles.menuContainer}>
          {allCategories.liveStocks.map((item, index) => {
            return (
              <TouchableHighlight onPress={() => goToResult(item)}>
                <View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <View
                      style={{
                        borderRadius: 100,
                        borderColor: "#fff",
                        backgroundColor: '#f7f7f7',//"#f0f0f0", // item.color, 
                        width: 70,
                        height: 70,
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View>
                        <MaterialCommunityIcons
                          name={item.icon}
                          color={item.color}
                          size={46}
                        />
                        {/* <Image style={{ marginLeft: 19 }} source={item.imageUrl}></Image> */}
                      </View>
                    </View>
                  </View>
                  <Text
                    style={{
                      textAlign: "center",
                      justifyContent: "center",
                      marginTop: 10,
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Categoryslider;

const styles = StyleSheet.create({
  circle: {
    borderRadius: 100,
    borderColor: "green",
    borderWidth: 1,
    width: 90,
    height: 60,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    flex: 0,
  },

  menuContainerText: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    marginLeft: 5,
    flex: 0,
  },
  searchContainer: {
    flex: 1,
    width: "100%",
    paddingTop: 5,
  },
  container: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  searchInput: {
    borderColor: "#d7d9ce",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  listcontainer: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
});
