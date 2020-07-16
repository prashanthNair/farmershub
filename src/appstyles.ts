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
    height: NEAR_ITEM_HEIGHT + 198,
    position: 'relative', bottom: 30,
    borderColor: '#038d91',
    borderWidth: 0.75,
  },
  lineheader: {
    backgroundColor: '#edf0ee',
    width: '100%',
    marginTop:15,
    marginBottom:5,
    borderWidth:0.5,
    paddingLeft:10,
    paddingRight:10,
    borderColor:'#ffffff'
},
  headerTextColor: {
    margin: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#038d91',
    textAlign: 'center'
  },
  horizonatalContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 188,
    position: 'relative', bottom: 30,
    margin: 10,
    marginLeft: ITEM_MARGIN,
    width: (SCREEN_WIDTH / 1.5),
    borderColor: '#038d91',
    borderWidth: 0.75,
  },

  photo: {
    // width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    width: (SCREEN_WIDTH / 2),
    height: 80,
    // width:'100%',
    // height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    // \\marginBottom: 10,
    margin: 15,
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
    marginTop: 30,
    marginBottom: 28
    // borderRadius: 10, 
  },
  title: {
    flex: 1,
    textAlign: 'left',
    color: '#091c42',
    marginRight: 1,
    marginLeft: 2,
    width: '100%',
    flexWrap: 'nowrap',
    fontWeight:'bold'
  },
  hightitle: {
    textAlign: 'left',
    color: '#091c42',
    marginRight: 1,
    marginLeft: 2,
    width: '100%',
    flexWrap: 'nowrap'
  },
  price: {
    flex: 1,
    fontWeight: 'bold',
    // fontFamily: 'Helvetica Neue',
    textAlign: 'left',
    // color: '#091c42',
    color: '#006db5',
    fontSize: 20,
    marginRight: 5,
    marginLeft: 2,
    flexWrap: 'nowrap',


  },
  location: {
    flex: 2,
    fontSize: 11,
    // textAlign: 'left',fontFamily: 'Helvetica Neue',
    color: 'grey',
    marginRight: 1,
    marginLeft: 0,
    flexWrap: 'nowrap',
    marginBottom: 5,
    alignItems: "center"
  },
  date: {
    fontSize: 11,
    // textAlign: 'left',fontFamily: 'Helvetica Neue',
    color: 'grey',
    marginRight: 5,
    marginLeft: 0,
    flexWrap: 'nowrap',
    marginBottom: 5,
    alignItems: "center"
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
    marginTop: 5,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-around',

    paddingBottom: 0,
    marginBottom: 0
  }
});
