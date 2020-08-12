import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Store } from "../../store/store";

const GOOGLE_PLACES_API_KEY = "AIzaSyDw0xFpfaMBk03hFIrNKJ0sfyN8Zy8lKZM"; // never save your real api key in a snack!

interface Props {
  handler;
}
class LocationSearch extends React.Component<Props> {
  state = {
    location: "Location",
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1, zIndex: 1000, marginBottom: 280 }}>
        <Text>{this.state.location}</Text>
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2} // minimum length of text to search
          autoFocus={true}
          returnKeyType={"search"} // Can be left out for default return key
          // listViewDisplayed={false}// true/false/undefined
          fetchDetails={true}
          listViewDisplayed={false}
          // textInputProps={{
          //   onChangeText: (text) =>  {
          //     console.log(text)
          //     if (text.length >= 1) {
          //       SetshowCity(false);
          //     } else {
          //       SetshowCity(true);
          //     }
          //   }
          // }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data)
             this.setState({location:data.description})
              this.props.handler(data.description);
            }}
          keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
          renderDescription={(row) => row.description} // custom description render
         
          onFail={(error) => console.error(error)}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: "en",
          }}
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});

export default LocationSearch;
