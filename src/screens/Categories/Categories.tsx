import React, { useState } from 'react';
import { Text, View, TextInput, Image, StyleSheet, RecyclerViewBackedScrollViewBase, ScrollView, TouchableHighlight, FlatList } from 'react-native'
// import { withNavigation } from 'react-navigation'
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { Store } from '../../store/store';
import { RecipeCard } from '../../appstyles';

export const categoryList = [


    {
        id: 9,
        icon: 'hammer',
        routeName: "FarmEquipments",
        name: "Farm Machinery",
        subCategory: []
    }, {
        id: 8,
        icon: 'home-city-outline',
        routeName: "Property",
        name: "Farm Property",
    },

    {
        id: 11,
        icon: 'food-variant',
        routeName: "Feeds",
        name: "Feeds",
        subCategory: []
    }, {
        id: 1,
        name: "Cow",
        routeName: "LiveStock",
        icon: 'cow'
    },
    {
        id: 2,
        routeName: "LiveStock",
        icon: 'bullseye',
        name: "Bull",
        subCategory: []
    },
    {
        id: 3,
        icon: 'cow',
        routeName: "LiveStock",
        name: "Buffalo"
    },
    {
        id: 4,
        icon: 'dog-side',
        routeName: "LiveStock",
        name: "Goat"
    },
    {
        id: 5,

        icon: 'ladybug',
        name: "Polutry",
        routeName: "LiveStock",
    }, {
        id: 6,
        name: "Pets",
        routeName: "Pets",
        icon: 'dog-side',
        subCategory: []
    },
    {
        id: 7,
        name: "Job",
        routeName: "Job",
        icon: 'toolbox-outline',
        subCategory: []
    }
    // , {
    //     id: 10,
    //     icon: 'car',
    //     name: "Farm Vehicles",
    //     subCategory: []
    // },

]


interface Props {
    navigation: any;
    route: any;
}
class Category extends React.Component<Props>
{
    static navigationOptions = {
        title: 'Ad Details',
    };

    renderCategories = ({ item }) => (
        <TouchableHighlight underlayColor='grey' onPress={() => {

            this.props.navigation.navigate('Ad Details', { 'tittle': item.routeName, name: item.name,data:null })
        }
            // this.props.navigation.navigate('Ad Details', { params: { name: 'Cow' } })
        }>
            <View style={styles.detailsRow}>
            
                <View style={{alignItems:'flex-start', flexDirection:'row'}}>
                <MaterialCommunityIcons name={item.icon} color={'#00ab83'} size={26} />
                    <Text style={{marginLeft:15, textAlign: "left", fontSize: 18, color: '#2e3030' }}>
                        {item.name}
                    </Text>
                </View>
                <View style={{ marginRight: 10,alignItems:'flex-end',  }}>
                    <MaterialCommunityIcons name={'chevron-right'} size={26} />
                </View>
            </View>
        </TouchableHighlight>
    );
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.lineheader}>
                    <Text style={RecipeCard.headerTextColor}>
                        ALL  CATEGORIES
            </Text>
                </View>
                <View style={styles.container}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        numColumns={1}
                        data={categoryList}
                        renderItem={this.renderCategories}
                        keyExtractor={item => `${item.id}`}
                    />
                </View>
            </ScrollView>

        )
    }
}

export default withNavigation(Category)