import React, { useState } from 'react';
import { Text, View, TextInput, Image, StyleSheet, RecyclerViewBackedScrollViewBase, ScrollView, TouchableHighlight, FlatList } from 'react-native'
import { Card, Button, SearchBar } from 'react-native-elements'; 
import { RecipeCard } from '../../appstyles';
import { recipes, allCategories } from '../../data/dataArrays';

const data = [{
    id: 1,
    title: 'Cow',
    imageUrl: ''
}]
const Categoryslider = (props) => { 
    const goToResult = (item) => { 
        props.props.navigation.navigate('SearchResult', { item });
    }
    return (
        <View >
            <View style={{ justifyContent: 'space-around', alignContent: "center" }} >
                <View style={styles.menuContainer}>


                    {allCategories.liveStocks.map((value, index) => {
                        return <TouchableHighlight onPress={() => goToResult(value)} >
                            <View>
                                <View style={{
                                    justifyContent: 'center', alignContent: 'center',

                                }}>

                                    <View style={styles.circle} >

                                        <Image style={{ marginLeft: 19 }} source={value.imageUrl}></Image>

                                    </View>
                                </View>
                                <Text style={{ textAlign: 'center', justifyContent: 'center', marginTop: 10, fontWeight: 'bold' }}>{value.title}</Text>
                            </View>
                        </TouchableHighlight>
                    })}

                </View>

            </View>


            <View style={{ justifyContent: 'space-around', alignContent: "center" }} >
                <View style={styles.menuContainer}>


                    {allCategories.farmItems.map((item, index) => {
                        return <TouchableHighlight onPress={() => goToResult(item)}  >
                            <View>
                                <View style={{
                                    justifyContent: 'center', alignContent: 'center',

                                }}>

                                    <View style={styles.circle} >

                                        <Image style={{ marginLeft: 19 }} source={item.imageUrl}></Image>

                                    </View>
                                </View>
                                <Text style={{ textAlign: 'center', justifyContent: 'center', marginTop: 10, fontWeight: 'bold' }}>{item.title}</Text>
                            </View>
                        </TouchableHighlight>
                    })}

                </View>

            </View>




        </View >
    )
}


export default Categoryslider

const styles = StyleSheet.create({
    circle: {
        borderRadius: 10,
        borderColor: 'green',
        borderWidth: 1,
        width: 70,
        height: 60,
        justifyContent: "center",
        alignContent: 'center',

        // padding:50


    },
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        flex: 0
    },

    menuContainerText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 5,
        marginLeft: 5,
        flex: 0
    },
    searchContainer: {
        flex: 1,
        width: '100%',
        paddingTop: 5
    },
    container: {
        padding: 20,
        backgroundColor: '#ffffff'
    },
    searchInput: {
        borderColor: '#d7d9ce',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5
    },
    listcontainer: RecipeCard.container,
    photo: RecipeCard.photo,
    title: RecipeCard.title,
    category: RecipeCard.category

})