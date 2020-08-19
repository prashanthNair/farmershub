import React from "react";
import {
  ScrollView,
  Text,
  View,
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

class Property extends React.Component<Props> {
  //  state =this.props.data;

  state = Store.GetPropertyData();
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
    console.log("route", this.props.route.name);
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
  };

  onPress = (value) => {
    //  this.setState({ value: value })
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

  goNext = () => {
    Store.SetPropertyData(this.state); 
    this.setState({HasError:false}) 
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
        this.inputValidation = {
          tittle: {
            color: "#fa1c0c",
          },
          discription: {
            color: "#fa1c0c",
          },
        };
      } if (!this.state.Tittle || this.state.Tittle.length <= 10) {
        this.inputValidation.tittle={
          color: "#fa1c0c",
        }
      }  if (
        !this.state.Description ||
        this.state.Description.length <= 30
      ) {
        this.inputValidation.discription= {
          color: "#fa1c0c",
        }
      }
      this.setState({ HasError: true });
    }
  };

  render() {
    return (
      <View style={styles.scrollContainer}>
        <View style={styles.detailsRow}>
          <Text style={styles.inputlabel}>Type</Text>
          <TextInput
            placeholder="Category"
            value={this.state.Category}
            style={styles.formTextInput}
            editable={false}
            onChangeText={(text) => {
              this.setState({ Category: text });
            }}
          ></TextInput>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.inputlabel}>Plot Area</Text>
          <TextInput
            placeholder="In Cents/Acers"
            style={styles.formTextInput}
            value={this.state.PlotArea}
            maxLength={25}
            onChangeText={(text) => {
              this.setState({
                PlotArea: text,
                Category: this.props.route.params.name,
              });
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
                  // this.state.BuyOrSell = text;
                }}
              >
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={this.state.Sell == i}
                  onPress={(text) => {
                    this.setState({ Sell: text}); 
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
                    this.state.BuyOrSell = text; 
                    this.setState({ Buy: text });
                  }}
                  labelStyle={{ color: "black" }}
                  labelWrapStyle={{}}
                  value={this.state.BuyOrSell}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.inputlabel}>Farm Length (Optional)</Text>
          <TextInput
            placeholder="Length"
            keyboardType={"number-pad"}
            style={styles.formTextInput}
            maxLength={25}
            onChangeText={(text) => {
              this.setState({ Length: text });
            }}
            value={this.state.Length}
          ></TextInput>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.inputlabel}>Farm Size (Optional)</Text>
          <TextInput
            placeholder="Size"
            keyboardType={"number-pad"}
            maxLength={25}
            style={styles.formTextInput}
            onChangeText={(text) => {
              this.setState({ Size: text });
            }}
            value={this.state.Size}
          ></TextInput>
        </View>
        <View style={styles.lineheader}>
          <Text style={RecipeCard.headerTextColor}>Ad Details</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.inputlabel}>Ad Tittle</Text>
          <TextInput
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
            value={this.state.Tittle}
          ></TextInput>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.inputlabel}>Additional Information</Text>
          <Textarea
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
            maxLength={120}
            placeholder={"Additional Information (Min 30 characters)"}
            placeholderTextColor={this.inputValidation.discription.color}
            underlineColorAndroid={"transparent"}
            ref={"Description"}
            value={this.state.Description}
            onChangeText={(text) => {
              this.setState({ Description: text });
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
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

export default Property;
