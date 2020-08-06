import Geocoder from 'react-native-geocoding';
const GOOGLE_PLACES_API_KEY = 'AIzaSyDw0xFpfaMBk03hFIrNKJ0sfyN8Zy8lKZM'; // never save your real api key in a snack!

Geocoder.init(GOOGLE_PLACES_API_KEY);
export const getLocation = async () => {
    return new Promise(
        (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (data) => resolve(data.coords),
                (err) => reject(err)
            );
        }
    );
}

export const geocodeLocationByName = (locationName) => {
    return new Promise(
        (resolve, reject) => {
            Geocoder.from(locationName)
                .then(json => {
                    const addressComponent = json.results[0].address_components[0];
                    resolve(addressComponent);
                })
                .catch(error => reject(error));
        }
    );
}

export const geocodeLocationByCoords = (lat, long) => {
    return new Promise(
        (resolve, reject) => {
            Geocoder.from(lat, long)
                .then(json => {
                    const addressComponent = json.results[0]
                    resolve(addressComponent);
                })
                .catch(error => reject(error));
        }
    );
}
