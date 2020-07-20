import React from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
  TextInput,
} from "react-native";

import { RecipeCard } from "../../appstyles";
import styles from "../PostAd/styles";
import Textarea from "react-native-textarea";
import { Button } from "react-native-elements";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

import { Dropdown } from "react-native-material-dropdown";
import { Store } from "../../store/store";
import PropertyAd from "../Property/property";

interface Props {
  navigation: any;
  route: any;
}
class FarmEquipments extends React.Component<Props> {
  state = Store.getEquipmentData();

  data = [
    {
      value: "MALE",
    },
    {
      value: "FEMALE",
    },
  ];
  constructor(props) {
    super(props);
    Store.setEquipmentData({}); 
    this.setState({ Sell: 1 });
  }

  radio_props: any = [
    { label: "I want to sell", value: 0 },
    { label: "I want to buy", value: 1 },
  ];
  inputValidation = {
    tittle: {
      color: "#c7c7c7",
    },
    discription: {
      color: "#c7c7c7",
    },
    productName: {
      color: "#c7c7c7",
    },
  };

  goNext = () => {
    Store.setEquipmentData(this.state);
    if (
      !this.state.HasError &&
      this.state.Tittle &&
      this.state.Description &&
      this.state.Category &&
      this.state.ProductName &&
      this.state.Description.length >= 30 &&
      this.state.Tittle.length >= 10
    ) {
      this.props.navigation.navigate("Upload Images", {
        routes: this.props.route.params,
      });
    } else {
      if (
        !this.state.Description &&
        !this.state.Tittle &&
        !this.state.ProductName
      ) {
        this.inputValidation = {
          tittle: {
            color: "#fa1c0c",
          },
          discription: {
            color: "#fa1c0c",
          },
          productName: {
            color: "#fa1c0c",
          },
        };
      } else if (!this.state.Tittle || this.state.Tittle.length <= 10) {
        this.inputValidation = {
          tittle: {
            color: "#fa1c0c",
          },
          discription: {
            color: "#c7c7c7",
          },
          productName: {
            color: "#c7c7c7",
          },
        };
      } else if (!this.state.ProductName) {
        this.inputValidation = {
          tittle: {
            color: "#c7c7c7",
          },
          discription: {
            color: "#c7c7c7",
          },
          productName: {
            color: "#fa1c0c",
          },
        };
      } else if (
        !this.state.Description ||
        this.state.Description.length <= 10
      ) {
        this.inputValidation = {
          tittle: {
            color: "#c7c7c7",
          },
          discription: {
            color: "#fa1c0c",
          },
          productName: {
            color: "#c7c7c7",
          },
        };
      }
      this.setState({ HasError: true });
    }
  };

  onPress = (value) => {
    this.setState({ value: value });
  };

  componentDidMount() {
    this.setState({ sell: 0 });
  }

  render() {
    return (
      <View>
        <View style={styles.detailsRow}>
          <Text style={styles.inputlabel}>Type</Text>
          <TextInput
            placeholder="Category"
            value={this.props.route.params.name}
            style={styles.formTextInput}
            editable={false}
            onChangeText={(text) => {
              // this.setState({ Category: text });
            }}
          ></TextInput>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.inputlabel}>Product Name</Text>
          <TextInput
            placeholder=" Example: Milking Machine, Chaff Cutter"
            placeholderTextColor={this.inputValidation.productName.color}
            style={{
              width: "100%",
              height: 30,
              fontSize: 14,
              borderRadius: 5,
              borderBottomWidth: 1,
              borderColor: this.inputValidation.productName.color,
              backgroundColor: "#fafafa",
              marginLeft: 10,
              marginRight: 50,
            }}
            value={this.state.ProductName}
            onChangeText={(text) => {
              this.setState({ Category: this.props.route.params.name });
              this.setState({ ProductName: text });
            }}
          ></TextInput>
        </View>
        <View style={styles.radioRow}>
          <RadioForm formHorizontal={true} animation={true}>
            {/* To create radio buttons, loop through your array of options */}
            {this.radio_props.map((obj, i) => (
              <RadioButton
                labelHorizontal={true}
                key={i}
                onChangeText={(text) => {
                  this.setState({ BuyOrSell: text });
                }}
              >
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={this.state.Sell == i}
                  onPress={(text) => {
                    this.setState({ Sell: 1 });
                    this.setState({ Buy: 0 });
                  }}
                  borderWidth={1}
                  buttonInnerColor={"#0a87f5"}
                  buttonOuterColor={"#c7c7c7"}
                  buttonSize={15}
                  buttonOuterSize={20}
                  buttonInnerSize={20}
                  buttonStyle={{}}
                  buttonWrapStyle={{ marginLeft: 10 }}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  isSelected={this.state.Buy == i}
                  labelHorizontal={true}
                  value={this.state.BuyOrSell}
                  onPress={(text) => {
                    this.state.BuyOrSell = text;
                    this.setState({ Sell: 0 });
                    this.setState({ Buy: 1 });
                  }}
                  labelStyle={{ color: "black", fontWeight: "bold" }}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.inputlabel}>Brand</Text>
          <TextInput
            value={this.state.Brand}
            placeholder="Brand"
            style={styles.formTextInput}
            onChangeText={(text) => {
              this.setState({ Brand: text });
            }}
          ></TextInput>
        </View>
        <View style={styles.lineheader}>
          <Text style={RecipeCard.headerTextColor}>Ad DETAIL</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.inputlabel}>Ad Tittle</Text>
          <TextInput
            value={this.state.Tittle}
            placeholder="Enter Ad tittle (Min 10 characters)"
            maxLength={90}
            placeholderTextColor={this.inputValidation.tittle.color}
            returnKeyType="next"
            blurOnSubmit={false}
            ref={"Tittle"}
            // onSubmitEditing={() => this.focusNextField("Description")}
            style={{
              width: "100%",
              height: 30,
              fontSize: 14,
              borderRadius: 5,
              borderBottomWidth: 1,
              borderColor: this.inputValidation.tittle.color,
              backgroundColor: "#fafafa",
              marginLeft: 10,
              marginRight: 50,
            }}
            onChangeText={(text) => {
              this.setState({ Tittle: text });
            }}
          ></TextInput>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.inputlabel}>Additional Information</Text>
          <Textarea
            value={this.state.Description}
            containerStyle={{
              height: 110,
              padding: 5,
              backgroundColor: "#ffffff",
              marginBottom: 30,
              borderWidth: 0.5,
              marginTop: 20,
              marginLeft: 10,
              width: "97%",
              borderColor: this.inputValidation.discription.color,
            }}
            style={{
              textAlignVertical: "top", // hack android
              height: 100,
              fontSize: 14,
              color: "#333",
            }}
            // defaultValue={' Additional Information'}

            maxLength={120}
            placeholder={"Additional Information (Min 30 characters)"}
            placeholderTextColor={this.inputValidation.discription.color}
            underlineColorAndroid={"transparent"}
            ref={"Description"}
            onChangeText={(text) => {
              this.setState({ Description: text });
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 0,
            marginBottom: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            title="Next"
            buttonStyle={{
              width: "100%",
              borderRadius: 30,
              backgroundColor: "#038d91",
            }}
            onPress={() => {
              this.goNext();
            }}
          />
        </View>
      </View>
    );
  }
}

export default FarmEquipments;
