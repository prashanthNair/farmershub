import React, { useState, useEffect, Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface Props {
    navigation: any
}
class AddImages extends React.Component<Props>{

    signedUrl = ''

    constructor(props) {
        super(props);
        // this.state = {
        //     image: null,
        //     counter: 0
        // }

        this.state = {
            filepath: {
                data: '',
                uri: ''
            },
            fileData: '',
            fileUri: '',
            renderedUi: []
        }
    }
    postImage = (uri) => {
        const xhr = new XMLHttpRequest()
        let presignedUrl = this.signedUrl//'https://farmer-bucket.s3.us-east-2.amazonaws.com/images/myimage.jpg?Content-Type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5CMPPPU7A6NDRTIG%2F20200622%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200622T153933Z&X-Amz-Expires=900&X-Amz-Signature=8773e2a2218578f675c29929f576fab870b861aecf07504d39ff9e4fcec7cd3a&X-Amz-SignedHeaders=host';
        xhr.open('PUT', presignedUrl)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr)
                if (xhr.status === 200) {
                    alert('Image successfully uploaded to S3')
                } else {
                    alert('Error while sending the image to S3')
                }
            }
        }
        xhr.setRequestHeader('Content-Type', 'image/jpeg')
        xhr.send({ uri, type: 'image/jpeg' })
    }
    // const [image, setImage] = useState(null);

    awsSetup = async () => {
        let url = ''
        var AWS = require('aws-sdk');
        var s3 = new AWS.S3({ accessKeyId: 'AKIA5CMPPPU7A6NDRTIG', secretAccessKey: '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', region: 'us-east-2' });

        var params = { Bucket: 'farmer-bucket', Key: 'images/myimage2.jpg', ContentType: 'image/jpeg' };
        await s3.getSignedUrl('putObject', params, (err, url) => {
            console.log('Your generated pre-signed URL is', url);
            this.signedUrl = url;
        });
        return  this.signedUrl
    }

    async componentDidMount() {
        if (Constants.platform.ios) {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }
    // useEffect(() => {
    //     (async () => {
    //         if (Constants.platform.ios) {
    //             const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    //             if (status !== 'granted') {
    //                 alert('Sorry, we need camera roll permissions to make this work!');
    //             }
    //         }
    //     })();
    // }, []);

    // const getPermissionAsync = async () => {
    //     if (Constants.platform.ios) {
    //       const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //       if (status !== 'granted') {
    //         alert('Sorry, we need camera roll permissions to make this work!');
    //       }
    //     }
    //   };

    launchImageLibrary = async () => {
        await this.awsSetup();
       alert( this.signedUrl);
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        let response: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(response);

        if (response.cancelled) {
            console.log('User cancelled image picker');
        } else {
            const source = { uri: response.uri };
            console.log('response', JSON.stringify(response));
            this.setState({
                filePath: response,
                fileData: response.data,
                fileUri: response.uri
            });
        }
        this.postImage(response['uri'])
        // if (!response.cancelled) {
        //     this.setState({ fileUri: result['uri'] })
        // }
    };

    onAddItem = (uri) => {
        this.setState(state => {
            const list = [...state['renderedUi'], uri];
            const images = this.state['renderedUi'].concat(uri);
            console.log(images);
            return {
                list
            };
        });
    };


    launchCamera = async () => {
        
        await this.awsSetup();
        let response: any = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        }); 
        if (response.cancelled) {
            alert('User cancelled image picker');
        } else {
            const source = { uri: response.uri }; 
            console.log('response', JSON.stringify(response));
            this.setState({
                filePath: response,
                fileData: response.data,
                fileUri: response.uri
            });
            
            await this.postImage(response['uri'])
        }
    }

    renderFileUri = () => {
        if (this.state['fileUri']) {
            return <Image
                source={{ uri: this.state['fileUri'] }}
                style={styles.images}
            />
        } else {
            return <Image
                source={require('../../../assets/icons/location1.png')}
                style={styles.images}
            />
        }
    }

    renderFileData() {
        if (this.state['fileData']) {
            return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state['fileData'] }}
                style={styles.images}
            />
        } else {
            return <Image source={require('../../../assets/icons/location1.png')}
                style={styles.images}
            />
        }
    }

    chooseImage = () => {
        let options = {
            title: 'Select Image',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
    }


    render() {
        return (

            <View>
                {/* <Fragment> */}
                <StatusBar barStyle="dark-content" />
                {/* <SafeAreaView> */}
                <View style={styles.body}>
                    <Text style={{ textAlign: 'center', fontSize: 20, paddingBottom: 10 }} >Pick Images from Camera & Gallery</Text>
                    <View style={styles.ImageSections}>
                        <View>
                            {this.renderFileData()}
                            <Text style={{ textAlign: 'center' }}>Base 64 String</Text>
                        </View>
                        <View>
                            {this.renderFileUri()}
                            <Text style={{ textAlign: 'center' }}>File Uri</Text>
                        </View>
                    </View>

                    <View style={styles.btnParentSection}>

                        <TouchableOpacity onPress={this.launchCamera} style={styles.btnSection}  >
                            <Text style={styles.btnText}>Directly Launch Camera</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.launchImageLibrary} style={styles.btnSection}  >
                            <Text style={styles.btnText}>Directly Launch Image Library</Text>
                        </TouchableOpacity>
                    </View>
                    <Button title="Next" buttonStyle={{ width: '100%', borderRadius: 0, backgroundColor: '#0a87f5' }} onPress={() => {
                        this.props.navigation.navigate('Set a price');
                    }} />
                </View>
                {/* </SafeAreaView> */}
                {/* </Fragment>  */}
            </View>
        );
    }

}
export default withNavigation(AddImages)

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },

    body: {
        backgroundColor: Colors.white,
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
        height: Dimensions.get('screen').height - 20,
        width: Dimensions.get('screen').width
    },
    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center'
    },
    images: {
        width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
    },
    btnParentSection: {
        alignItems: 'center',
        marginTop: 10
    },
    btnSection: {
        width: 225,
        height: 50,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 10
    },
    btnText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 14,
        fontWeight: 'bold'
    }
});

