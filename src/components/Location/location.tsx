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

export const GetLocation = () => {
  const [count, Setlocation] = useState("");
  return (
    <View
      style={{
        marginTop: 50,
        // backgroundColor: "#ffffff",
      }}
    >
      <View style={{ marginBottom: 50 }}>
        <LocationSearch
          handler={(reg) => {
            //    Setlocation(reg)
            console.log(reg);
          }}
        ></LocationSearch>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {StatesAndDistrict.states.map((item) => {
          return (
            <Collapse>
              <CollapseHeader>
                <Separator
                  bordered
                  style={{ backgroundColor: "#f7f7f7", borderBottomWidth: 0.1 }}
                >
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View
                      style={{
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Text
                        style={{
                          marginLeft: 15,
                          textAlign: "left",
                          fontSize: 16,
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                    <View style={{ marginRight: 2, alignItems: "flex-end" }}>
                      <MaterialCommunityIcons
                        name={"chevron-down"}
                        size={26}
                        color={"#03718c"}
                      />
                    </View>
                  </View>
                </Separator>
              </CollapseHeader>
              <CollapseBody
                style={{
                  backgroundColor: "#ffffff",
                }}
              >
                <TouchableHighlight>
                 
                  <Text
                    style={{
                      marginLeft: 15,
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
                    </ListItem>
                  );
                })}
              </CollapseBody>
            </Collapse>
          );
        })}
      </ScrollView>
    </View>
  );
};
