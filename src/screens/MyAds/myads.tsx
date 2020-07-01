import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import { recipes } from '../../data/dataArrays';
import { RecipeCard } from '../../appstyles';
import { getCategoryName } from '../../data/MockDataAPI';


function MyAds(props) {

    const goToDetails = (item) => {
        props.navigation.navigate('Details', { item });
    }


    const renderRecommentedItems = ({ item }) => (
        <TouchableHighlight underlayColor='#fff' onPress={() => goToDetails(item)}>
            <View>
                
           
            <View style={{
                borderWidth: 0.5,
                borderColor: '#c4c4c4',
                height: 160,
                marginTop: 20,
                backgroundColor: '#fff'
            }}>
                
                <View style={{
                    borderColor: '#c4c4c4',
                    height: 20,
                    alignItems: 'center',
                    justifyContent:'space-between',
                    width: '100%',
                    flexDirection:'row',
                    backgroundColor: '#fafafa'
                }}>
                    
                   <Text style={{marginLeft:10}}>Jan 10 202</Text><Text style={{marginRight:10,fontWeight:'bold'}}>...</Text>
                </View>
                <View style={{

                    borderColor: '#c4c4c4',
                    height: 120,
                    marginTop: 5,
                    backgroundColor: '#ffffff',
                    flex: 1,
                    flexDirection: 'row',
                    width: '99%',
                }}>
                    
                    <View style={{ width: '35%' }}><Image style={styles.highphoto} source={{ uri: item.photo_url }} /></View>
                    <View style={{ width: '65%',marginLeft: 15 }}>
                        <View style={{ height: 90, }}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.price}>{'$260000'}</Text>
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                        <View style={{ marginTop:15, height: 30,justifyContent:'space-between',flexDirection:'row' }}>
                            <Text style={styles.title}>{'Views'}</Text> 
                            <Text style={styles.title}>{'Likes'}</Text> 
                        </View>
                    </View>

                </View>




            </View>
            </View>
        </TouchableHighlight>)


    const renderNearbytItems = ({ item }) => (
        <TouchableHighlight underlayColor='#fafafa' onPress={() => goToDetails(item)}>
            <View>
                <View style={styles.horizonatalContainer}>

                    <View>
                        <Image style={styles.photo} source={{ uri: item.photo_url }} /></View>
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


    return (
        <View style={styles.homeContainer}>

            {/* <View><LocationSearch></LocationSearch></View> */}

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ backgroundColor: '#fafbff', margin: 5, marginBottom: 50 }}>
                <View><Text style={RecipeCard.headerTextColor}>My Ads</Text></View>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        numColumns={1}
                        data={recipes}
                        renderItem={renderRecommentedItems}
                        keyExtractor={item => `${item.recipeId}`}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    premiumcontainer: {
        width: 80,
        maxHeight: 18,
        borderColor: '#ffffff',
        backgroundColor: '#fcf403',
        height: 30,
        marginLeft: 1,
        marginVertical: 10
    },
    favcontainer: {
        width: 40,
        position: 'relative',
        marginRight: 30,
        top: 50,
        left: 35,
        marginVertical: 10,
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
    highphoto: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        height: 100,

    },
    listcontainer: RecipeCard.container,
    locationcontainer: {
        marginTop: 50,
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        paddingBottom: 0,
        marginBottom: 0
    },
    horizonatalContainer: RecipeCard.horizonatalContainer,
    photo: RecipeCard.photo,
    title: RecipeCard.title,
    price: RecipeCard.price,
    location: RecipeCard.location,
    locationimage: RecipeCard.locationimage,
    category: RecipeCard.category


})
export default MyAds

