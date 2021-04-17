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

    <View style={{ marginTop: 10, height: 120 }}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        {allCategories.liveStocks.map((item, index) => {
          return <View style={{ height: 100, width: 100, borderRadius: 50, backgroundColor: "#f7faf7" }}>
            <Image
              style={{ width: 100, height: 100, borderRadius: 50 }}
              source={item.imageUrl}
            ></Image>
          </View>
        })}
      </View>
    </View>
  );
};

export default Categoryslider;

// export default BrowseCategory;

export const FarmPropertiesCategoryslider = (props) => {
  const goToResult = (item) => {
    props.props.navigation.navigate("SearchResult", { tittle: item.title });
  };
  return (

    <View style={{ marginTop: 10, height: 120 }}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        {allCategories.farmItems.map((item, index) => {
          return <View style={{ height: 100, width: 100, borderRadius: 50, backgroundColor: "#f7faf7" }}>
            <Image
              style={{ width: 100, height: 100, borderRadius: 50 }}
              source={item.imageUrl}
            ></Image>
          </View>
        })}
      </View>
    </View>


    // <View>
    //   <View
    //     style={{
    //       marginBottom: 10,
    //       marginTop: 10,
    //       justifyContent: "space-between",
    //       alignContent: "center",
    //     }}
    //   >
    //     <View style={styles.menuContainer}>
    //       {allCategories.farmItems.map((item, index) => {
    //         return (
    //           <TouchableHighlight
    //             key={item.id}
    //             onPress={() => goToResult(item)}
    //           >
    //             <View>
    //               <View
    //                 style={{
    //                   justifyContent: "center",
    //                   alignContent: "center",
    //                 }}
    //               >
    //                 <View
    //                   style={{
    //                     borderRadius: 100,
    //                     borderColor: "#f0f0f0",
    //                     borderWidth: 1,
    //                     backgroundColor: "#f0f0f0", //'#f7f7f7',//"#f0f0f0", // item.color,
    //                     width: 80,
    //                     height: 80,
    //                     justifyContent: "space-between",
    //                     alignContent: "center",
    //                     alignItems: "center",
    //                   }}
    //                 >
    //                   <View>
    //                     {/* <MaterialCommunityIcons
    //                       name={item.icon}
    //                       color={item.color}
    //                       size={46}
    //                     /> */}
    //                     <Image
    //                       style={{ width: 80, height: 80, borderRadius: 100 }}
    //                       source={item.imageUrl}
    //                     ></Image>
    //                   </View>
    //                 </View>
    //               </View>
    //               <Text
    //                 style={{
    //                   textAlign: "center",
    //                   justifyContent: "center",
    //                   marginTop: 10,
    //                   fontWeight: "bold",
    //                 }}
    //               >
    //                 {item.title}
    //               </Text>
    //             </View>
    //           </TouchableHighlight>
    //         );
    //       })}
    //     </View>
    //   </View>

    //   <View
    //     style={{
    //       marginBottom: 10,
    //       marginTop: 10,
    //       justifyContent: "space-between",
    //       alignContent: "center",
    //     }}
    //   >
    //     <View style={styles.menuContainer}>
    //       {allCategories.liveStocks.map((item, index) => {
    //         return (
    //           <TouchableHighlight
    //             key={item.id}
    //             onPress={() => goToResult(item)}
    //           >
    //             <View>
    //               <View
    //                 style={{
    //                   justifyContent: "center",
    //                   alignContent: "center",
    //                 }}
    //               >
    //                 <View
    //                   style={{
    //                     borderRadius: 100,
    //                     borderColor: "#f0f0f0",
    //                     borderWidth: 2,
    //                     backgroundColor: "#ffffff", //'#f7f7f7',//"#f0f0f0", // item.color,
    //                     width: 80,
    //                     height: 80,
    //                     justifyContent: "space-between",
    //                     alignContent: "center",
    //                     alignItems: "center",
    //                   }}
    //                 >
    //                   <View>
    //                     {/* 
    //                     <MaterialCommunityIcons
    //                       name={item.icon}
    //                       color={item.color}
    //                       size={46}
    //                     /> */}
    //                     <Image
    //                       style={{ width: 80, height: 80, borderRadius: 100 }}
    //                       source={item.imageUrl}
    //                     ></Image>
    //                   </View>
    //                 </View>
    //               </View>
    //               <Text
    //                 style={{
    //                   textAlign: "center",
    //                   justifyContent: "center",
    //                   marginTop: 10,
    //                   fontWeight: "bold",
    //                 }}
    //               >
    //                 {item.title}
    //               </Text>
    //             </View>
    //           </TouchableHighlight>
    //         );
    //       })}
    //     </View>
    //   </View>
    // </View>
  );
};

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
