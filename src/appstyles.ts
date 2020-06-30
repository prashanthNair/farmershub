import { StyleSheet, Dimensions } from 'react-native';

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const NEAR_ITEM_HEIGHT = 100;
const ITEM_MARGIN = 0;
const RECOMMENTED_ITEM_HEIGHT = 160;
// 2 photos per width
export const RecipeCard = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
     marginLeft: ITEM_MARGIN,
    marginBottom: 0,
    margin: 10,
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * (ITEM_MARGIN + 10)) / recipeNumColums,
    height: NEAR_ITEM_HEIGHT + 190,
    
    borderColor: 'black',
    borderWidth: 0.5,
  },

  horizonatalContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    // paddingTop: 5,
    margin: 10,
    marginLeft: ITEM_MARGIN,
    width: (SCREEN_WIDTH / recipeNumColums - 0.2),
    borderColor: 'black',
    borderWidth: 0.5,
  },

  photo: {
    // width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    width: (SCREEN_WIDTH / 2.2),
    height: NEAR_ITEM_HEIGHT,
    marginBottom:10,
    marginTop:40,
    // borderRadius: 10,
    // borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 0
  },
  highphoto: {
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * (ITEM_MARGIN + 15)) / 2.1,
    // width:(SCREEN_WIDTH/2.2),
    height: RECOMMENTED_ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    margin: 10,
    marginTop:30,
    marginBottom:30
    // borderRadius: 10, 
  },
  title: {
    flex: 1,
    textAlign: 'left',
    color: '#091c42',
    // fontWeight: 'bold',
    // fontFamily: 'Helvetica Neue',
    marginRight: 1,
    marginLeft: 2,
    flexWrap: 'nowrap'
  },
  price: {
    flex: 1,
    fontWeight: 'bold',
    // fontFamily: 'Helvetica Neue',
    textAlign: 'left',
    color: '#091c42',
    marginRight: 5,
    marginLeft: 2,
    flexWrap: 'nowrap',


  },
  location: {
    flex: 1,
    fontSize: 11,
    // textAlign: 'left',fontFamily: 'Helvetica Neue',
    color: 'grey',
    marginRight: 1,
    marginLeft: 0,
    flexWrap: 'nowrap',
    marginBottom: 5
  },
  locationimage: {
    height: 10,
    width: 10,
    marginRight: 10, borderWidth: 1
  },
  category: {
    marginTop: 5,
    marginBottom: 5
  },
    locationcontainer: {
      marginTop: 10,
      backgroundColor: '#f0f0f0',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      paddingBottom:0,
      marginBottom:0
    }
});
