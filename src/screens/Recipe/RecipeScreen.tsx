import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking, Platform,
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
import { RecipeCard } from '../../appstyles';

const { width: viewportWidth } = Dimensions.get('window');
interface props {
  navigation: any;
  route: any;
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
    else { phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
  };


  render() {
    const activeSlide = this.state['activeSlide'];
    const { navigation } = this.props;
    const { item } = this.props.route.params;
    const category = item.AdId //getCategoryById(item.categoryId);
    const title = getCategoryName(category.id);

    return (
      <ScrollView style={styles.container}>
        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <Carousel
              ref={c => {
                this.slider1Ref = c;
              }}
              data={[]}//item.photosArray
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
              dotsLength={0}//item.photosArray.length
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
            <Text style={RecipeCard.price}>{`$ ${item.Price}`}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={RecipeCard.title}>{item.Tittle}</Text>
          </View>
          <View style={styles.locationcontainer}>
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
          <View style={{ marginBottom: 5 }}>

          </View>

          <View style={RecipeCard.lineheader}>
            <Text style={RecipeCard.headerTextColor}>
              Details
            </Text>
          </View>
          <View style={styles.detailsRow}>
            <View >
              <Text style={{ textAlign: "left", fontWeight: 'bold' }}>
                Type :
            </Text>
            </View>
            <View>
              <Text style={styles.valueCol}>Goat</Text>
            </View>
          </View>
          <View style={styles.detailsRow}>
            <View >
              <Text style={{ textAlign: "left", fontWeight: 'bold' }}>
                Breed :
            </Text>
            </View>
            <View>
              <Text style={styles.valueCol}>JP</Text>
            </View>
          </View>
          <View style={styles.detailsRow}>
            <View >
              <Text style={{ textAlign: "left", fontWeight: 'bold' }}>
                Gender :
            </Text>
            </View>
            <View>
              <Text style={styles.valueCol}>Male</Text>
            </View>
          </View>
          <View style={styles.detailsRow}>
            <View >
              <Text style={{ textAlign: "left", fontWeight: 'bold' }}>
                Age :
            </Text>
            </View>
            <View>
              <Text style={styles.valueCol}>2</Text>
            </View>
          </View>
          <View style={styles.detailsRow}>
            <View >
              <Text style={{ textAlign: "left", fontWeight: 'bold' }}>
                Teeth :
            </Text>
            </View>
            <View>
              <Text style={styles.valueCol}>4</Text>
            </View>
          </View>
          <View style={styles.detailsRow}>
            <View >
              <Text style={{ textAlign: "left", fontWeight: 'bold' }}>
                Weight :
            </Text>
            </View>
            <View>
              <Text style={styles.valueCol}>60</Text>
            </View>
          </View>

          <View style={RecipeCard.lineheader}>
            <Text style={RecipeCard.headerTextColor}>
              Description
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={{
              borderBottomColor: '#e8e8e8',
              borderBottomWidth: 1
            }}>
              <Text style={styles.infoDescriptionRecipe}>{item.Description}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsRow}>
          <View>
            <Text style={{ textAlign: "left" }}>
              {`AD ID ${item.AdId}`}
            </Text>

          </View>
          <View style={{ flexDirection: 'row' }}>
            {/* <Image style={styles.infoPhoto} source={require('../../../assets/icons/calendar1.png')} /> */}

            {/* <Button title="See User Profile" textStyle={{ textAlign: "right", fontWeight: 'bold', color: '#446ffc' }}
            buttonStyle={{backgroundColor:'#fff'}} onPress={() => {
              this.props.navigation.navigate('Chat')}}/> */}
            <Text style={{ textAlign: "right", fontWeight: 'bold', color: '#446ffc' }}>See User Profile</Text>
          </View>
        </View>


        <View style={{ flexDirection: 'row', marginTop: 40, marginBottom: 20, width: "100%", justifyContent: 'space-between', flex: 1 }}>


          <View style={{ flex: 1, margin: 5, flexDirection: 'row', borderRadius: 30, borderWidth: 2, borderColor: '#038d91', alignItems: 'center', justifyContent: "center" }}>
            <Button title="Chat" style={{ borderRadius: 50 }} textStyle={{ color: '#038d91' }} buttonStyle={{ borderWidth: 0, width: '100%', backgroundColor: '#ffffff' }} onPress={() => {
              this.props.navigation.navigate('Chat')
            }} />

          </View>

          <View style={{ flex: 1, margin: 5, flexDirection: 'row', borderRadius: 30, borderWidth: 2, borderColor: '#038d91', alignItems: 'center', justifyContent: "center" }}>
            <Button title="Call" style={{ borderRadius: 50 }} textStyle={{ color: '#038d91' }} buttonStyle={{ borderWidth: 0, width: '100%', backgroundColor: '#ffffff' }} onPress={() => {
              this.dialCall(item.MobileNum)
            }} />

          </View>
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
