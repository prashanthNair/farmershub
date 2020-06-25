import React, { useState } from 'react';
import { Text, View, TextInput, Image, StyleSheet, RecyclerViewBackedScrollViewBase, ScrollView, TouchableHighlight, FlatList } from 'react-native'
import { Card, Button, SearchBar } from 'react-native-elements';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { RecipeCard } from '../../appstyles';
import { recipes, recipesTemp } from '../../data/dataArrays';
import { getCategoryName } from '../../data/MockDataAPI';
import Categoryslider from './categoryslider';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LocationSearch from './locationsearch';
interface Props {
    navigation: any
}

class SearchResult extends React.Component<Props>{

    static navigationOptions = {
        //To hide the NavigationBar from current Screen
        header: null
    };

    render() {

        return (

            <View style={styles.homeContainer}>

                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ backgroundColor: '#fafbff', margin: 5, marginBottom: 100 }}>
                        <View><Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold' }}>Ads</Text></View>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            numColumns={1}
                            data={recipes}
                            renderItem={this.renderRecommentedItems}
                            keyExtractor={item => `${item.recipeId}`}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }


    renderImage(item: any) {
        let data = item.photosArray.map((value, index) => {
            return <View>
                <Image style={styles.highphoto} source={{ uri: value }} />
            </View>
        })
        return data

    }
    renderRecommentedItems = ({ item }) => (
        <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.goToDetails(item)}>
            <View style={styles.listcontainer}>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.sliderContainer}>
                        {this.renderImage(item)}
                    </View>
                </ScrollView>
                <View style={{ flex: 1, marginBottom: 10, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.location}>{getCategoryName(item.categoryId)}</Text>
                </View>
                <View style={{ flex: 1, marginBottom: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <View><Text style={styles.price}>{'$260000'}</Text></View>
                    <View style={{ width: 60, height: 50, borderRadius:15, borderWidth: 0.5 , alignContent:'flex-end', justifyContent: 'flex-start'}}>
                        <Image style={{ marginLeft: 19 }} source={{ uri: '../../assets/icons/calendar1.png' }}></Image>
                    </View>

                </View>
            </View>
        </TouchableHighlight>
    );

    goToDetails = (item) => {
        this.props.navigation.navigate('Details', { item });
    }
}


const Search = () => {
    const [searchState, setsearchState] = useState('');
    let updateSearch = search => {
        // setsearchState({ '' });
    };


    const { search } = searchState;
    return (
        <SearchBar
            placeholder="Type Here..."
            onChangeText={updateSearch}
        //   value={search}
        />
    );


}
import { Dimensions } from 'react-native';

// screen sizing
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const styles = StyleSheet.create({


    sliderContainer: {
        width: 500,
        height: 120,
        marginBottom: 10,
        marginTop: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    homeContainer: {
        backgroundColor: '#ffffff',
        margin: 5
    },

    listcontainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 20,
        marginTop:10,
        backgroundColor: '#ffffff',
        width: 400,
        borderBottomWidth: 0.5
    },
    horizonatalContainer: RecipeCard.horizonatalContainer,
    photo: RecipeCard.photo,
    highphoto: {
        width: (SCREEN_WIDTH / 2),
        height: 120,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        margin: 5,
        paddingBottom: 0
        // borderRadius: 10, 
    },
    title: RecipeCard.title,
    price: RecipeCard.price,
    location: RecipeCard.location,
    category: RecipeCard.category


})


export default withNavigation(SearchResult);
