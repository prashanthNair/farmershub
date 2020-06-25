import { StyleSheet, Dimensions } from 'react-native';

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const NEAR_ITEM_HEIGHT = 100;
const ITEM_MARGIN = 0;
const RECOMMENTED_ITEM_HEIGHT = 150;
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
    height: NEAR_ITEM_HEIGHT + 150,
    borderColor: 'black',
    borderWidth: 0.5,
  },

  horizonatalContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff', 
    paddingTop:5,
    margin: 5,
    width: (SCREEN_WIDTH / recipeNumColums-0.2)
},

  photo: {
    // width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    width: (SCREEN_WIDTH / 2.2),
    height: NEAR_ITEM_HEIGHT,
    // borderRadius: 10,
    // borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 0
  },
  highphoto: {
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * (ITEM_MARGIN + 15)) / 2.2,
    // width:(SCREEN_WIDTH/2.2),
    height: RECOMMENTED_ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    margin: 10,
    // borderRadius: 10, 
  },
  title: {
    flex: 1,
    fontSize: 16, 
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
    marginRight: 1,
    marginLeft: 5,
    flexWrap: 'nowrap'
  },
  price: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    marginRight: 5,
    marginLeft:10,
    flexWrap: 'nowrap', 
    
    
  },
  location: {
    flex: 1,
    fontSize: 11, 
    textAlign: 'left',
    color: 'grey',
    marginRight: 10,
    marginLeft: 5,
    flexWrap: 'nowrap'
  },
  category: {
    marginTop: 5,
    marginBottom: 5
  }
});
