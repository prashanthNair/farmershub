import React, { useState } from 'react';
import { Text, View, TextInput, Image, StyleSheet, RecyclerViewBackedScrollViewBase, ScrollView, TouchableHighlight, FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import styles from '../Categories/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const categoryList = [
    {
        id: 1,
        name: "Cow",
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
        name: "Bull",
        subCategory: []
    }, 
    {
        id: 3,
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
        name: "Chicken",
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
    },
    {
        id: 6,
        name: "Duck",
        subCategory: []
    },
    {
        id: 7,
        name: "Dogs",
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
    }
] 
const category = (props) => {

    let  renderCategories = ({ item }) => (
        <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => props.navigation.navigate('Ad Details')}>
              <View style={styles.detailsRow}>
                <View >
                  <Text style={{ textAlign: "left", fontWeight: 'bold' }}>
                  {item.name}
                </Text>
                </View>
                <View>
                <MaterialCommunityIcons name="chevron-right" color={'black'} size={22} />
                </View>
              </View>
        </TouchableHighlight>
    );
    
    return (
        <View>
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={1}
                data={categoryList}
                renderItem={renderCategories}
                keyExtractor={item => `${item.id}`}
            />
        </View>

    )
}

export default withNavigation(category)