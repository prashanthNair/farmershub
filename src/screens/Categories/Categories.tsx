import React, { useState } from 'react';
import { Text, View, TextInput, Image, StyleSheet, RecyclerViewBackedScrollViewBase, ScrollView, TouchableHighlight, FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import styles from '../Categories/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const categoryList = [
    {
        id: 1,
        name: "Cow",
        icon: 'cow',
        subCategory: [{
            categoryId: 1,
            subCategoryId: 1,
            name: "Jersy"
        },
        {
            categoryId: 1,
            subCategoryId: 1,
            name: "Vechoor"
        }]
    },
    {
        id: 2,
        icon: 'bullseye',
        name: "Bull",
        subCategory: []
    },
    {
        id: 3,
        icon: 'cow',
        name: "Buffalo",
        subCategory: [{
            categoryId: 1,
            subCategoryId: 1,
            name: "Murrah"
        },
        {
            categoryId: 1,
            subCategoryId: 1,
            name: "Jafarabadi"
        }]
    },
    {
        id: 4,
        icon: 'dog-side',
        name: "Goat",
        subCategory: [{
            categoryId: 1,
            subCategoryId: 1,
            name: "Malabari"
        },
        {
            categoryId: 1,
            subCategoryId: 1,
            name: "Jamnapari"
        },
        {
            categoryId: 1,
            subCategoryId: 1,
            name: "Beetal"
        },
        {
            categoryId: 1,
            subCategoryId: 1,
            name: "Hyderabadi Beetal"
        },
        {
            categoryId: 1,
            subCategoryId: 1,
            name: "Panjab Beetal"
        },
        {
            categoryId: 1,
            subCategoryId: 1,
            name: "Shirohi"
        }
        ]
    },
    {
        id: 5,

        icon: 'ladybug',
        name: "Birds",
        subCategory: [{
            categoryId: 1,
            subCategoryId: 1,
            name: "Karoli"
        },
        {
            categoryId: 1,
            subCategoryId: 1,
            name: "GiriRajan"
        }]
    }, {
        id: 6,
        name: "Pets",
        icon: 'dog-side',
        subCategory: []
    },
    {
        id: 7,
        name: "Job",
        icon: 'toolbox-outline',
        subCategory: []
    },
    {
        id: 8,
        icon: 'home-city-outline',
        name: "Property",
        subCategory: [{
            categoryId: 1,
            subCategoryId: 1,
            name: "Lab"
        },
        {
            categoryId: 1,
            subCategoryId: 1,
            name: "German"
        }]
    },
    {
        id: 9,
        icon:'hammer',
        name: "Farm Equipments", 
        subCategory: []
    },
    {
        id: 10,
        icon:'car',
        name: "Car & Bike", 
        subCategory: []
    },
    {
        id: 11,
        icon:'food-variant',
        name: "Feeds", 
        subCategory: []
    },
    {
        id: 12,
        icon:'toolbox-outline',
        name: "Training", 
        subCategory: []
    }
    
]
const category = (props) => {

    let renderCategories = ({ item }) => (
        <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => props.navigation.navigate('Ad Details')}>
            <View style={styles.detailsRow}>
                <View style={{marginRight:10}}>
                    <MaterialCommunityIcons name={item.icon} color={'#00ab83'} size={26} />
                </View>
                <View >
                    <Text style={{ textAlign: "left",fontSize:18, color:'#2e3030'}}>
                        {item.name}
                    </Text>
                </View>

            </View>
        </TouchableHighlight>
    );

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={1}
                data={categoryList}
                renderItem={renderCategories}
                keyExtractor={item => `${item.id}`}
            />
        </View>
       </ScrollView>

    )
}

export default withNavigation(category)