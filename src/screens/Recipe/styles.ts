import { StyleSheet, Dimensions } from 'react-native';
import { RecipeCard } from '../../appstyles';

const { width: viewportWidth } = Dimensions.get('window');


const ITEM_MARGIN = 0;
// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1, 
  },
  carouselContainer: {
    minHeight: 500
  },
  carousel: {},

  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    marginTop:20,
    height: 500
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 200
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  },
  valueCol:{
    textAlign: "right",marginRight:10
  },
  infoRecipeContainer: {
    flex: 1,
    marginBottom: 25,
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  infoContainer: {
    marginLeft:5,
    marginBottom:15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 4
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
    color: '#2cd18a'
  },
  infoDescriptionRecipe: {
    textAlign: 'left',
    fontSize: 16,
    marginTop: 10,
    margin:2,
    fontWeight: 'bold'
  },
  infoRecipeName: {
    fontSize: 18,
    // margin: 10,  
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
    justifyContent: "flex-start"
  },

  detailsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    margin: 5,
    padding: 10,
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1
  },
  locationcontainer: {
    
    backgroundColor: '#fafcfc',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between', 
    marginTop:15,
    padding: 5,
    // borderBottomColor: '#e8e8e8',
    // borderBottomWidth: 1
  },
  premiumcontainer: {
    width: 80,
    maxHeight: 18,
    borderColor: '#ffffff',
    backgroundColor: '#fcf403',
    height: 30,
    marginLeft: 1,
},
favcontainer: {
    width: 40,
    position: 'relative',
    top: 10,
    marginLeft: 10,
    zIndex: 100
},
photo: {
  width: (SCREEN_WIDTH / 2),
  height: 100, 
  justifyContent: 'center',
  alignItems: 'center',  
  margin: 15,
},  
listlocationcontainer:  {
    
  backgroundColor: '#fafcfc',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between', 
  marginTop:0,
  padding: 5,
  // borderBottomColor: '#e8e8e8',
  // borderBottomWidth: 1
},
locationimage: RecipeCard.locationimage,
title: RecipeCard.title,
hightitle: RecipeCard.hightitle,
price: RecipeCard.price,
location: RecipeCard.location,
horizonatalContainer:  {
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  maxHeight: 230,
  position: 'relative', bottom: 30,
  margin: 10,
  marginLeft: ITEM_MARGIN,
  width: (SCREEN_WIDTH / 1.5),
  borderColor: '#038d91',
  borderWidth: 0.75,
},
});

export default styles;
