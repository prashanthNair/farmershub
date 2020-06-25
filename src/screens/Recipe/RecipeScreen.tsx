import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,Platform,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getIngredientName, getCategoryName, getCategoryById } from '../../data/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton'
// import ViewIngredientsButton from '../../usercomponents/ViewIngredientsButton/ViewIngredientsButton';
// import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { withNavigation } from 'react-navigation';
import { Button } from 'react-native-elements';

const { width: viewportWidth } = Dimensions.get('window');
interface props {
  navigation: any;
  route:any;
}
class Details extends React.Component<props> {

  slider1Ref = {}

  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: 'true',
      headerLeft: () => <BackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
  }

  renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  onPressIngredient = item => {
    var name = getIngredientName(item);
    let ingredient = item;
    this.props.navigation.navigate('Ingredient', { ingredient, name });
  };

  dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
 };


  render() {
    const activeSlide = this.state['activeSlide'];
    const { navigation } = this.props;
    const {item} = this.props.route.params;
    const category = getCategoryById(item.categoryId);
    const title = getCategoryName(category.id);

    return (
      <ScrollView style={styles.container}>
        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <Carousel
              ref={c => {
                this.slider1Ref = c;
              }}
              data={item.photosArray}
              renderItem={this.renderImage}
              sliderWidth={viewportWidth}
              itemWidth={viewportWidth}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              firstItem={0}
              loop={false}
              autoplay={false}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={index => this.setState({ activeSlide: index })}
            />
            <Pagination
              dotsLength={item.photosArray.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotColor="rgba(255, 255, 255, 0.92)"
              dotStyle={styles.paginationDot}
              inactiveDotColor="white"
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={this.slider1Ref}
              tappableDots={!!this.slider1Ref}
            />
          </View>
        </View>
        <View style={styles.infoRecipeContainer}>
          {/* <Text style={styles.infoRecipeName}>{item.title}</Text>
          <View style={styles.infoContainer}>
            <TouchableHighlight
              onPress={() => navigation.navigate('RecipesList', { category, title })}
            >
              <Text style={styles.category}>{getCategoryName(item.categoryId).toUpperCase()}</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.infoContainer}>
            <Image style={styles.infoPhoto} source={require('../../../assets/icons/time.png')} />
            <Text style={styles.infoRecipe}>{item.time} minutes </Text>
          </View> */}

          <View style={styles.infoContainer}>
            <Text style={styles.infoRecipeName}>$100000</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
          </View>
          <View style={styles.detailsRow}>
            <View>
              <Text style={{ textAlign: "left" }}>
                <Image style={styles.infoPhoto} source={require('../../../assets/icons/location1.png')} />
                Kakkanad, Kochi
            </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Image style={styles.infoPhoto} source={require('../../../assets/icons/calendar1.png')} />
              <Text style={{ textAlign: "right" }}>04/04/2020</Text>
            </View>
          </View>
          <View style={{ marginBottom: 10 }}>

          </View>
          <View>
            <Text style={styles.infoRecipeName}>Details</Text>
          </View>

          <View style={styles.detailsRow}>
            <View >
              <Text style={{ textAlign: "left", fontWeight: 'bold' }}>
                Type :
            </Text>
            </View>
            <View>
              <Text style={{ textAlign: "right" }}>Goat</Text>
            </View>
          </View>
          <View style={styles.detailsRow}>
            <View >
              <Text style={{ textAlign: "left", fontWeight: 'bold' }}>
                Breed :
            </Text>
            </View>
            <View>
              <Text style={{ textAlign: "right" }}>JP</Text>
            </View>
          </View>
          <View style={styles.detailsRow}>
            <View >
              <Text style={{ textAlign: "left", fontWeight: 'bold' }}>
                Gender :
            </Text>
            </View>
            <View>
              <Text style={{ textAlign: "right" }}>Male</Text>
            </View>
          </View>
          <View style={styles.detailsRow}>
            <View >
              <Text style={{ textAlign: "left", fontWeight: 'bold' }}>
                Age :
            </Text>
            </View>
            <View>
              <Text style={{ textAlign: "right" }}>2</Text>
            </View>
          </View>
          <View style={styles.detailsRow}>
            <View >
              <Text style={{ textAlign: "left", fontWeight: 'bold' }}>
                Teeth :
            </Text>
            </View>
            <View>
              <Text style={{ textAlign: "right" }}>4</Text>
            </View>
          </View>
          <View style={styles.detailsRow}>
            <View >
              <Text style={{ textAlign: "left", fontWeight: 'bold' }}>
                Weight :
            </Text>
            </View>
            <View>
              <Text style={{ textAlign: "right" }}>60</Text>
            </View>
          </View>
          <View>
            <Text style={styles.infoRecipeName}>Description</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={{
              borderBottomColor: '#e8e8e8',
              borderBottomWidth: 1
            }}>
              <Text style={styles.infoDescriptionRecipe}>Start with cleaned and peeled russet potatoes that you have cut into 3/8-inch match sticks</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsRow}>
          <View>
            <Text style={{ textAlign: "left" }}>
              Ad ID :
            </Text>
            <Text style={{ textAlign: "left" }}>
              13244
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            {/* <Image style={styles.infoPhoto} source={require('../../../assets/icons/calendar1.png')} /> */}
            <Text style={{ textAlign: "right", fontWeight: 'bold', color: '#446ffc' }}>See User Profile</Text>
          </View>
        </View>
        <View style={{flexDirection:'row',justifyContent: 'space-between', backgroundColor:'#446ffc'}}>
        <Button title="Chat" buttonStyle={{width:200}} onPress={() => {
                   this.props.navigation.navigate('Chat')
                }} />
                 <Button title="Phone" buttonStyle={{width:200, borderRadius:0}} onPress={() => {
                    this.dialCall(9497644904)
                }} />
        </View>

      </ScrollView>
    );
  }
}
export default withNavigation(Details)
/*cooking steps
<View style={styles.infoContainer}>
  <Image style={styles.infoPhoto} source={require('../../../assets/icons/info.png')} />
  <Text style={styles.infoRecipe}>Cooking Steps</Text>
</View>
<Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
*/
