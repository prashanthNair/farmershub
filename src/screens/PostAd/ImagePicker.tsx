import React, { useState, useEffect } from 'react';
import { Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
 
const AddImages=(props)=> {

    let signedUrl = ''
    const postImage = (uri) => {
        const xhr = new XMLHttpRequest()
        let presignedUrl = signedUrl//'https://farmer-bucket.s3.us-east-2.amazonaws.com/images/myimage.jpg?Content-Type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5CMPPPU7A6NDRTIG%2F20200622%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200622T153933Z&X-Amz-Expires=900&X-Amz-Signature=8773e2a2218578f675c29929f576fab870b861aecf07504d39ff9e4fcec7cd3a&X-Amz-SignedHeaders=host';
        xhr.open('PUT', presignedUrl)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr)
                if (xhr.status === 200) {
                    console.log('Image successfully uploaded to S3')
                } else {
                    console.log('Error while sending the image to S3')
                }
            }
        }
        xhr.setRequestHeader('Content-Type', 'image/jpeg')
        xhr.send({ uri, type: 'image/jpeg' })
    }
    const [image, setImage] = useState(null);

    const awsSetup = async () => {
        let url = ''
        //     var AWS = require('aws-sdk');
        //     var s3 = new AWS.S3({ accessKeyId: 'AKIA5CMPPPU7A6NDRTIG', secretAccessKey: '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', region: 'us-east-2' });

        //     var params = { Bucket: 'farmer-bucket', Key: 'images/myimage1.jpg', ContentType: 'image/jpeg' };
        //    await s3.getSignedUrl('putObject', params, function (err, url) {
        //         console.log('Your generated pre-signed URL is', url);
        //         signedUrl=url;
        //     });
        return url
    }

    useEffect(() => {
        (async () => {
            if (Constants.platform.ios) {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        await awsSetup();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);
        alert(result);
        postImage(result['uri'])
        if (!result.cancelled) {
            setImage(result['uri']);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: "flex-start" }}>

            <View>
                <Button title="Pick an image from camera roll" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                {/* <View>
                <Button title="Take A Photo" onPress={props.navigation.navigate('Camera Images')} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}</View> */}
            </View>
            <View style={{ flex: 1,flexDirection:'row', alignItems: 'flex-end', justifyContent: "flex-end"}}>
                <View style={{ flexDirection:'row', backgroundColor: '#0a87f5',justifyContent: "flex-end",width: '100%'}}>
                    <Button title="Next" buttonStyle={{ width: '100%', borderRadius: 0, backgroundColor: '#0a87f5' }} onPress={() => {
                        props.navigation.navigate('Set a price');
                    }} />
                </View>
                
            </View>

        </View>

    );
}

export default withNavigation(AddImages)
