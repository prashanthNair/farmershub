import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    ActivityIndicator
} from 'react-native'
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';

import { Button } from 'react-native-elements';
import * as MediaLibrary from 'expo-media-library'
import SafeAreaView from 'react-native-safe-area-view'

import ImageTile from '../PostAd/ImageTitle'
import { withNavigation } from 'react-navigation'

const { width } = Dimensions.get('window')

interface Props {
    navigation: any,
    badgeColor: any,
    max: any,
    mediaSubtype: any,
    callback: any,
    headerSelectText: any,
    headerCloseText: any,
    headerDoneText: any,
    headerButtonColor: any,
    // loadingColor: any,
    emptyText
}
class ImageBrowser extends React.Component<Props> {
    constructor(props: any) {
        super(props)
        this.state = {
            photos: [],
            selected: [],
            after: null,
            hasNextPage: true
        }
    }

    async componentDidMount() {
        // if (Constants.platform.ios) {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
        //  } 
        this.getPhotos()
        this.setState({ badgeColor: this.props.badgeColor ? this.props.badgeColor : '#007aff' })
    }

    selectImage = (index) => {
        let newSelected = Array.from(this.state['selected'])

        if (newSelected.indexOf(index) === -1) {
            newSelected.push(index)
        } else {
            const deleteIndex = newSelected.indexOf(index)
            newSelected.splice(deleteIndex, 1)
        }

        if (newSelected.length > this.props.max) return
        if (newSelected.length === 0) newSelected = []
        this.setState({ selected: newSelected })
    }

    getPhotos = () => {
        let params: any = { first: 500 }
        if (this.state['after']) params.after = this.state['after']
        if (!this.state['hasNextPage']) return
        MediaLibrary
            .getAssetsAsync(params)
            .then((assets) => {
                this.processPhotos(assets)
            })
    }

    processPhotos = (assets) => {
        if (this.state['after'] === assets.endCursor) return

        let displayAssets
        // if (this.props.mediaSubtype == null) {
        //  //   displayAssets = assets.assets
        // } else 
        // {
        // alert(assets.assets[0])
        displayAssets = assets.assets.filter((asset) => {
            return asset.mediaType.includes('photo')
        })
        displayAssets.reverse();

        // }

        this.setState({
            photos: [...displayAssets],
            after: assets.endCursor,
            hasNextPage: assets.hasNextPage
        })
    }

    getItemLayout = (data, index) => {
        let length = width / 4
        return { length, offset: length * index, index }
    }

    prepareCallback = () => {
        let selected = this.state['selected'];
        let photos = this.state['photos'];
        const selectedPhotos = selected.map(i => photos[i])
        const assetsInfo = Promise.all(selectedPhotos.map(i => MediaLibrary.getAssetInfoAsync(i)))
        this.props.callback(assetsInfo)
    }

    renderHeader = () => {
        let selectedCount = this.state['selected'].length

        let headerText = `${selectedCount} ${this.props.headerSelectText ? this.props.headerSelectText : 'Selected'}`
        if (selectedCount === this.props.max) headerText = headerText + ' (Max)'
        const headerCloseText = this.props.headerCloseText ? this.props.headerCloseText : 'Close'
        const headerDoneText = this.props.headerDoneText ? this.props.headerDoneText : 'Done'
        const headerButtonColor = this.props.headerButtonColor ? this.props.headerButtonColor : '#007aff'

        return (
            <SafeAreaView forceInset={{ top: 'always' }} style={{ height: 52 }}>
                <View style={styles.header}>

                    <Button
                        color={headerButtonColor}
                        title={headerCloseText}
                        onPress={() => this.props.callback(Promise.resolve([]))}
                    />
                    <Text style={styles.headerText}>{headerText}</Text>
                    <Button
                        color={headerButtonColor}
                        title={headerDoneText}
                        onPress={() => this.prepareCallback()}
                    />

                </View>
            </SafeAreaView>
        )
    }

    renderImageTile = ({ item, index }) => {
        const selected = this.state['selected'].indexOf(index) !== -1
        const selectedItemCount = this.state['selected'].indexOf(index) + 1

        return (
            <ImageTile
                item={item}
                selectedItemCount={selectedItemCount}
                index={index}
                camera={false}
                selected={selected}
                selectImage={this.selectImage}
                badgeColor={this.state['badgeColor']}
            />
        )
    }

    renderLoading = () => {
        return (
            <View style={styles.emptyContent}>
                <ActivityIndicator size='large' color={this.props.loadingColor ? this.props.loadingColor : '#bbb'} />
            </View>
        )
    }

    renderEmpty = () => {
        return (
            <View style={styles.emptyContent}>
                <Text style={styles.emptyText}>{this.props.emptyText ? this.props.emptyText : 'No image'}</Text>
            </View>
        )
    }

    renderImages = () => {
        return (
            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                data={this.state['photos']}
                numColumns={4}
                renderItem={this.renderImageTile}
                keyExtractor={(_, index) => index}
                onEndReached={() => { this.getPhotos() }}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={this.renderEmpty}
                initialNumToRender={24}
                getItemLayout={this.getItemLayout}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                {this.renderImages()}
                <Button title="Next" buttonStyle={{ width: '100%', borderRadius: 0, backgroundColor: '#0a87f5' }} onPress={() => {
                    this.props.navigation.navigate('Set a price');
                }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    header: {
        width: width,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 19
    },
    emptyContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        color: '#bbb',
        fontSize: 20
    }
})

export default ImageBrowser