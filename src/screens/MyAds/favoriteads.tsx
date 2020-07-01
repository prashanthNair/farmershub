import React, { useState } from 'react';
import { Text, View, TextInput, Image, StyleSheet, RecyclerViewBackedScrollViewBase, ScrollView, TouchableHighlight, FlatList } from 'react-native'
import { Card, Button, SearchBar } from 'react-native-elements';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { RecipeCard } from '../../appstyles';
import { recipes } from '../../data/dataArrays';
import { getCategoryName } from '../../data/MockDataAPI'; 
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
interface Props {
    navigation: any
}

class Home extends React.Component<Props>{

    static navigationOptions = {
        //To hide the NavigationBar from current Screen
        header: null
    };

    render() {

        return (
            <View style={styles.homeContainer}>

                {/* <View><LocationSearch></LocationSearch></View> */}
               
            
                <ScrollView showsVerticalScrollIndicator={false}>
            
                 
                    <View style={{ backgroundColor: '#fafbff', marginBottom: 20 }}>
                        <View><Text style={styles.headerTextColor}>Favorite Ads</Text></View>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            numColumns={1}
                            data={recipes}
                            renderItem={this.renderRecommentedItems}
                            keyExtractor={item => `${item.recipeId}`}
                        />
                    </View>
                    <View style={{ backgroundColor: '#fafbff',marginTop:0, marginLeft: 5, marginRight: 5 }}>
                        <View><Text style={{ fontSize: 20, fontWeight: 'bold',color:'#000930', marginBottom: 0 }}>Popular Ads</Text></View>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            // numColumns={2}
                            data={recipes}
                            renderItem={this.renderNearbytItems}
                            keyExtractor={item => `${item.recipeId}`}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }

    renderHeader() {
        return <View style={{ flex: 1,zIndex: 101, flexDirection: 'row', justifyContent: 'space-between' }}>

            <View style={{ marginLeft: 0}}>
                <View style={styles.premiumcontainer}>
                    <Text style={{ textAlign: 'center', color: 'black' }}>PREMIUM</Text>
                </View>
            </View>
            <View style={styles.favcontainer}>
                <MaterialCommunityIcons name="heart" color={'black'} size={22} />
                {/* < MaterialCommunityIcons name="heart-outline" color={'black'} size={22} /> */}
            </View>
        </View >
    }

    renderNearbytItems = ({ item }) => (
        <TouchableHighlight underlayColor='#fafafa'  onPress={() => this.goToDetails(item)}>
            <View >{this.renderHeader()}
                <View style={styles.horizonatalContainer}>

                    <View style={styles.photo}>
                        <Image  style={{width:'100%',height:'100%'}} source={{ uri: item.photo_url }} /></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Text style={styles.price}>{'$260000'}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>

                    <View style={styles.locationcontainer}>
                        <Text style={styles.location}>  <Image style={styles.locationimage} source={require('../../../assets/icons/location1.png')} /> {getCategoryName(item.categoryId)}</Text>
                    </View>
                </View></View>
        </TouchableHighlight>
    );

    renderRecommentedItems = ({ item }) => (
        <TouchableHighlight underlayColor='#fafafa' onPress={() => this.goToDetails(item)}>
            <View>{this.renderHeader()}
                <View style={styles.listcontainer}>
                    <View style={{width:'100%'}}><Image style={styles.highphoto} source={{ uri: item.photo_url }} /></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Text style={styles.price}>{'$260000'}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>

                    <View style={styles.locationcontainer}>
                        <Text style={styles.location}>  <Image style={styles.locationimage} source={require('../../../assets/icons/location1.png')} /> {getCategoryName(item.categoryId)}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );

    goToDetails = (item) => {
        this.props.navigation.navigate('Details', { item });
    } 

    

}


const styles = StyleSheet.create({

    premiumcontainer: {
        width: 80,
        maxHeight: 18,
        borderColor: '#ffffff',
        backgroundColor: '#fcf403',
        height: 30,
        marginLeft: 1,
        // marginVertical: 10
    },
    favcontainer: {
        width: 40,
        position: 'relative',
        marginRight: 40,
        top: 10,
        left: 35,
        // marginVertical: 10,
        marginLeft: 10,
        zIndex: 100
    },
   
    sliderContainer: {
        width: 500,
        height: 200,
        marginBottom: 10,
        marginTop: 10
    },

    searchContainer: {

        marginTop: 15
    },
    homeContainer: {
        backgroundColor: '#ffffff',
        margin: 5
    },

    container: {
        backgroundColor: '#ffffff',
        borderColor: 'black',
        borderWidth: 0.5,
        margin: 5
    },
    searchInput: {
        borderColor: '#d7d9ce',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5
    },
    listcontainer:  {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
         marginLeft: 0,
        marginBottom: 0,
        position: 'relative', bottom: 30,
        margin: 10, 
        height: 100 + 190,
        
        borderColor: 'black',
        borderWidth: 0.5,
      },
    horizonatalContainer: RecipeCard.horizonatalContainer,
    photo: RecipeCard.photo,
    highphoto: { 
        height: 155,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        margin: 10,
        marginTop:30,
        marginBottom:30
        // borderRadius: 10, 
      },
    title: RecipeCard.title,
    price: RecipeCard.price,
    location: RecipeCard.location,
    locationimage: RecipeCard.locationimage,
    locationcontainer: RecipeCard.locationcontainer,
    category: RecipeCard.category,
    headerTextColor:RecipeCard.headerTextColor


})


export default withNavigation(Home);
