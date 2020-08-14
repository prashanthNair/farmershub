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
interface Props {
  navigation;
  route: any;
  data: any;
}
class Pets extends React.Component<Props> {
  state = Store.getPetData();

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
  }

  radio_props: any = [
    { label: "I want to sell", value: 0 },
    { label: "I want to buy", value: 1 },
  ];

  onPress = (value) => {
    this.setState({ value: value });
  };

  inputValidation = {
    tittle: {
      color: "#c7c7c7",
    },
    discription: {
      color: "#c7c7c7",
    },
  };

  goNext = () => {
    Store.setPetData(this.state);
    this.setState({ HasError: false });
    this.inputValidation = {
      tittle: {
        color: "#c7c7c7",
      },
      discription: {
        color: "#c7c7c7",
      },
    };

    if (
      this.state.Tittle &&
      this.state.Description &&
      this.state.Category &&
      this.state.Description.length >= 30 &&
      this.state.Tittle.length >= 10
    ) {
      this.props.navigation.navigate("Upload Images", {
        routes: this.props.route.params,
      });
    } else {
      if (!this.state.Description && !this.state.Tittle) {
        this.inputValidation.tittle = {
          color: "#fa1c0c",
        };
        this.inputValidation.discription = {
          color: "#fa1c0c",
        };
      }
      if (!this.state.Tittle || this.state.Tittle.length <= 10) {
        this.inputValidation.tittle = {
          color: "#fa1c0c",
        };
      }
      if (!this.state.Description || this.state.Description.length <= 30) {
        this.inputValidation.discription = {
          color: "#fa1c0c",
        };
      }
      this.setState({ HasError: true });
    }
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.route.params.title,
    };
  };

  componentDidMount() {
    this.setState({ Sell: 0 });
    if (this.props.data) {
      console.log("data props", this.props.data);
      this.setState({ Category: this.props.data.Category });
      this.setState(this.props.data);
    } else {
      this.setState({ Category: this.props.route.params.name });
    }
  }

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <TouchableHighlight>
          <View>
            <View style={styles.detailsRow}>
              <Text style={styles.inputlabel}>Category Type</Text>
              <TextInput
                placeholder="Category"
                value={this.state.Category}
                style={styles.formTextInput}
                editable={false}
                onChangeText={(text) => {
                  // this.setState({ Category: text });
                }}
              ></TextInput>
            </View>

            <View style={styles.detailsRow}>
              <Text style={styles.inputlabel}>Pet Type</Text>
              <TextInput
                placeholder="Example: Dog, Kitten etc"
                style={styles.formTextInput}
                value={this.state.PetTye}
                onChangeText={(text) => {
                  this.setState({
                    PetTye: text,
                    Category: this.props.route.params.name,
                  });
                }}
              ></TextInput>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.inputlabel}>Breed</Text>
              <TextInput
                placeholder="Breed"
                style={styles.formTextInput}
                value={this.state.Breed}
                onChangeText={(text) => {
                  this.setState({ Breed: text });
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
                    value={this.state.BuyOrSell}
                    onChangeText={(text) => {
                      // this.setState({ BuyOrSell: text });
                    }}
                  >
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={this.state.Sell == i}
                      onPress={(text) => {
                        this.setState({ Sell: text });
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
                      onPress={(text) => {
                        this.setState({ Buy: text });
                      }}
                      labelStyle={{ color: "black", fontWeight: "bold" }}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                ))}
              </RadioForm>
            </View>

            <View style={styles.detailsRow}>
              <Text style={styles.inputlabel}>Age</Text>
              <TextInput
                placeholder="Age"
                value={this.state.Age}
                style={styles.formTextInput}
                onChangeText={(text) => {
                  this.setState({ Age: text });
                }}
              ></TextInput>
            </View>

            <View style={styles.detailsRow}>
              <Text style={styles.inputlabel}>Gender</Text>
              <View
                style={{
                  width: "97%",
                  justifyContent: "space-between",
                  marginBottom: 1,
                  marginLeft: 10,
                  marginRight: 10,
                }}
              >
                <Dropdown
                  value={this.state.Gender}
                  containerStyle={{ marginTop: 0 }}
                  label="Male"
                  animationDuration={0}
                  data={this.data}
                  onChangeText={(text) => {
                    this.setState({ Gender: text });
                  }}
                />
              </View>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.inputlabel}>Color</Text>
              <TextInput
                value={this.state.Color}
                placeholder="Red, Yellow"
                style={styles.formTextInput}
                onChangeText={(text) => {
                  this.setState({ Color: text });
                }}
              ></TextInput>
            </View>

            <View style={styles.lineheader}>
              <Text style={RecipeCard.headerTextColor}>Ad Details</Text>
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
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

export default Pets;
