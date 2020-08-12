import { View, Text, ScrollView, TouchableHighlight } from "react-native";
import React, { useState } from "react";

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from "native-base";
import { StatesAndDistrict } from "../../data/allCities";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LocationSearch from "../../screens/Home/locationsearch";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GOOGLE_PLACES_API_KEY = "AIzaSyDw0xFpfaMBk03hFIrNKJ0sfyN8Zy8lKZM"; // never save your real api key in a snack!

export const GetLocation = (props) => {
  const [locObj, SetlocObj] = useState("");
  return (
    <View
      style={{
        marginTop: 3,
        backgroundColor: "#ffffff",
      }}
    >
       <TouchableHighlight
          onPress={() => {
            props.handler(props.currentLocation);
          }}
        >
          <View style={{display:'flex',marginRight:10, alignItems:'flex-end'}}>
            <Text
              style={{ marginLeft: 15, marginBottom: 10, color: "#0651bf" }}
            >
             Close X
            </Text>
          </View>
        </TouchableHighlight>
      <View style={{ flex: 1, marginBottom: 80 }}>
       
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2} // minimum length of text to search
          autoFocus={true}
          returnKeyType={"search"} // Can be left out for default return key
          listViewDisplayed={false} // true/false/undefined
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            SetlocObj(data.description);
            props.handler(data.description);
            // props.navigation.navigate("Home", {
            //   currentLocation: data.structured_formatting.main_text,
            // });

            console.log(data);
          }}
          onFail={(error) => console.error(error)}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: "en",
          }}
          styles={{
            description: {
              fontWeight: "bold",
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
            listView: {
              color: "black", //To see where exactly the list is
              zIndex: 1000, //To popover the component outwards
              position: "absolute",
              top: 45,
            },
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={300}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <TouchableHighlight
            onPress={() => {
              props.handler(props.currentLocation);
            }}
          >
            <View>
              <Text
                style={{ marginLeft: 15, marginBottom: 10, color: "#0651bf" }}
              >
                Use Current Location
              </Text>

              <Text
                style={{ marginLeft: 20, marginBottom: 10, color: "#03718c" }}
              >
                {props.currentLocation}
              </Text>
            </View>
          </TouchableHighlight>
          {StatesAndDistrict.states.map((item) => {
            return (
              <Collapse>
                <CollapseHeader>
                  <Separator
                    bordered
                    style={{
                      backgroundColor: "#f7f7f7",
                      borderBottomWidth: 0.1,
                    }}
                  >
                    <View style={{ display: "flex" }}>
                      <View style={{flexDirection: "row", justifyContent:'space-between'}} >
                      <View style={{alignItems:'flex-start' }}>
                        <Text
                          style={{
                            marginLeft: 5,
                            textAlign: "left",
                            fontSize: 16,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                      <View style={{ marginRight: 2,alignItems:'flex-end' }}>
                      <Text> <MaterialCommunityIcons
                          name={"chevron-down"}
                          size={26}
                          color={"#03718c"}
                        /></Text> 
                      </View>
                    </View>
                    </View>
                  </Separator>
                </CollapseHeader>
                <CollapseBody
                  style={{
                    backgroundColor: "#ffffff",
                  }}
                >
                  <TouchableHighlight
                    onPress={() => {
                      props.handler(item.name);
                    }}
                  >
                    <Text
                      style={{
                        marginLeft: 30,
                        textAlign: "left",
                        fontSize: 16,
                        color: "#03718c",
                      }}
                    >
                      All in {item.name}
                    </Text>
                  </TouchableHighlight>
                  {item.districts.map((dist) => {
                    return (
                      <ListItem key={dist.id}>
                        <TouchableHighlight
                          onPress={() => {
                            props.handler(dist.name);
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 15,
                              textAlign: "left",
                              fontSize: 16,
                              color: "#727373",
                            }}
                          >
                            {dist.name}
                          </Text>
                        </TouchableHighlight>
                      </ListItem>
                    );
                  })}
                </CollapseBody>
              </Collapse>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
