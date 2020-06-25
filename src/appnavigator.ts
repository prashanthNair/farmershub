import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, withNavigation } from 'react-navigation';
// import {createDrawerNavigator} from 'react-navigation-drawer'
// import Login from './components/login/login' 
import Home from './screens/Home/home' 
// import DrawerContainer from './components/DrawerContainer/DrawerContainer';
import BottomNavigation from './components/BottomTabNavigator/bottomTabNavigator';
import Recipe from './screens/Recipe/RecipeScreen'
// import createAd from './components/PostAd/CreateAd';
import App from '../App';
import ChannelScreen from './screens/Chat/Chat';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const MainNavigator = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: { title: 'SSS' }
        }, 
        Details:{
            screen:Recipe,
            navigationOptions: { title: '' }
        },
        Chat:{
            screen:ChannelScreen,
            navigationOptions: { title: '' }
        }
        
    },
    {
        initialRouteName: "Home"
    }
);
 
function appNavigator(){
let appCotainer =createAppContainer(MainNavigator)
    return (
        MainNavigator
    )
}
// const MainNavigator = createStackNavigator(
//     {
//       Home: Home,
//       Login:Login 
//     //   Search: SearchScreen, 
//     },
//     {
//       initialRouteName: 'Login', 
//       defaultNavigationOptions:(navigation)=>({
//         headerTitleStyle:{
//             fontWeight: 'bold',
//             textAlign: 'center',
//             alignSelf: 'center',
//             flex: 1,
//         }
//       })
//     }
//   ); 

//   const DrawerStack = createDrawerNavigator(
//     {
//       Main: MainNavigator
//     },
//     {
//       drawerPosition: 'left',
//       initialRouteName: 'Main',
//       drawerWidth: 250,
//       contentComponent:DrawerContainer
//     }
//   );

  
//  const AppNavigator = createAppContainer(DrawerStack);
//  const AppNavigator =  createAppContainer(DrawerStack);
 export default appNavigator;

 console.disableYellowBox = true;