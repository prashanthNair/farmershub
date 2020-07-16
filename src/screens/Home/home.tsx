import React, { useState } from 'react';
import { Text, View, TextInput, Image, StyleSheet, RecyclerViewBackedScrollViewBase, ScrollView, TouchableHighlight, FlatList } from 'react-native'
import { Card, Button, SearchBar } from 'react-native-elements';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { RecipeCard } from '../../appstyles';
import { recipes } from '../../data/dataArrays';
import { getCategoryName } from '../../data/MockDataAPI';
import Categoryslider from './categoryslider';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LocationSearch from './locationsearch';
import { HomeService } from '../../services/homeservice';


interface Props {
    navigation: any
}

interface State {
    loading: false,
    dataSource: any
}
class Home extends React.Component<Props, State>{

    static navigationOptions = {
        //To hide the NavigationBar from current Screen
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            dataSource: []
        }
    }



    componentDidMount() {
        this.getAllAds();
    }

    getAllAds = (() => {
        HomeService.getInstance().getallAds()
            .then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson.data.Items)
                this.setState({
                    loading: false,
                    dataSource: responseJson.data.Items
                })
            })
            .catch(error => console.log(error))
    })
    render() {

        return (<ScrollView >
            <TouchableHighlight onPress={()=>{this.getAllAds();}}>
                <View style={styles.homeContainer}>

                    <View><LocationSearch></LocationSearch></View>
                    {/* <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text style={{ textAlign: "left" }}>
                        <Image style={{
                            height: 20,
                            width: 20,
                            marginRight: 4
                        }} source={require('../../../assets/icons/location1.png')} />
                Kakkanad, Kochi
            </Text>
                    <MaterialCommunityIcons name="chevron-down" color={'black'} size={22} />

                </View> */}
                    <View style={styles.searchContainer}>
                        <TextInput placeholder='Type Here' style={styles.searchInput}></TextInput>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} onScroll={() => {
                        this.getAllAds();
                    }}>
                        <View style={{ marginTop: 50 }}><Text style={{ margin: 10, fontWeight: 'bold', fontSize: 16, color: '#000930' }}>Browse All Category</Text></View>

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={styles.sliderContainer}>
                                <Categoryslider props={this.props}></Categoryslider>
                            </View>
                        </ScrollView>

                        <View style={{ backgroundColor: '#fafbff', marginTop: 20, marginLeft: 5, marginRight: 5 }}>
                            <View><Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold', color: '#000930' }}>Nearby Ads</Text></View>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                // numColumns={2}
                                data={this.state.dataSource}
                                renderItem={this.renderPopularItems}
                                keyExtractor={item => `${item.recipeId}`}
                            />
                        </View>
                        <View style={{ backgroundColor: '#fff', marginBottom: 150 }}>
                            <View><Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold' }}>Recommented Ads</Text></View>

                            <FlatList
                                showsVerticalScrollIndicator={false}
                                numColumns={2}
                                data={this.state.dataSource}
                                renderItem={this.renderRecommentedItems}
                                keyExtractor={item => `${item.id}`}
                            />
                        </View>
                    </ScrollView>
                </View>
            </TouchableHighlight>
        </ScrollView>
        )}

    renderHeader() {
        return <View style={{ flex: 1, zIndex: 101, flexDirection: 'row', justifyContent: 'space-between' }}>

            <View style={{ marginLeft: 0 }}>
                <View style={styles.premiumcontainer}>
                    <Text style={{ textAlign: 'center', color: 'black' }}>PREMIUM</Text>
                </View>
            </View>
            <View style={styles.favcontainer}>
                {/* <MaterialCommunityIcons name="heart" color={'black'} size={22} /> */}
                < MaterialCommunityIcons name="heart-outline" color={'black'} size={22} />
            </View>
        </View >
    }

    renderPopularItems = ({ item }) => (

        <TouchableHighlight underlayColor='#fafafa' onPress={() => this.goToDetails(item)}>
            <View >{this.renderHeader()}
                <View style={styles.horizonatalContainer}>

                    <View style={styles.photo}>
                        <Image style={{ width: '100%', height: '100%' }} source={{ uri: item.MainImageUri }} /></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.price}>{`$ ${item.Price}`}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.title}>{item.Tittle}</Text>
                    </View>

                    <View style={styles.locationcontainer}>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.location}>
                            <Image style={styles.locationimage} source={require('../../../assets/icons/location1.png')} /> {item.Locality}</Text>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={RecipeCard.date}> {"Jun 20"}</Text>
                    </View>
                </View></View>
        </TouchableHighlight>
    );

    renderRecommentedItems = ({ item }) => (
        <TouchableHighlight underlayColor='#fafafa' onPress={() => this.goToDetails(item)}>
            <View>{this.renderHeader()}
                <View style={styles.listcontainer}>
                    <View><Image style={styles.highphoto} source={{ uri: item.MainImageUri }} /></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.price}>{`$ ${item.Price}`}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.hightitle}>{item.Tittle}</Text>
                    </View>

                    <View style={styles.locationcontainer}>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.location}>
                            <Image style={styles.locationimage} source={require('../../../assets/icons/location1.png')} /> {item.Locality}</Text>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={RecipeCard.date}> {"Jun 20"}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );

    goToDetails = (item) => {
        this.props.navigation.navigate('Details', { item });
    }

    s3Upload() { }

    postImage = () => {
        const xhr = new XMLHttpRequest()
        let presignedUrl = 'https://test-bucket-tutorial.s3.ap-south-1.amazonaws.com/images/myimage.jpg?Content-Type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJG6UHCMETDTUJRWQ%2F20200621%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20200621T170158Z&X-Amz-Expires=900&X-Amz-Signature=37dabdf27a98dd33f4d84ac5924b28bedeb4cc381abdddf69a9c4762f2e37570&X-Amz-SignedHeaders=host';
        xhr.open('PUT', presignedUrl)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('Image successfully uploaded to S3')
                } else {
                    console.log('Error while sending the image to S3')
                }
            }
        }
        xhr.setRequestHeader('Content-Type', 'image/jpeg')
        xhr.send({ uri: '../../assets/icons/', type: 'image/jpeg', name: 'cow.png' })
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
const styles = StyleSheet.create({

    premiumcontainer: {
        width: 80,
        maxHeight: 18,
        borderColor: '#ffffff',
        backgroundColor: '#fcf403',
        height: 30,
        marginLeft: 1,
    },
    favcontainer: {
        width: 40,
        position: 'relative',
        top: 10,
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
    listcontainer: RecipeCard.container,
    horizonatalContainer: RecipeCard.horizonatalContainer,
    photo: RecipeCard.photo,
    highphoto: RecipeCard.highphoto,
    title: RecipeCard.title,
    hightitle: RecipeCard.hightitle,
    price: RecipeCard.price,
    location: RecipeCard.location,
    locationimage: RecipeCard.locationimage,
    locationcontainer: RecipeCard.locationcontainer,
    category: RecipeCard.category


})


export default withNavigation(Home);
