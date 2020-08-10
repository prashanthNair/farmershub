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
      <View style={{ flex: 1, zIndex:1000,marginBottom:280}}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2} // minimum length of text to search
          autoFocus={true}
          returnKeyType={"search"} // Can be left out for default return key
          listViewDisplayed={false} // true/false/undefined
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            this.props.handler(data.description);
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
              color: 'black', //To see where exactly the list is
              zIndex: 1000, //To popover the component outwards
              position: 'absolute',
              top: 45
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
