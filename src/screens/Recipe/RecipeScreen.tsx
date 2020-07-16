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
import { HomeService } from '../../services/homeservice';
import AdDetailsModel from '../../Model/AdDetails';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width: viewportWidth } = Dimensions.get('window');
interface props {
  navigation: any;
  route: any;
}
interface State {
  loading: false,
  dataSource: any,
  activeSlide:number
}
class Details extends React.Component<props> {

  slider1Ref = {}
  detailsObj = {};
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
      activeSlide: 0, loading: false,
      dataSource: []
    };
  }

  componentDidMount() {
    HomeService.getInstance().getAdById('1', this.props.route.params.id)
    this.getAllAds();
  }

  getAllAds = (() => {
    HomeService.getInstance().getallAds()
        .then(response => response.json())
        .then((responseJson) => {
            console.log(responseJson.data.Items)
            this.setState({
                loading: false,
                dataSource: responseJson.data.Items
            })
        })
        .catch(error => console.log(error))
})
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

  renderCategories = (item) => {
    let dataSource = item
    let keys = Object.keys(AdDetailsModel.ProductDetails);
    Object.keys(AdDetailsModel.ProductDetails).forEach((key) => {
      if (dataSource[key])
        this.detailsObj[key] = dataSource[key]
    })
    Object.keys(AdDetailsModel.BasicDetails).forEach((key) => {
      if (dataSource[key])
        AdDetailsModel.BasicDetails[key] = dataSource[key]
    })
    Object.keys(AdDetailsModel.ContactDetails).forEach((key) => {
      if (dataSource[key])
        AdDetailsModel.ContactDetails[key] = dataSource[key]
    })

  }

  renderHeader() {
    return <View style={{ flex: 1, zIndex: 101, flexDirection: 'row', justifyContent: 'space-between' }}>

      <View style={{ marginLeft: 0 }}>
        <View style={styles.premiumcontainer}>
          <Text style={{ textAlign: 'center', color: 'black' }}>PREMIUM</Text>
        </View>
      </View>
      <View style={styles.favcontainer}>
        {/* <MaterialCommunityIcons name="heart" color={'black'} size={22} /> */}
        < MaterialCommunityIcons name="heart-outline" color={'black'} size={22} />
      </View>
    </View >
  }

  goToDetails = (item) => {
    this.props.navigation.navigate('Details', { item });
  }

  renderPopularItems = ({ item }) => (

    <TouchableHighlight underlayColor='#fafafa' onPress={() => this.goToDetails(item)}>
      <View >{this.renderHeader()}
        <View style={styles.horizonatalContainer}>

          <View style={styles.photo}>
            <Image style={{ width: '100%', height: '100%' }} source={{ uri: item.MainImageUri }} /></View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.price}>{`$ ${item.Price}`}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.title}>{item.Tittle}</Text>
          </View>

          <View style={styles.listlocationcontainer}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.location}>
              <Image style={styles.locationimage} source={require('../../../assets/icons/location1.png')} /> {item.Locality}</Text>
            <Text ellipsizeMode='tail' numberOfLines={1} style={RecipeCard.date}> {"Jun 20"}</Text>
          </View>
        </View></View>
    </TouchableHighlight>
  );


  render() {
    const activeSlide = this.state['activeSlide'];
    const { navigation } = this.props;
    const { item } = this.props.route.params;
    this.renderCategories(item)
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.carouselContainer}>
            <View style={styles.carousel}>
              <Carousel
                ref={c => {
                  this.slider1Ref = c;
                }}
                data={item.ImgaeList}
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
                dotsLength={item.ImgaeList.length}
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
              <Text style={RecipeCard.price}>{`$ ${AdDetailsModel.BasicDetails.Price}`}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={RecipeCard.title}>{AdDetailsModel.BasicDetails.Tittle}</Text>
            </View>
            <View style={styles.locationcontainer}>
              <View>
                <Text style={{ textAlign: "left" }}>
                  <Image style={styles.infoPhoto} source={require('../../../assets/icons/location1.png')} />
                  {AdDetailsModel.ContactDetails.Locality}, {AdDetailsModel.ContactDetails.District}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image style={styles.infoPhoto} source={require('../../../assets/icons/calendar1.png')} />
                <Text style={{ textAlign: "right" }}>{AdDetailsModel.ContactDetails.Date}</Text>
              </View>
            </View>
            <View style={{ marginBottom: 5 }}>

            </View>

            <View style={RecipeCard.lineheader}>
              <Text style={RecipeCard.headerTextColor}>
                Details
            </Text>
            </View>
            {
              Object.keys(this.detailsObj).map((key) => {
                return <View style={styles.detailsRow}>
                  <View >
                    <Text style={{ textAlign: "left", fontWeight: 'bold' }}>
                      {key} :
            </Text>
                  </View>
                  <View>
                    <Text style={styles.valueCol}>{this.detailsObj[key]}</Text>
                  </View>
                </View>
              })
            }

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
                <Text style={styles.infoDescriptionRecipe}>{AdDetailsModel.BasicDetails.Description}</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View>
              <Text style={{ textAlign: "left" }}>
                {`AD ID ${AdDetailsModel.BasicDetails.AdId}`}
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

          <View style={{ backgroundColor: '#fafbff', marginTop: 20, marginLeft: 5, marginRight: 5 }}>
                            <View><Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold', color: '#000930' }}>Nearby Ads</Text></View>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                // numColumns={2}
                                data={this.state.dataSource}
                                renderItem={this.renderPopularItems}
                                keyExtractor={item => `${item.recipeId}`}
                            />
                        </View>
        </ScrollView>
        <View style={{ flexDirection: 'row', marginTop: 60, marginBottom: 50, width: "100%", justifyContent: 'space-between', flex: 2 }}>


          <View style={{ flex: 1, margin: 0, flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
            <Button title="Chat" textStyle={{ color: '#038d91' }} buttonStyle={{ borderWidth: 2, borderRadius: 50, height: 50, borderColor: '#038d91', width: '100%', backgroundColor: '#ffffff' }} onPress={() => {
              this.props.navigation.navigate('Chat')
            }} />

          </View>

          <View style={{ flex: 1, margin: 0, flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
            <Button title="Call" textStyle={{ color: '#038d91' }} buttonStyle={{ borderWidth: 2, borderRadius: 50, height: 50, borderColor: '#038d91', width: '100%', backgroundColor: '#ffffff' }} onPress={() => {
              this.dialCall(item.MobileNum)
            }} />

          </View>
        </View>
      </View>

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
