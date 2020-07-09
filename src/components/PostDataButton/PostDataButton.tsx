import React from 'react';
import { View } from "react-native";
import { Button } from 'react-native-elements';
import { Store } from '../../store/store';


const PostDataButton = (props) => {
    return (<View style={{ flex: 1, flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: "center" }}>
        <Button title="Next" buttonStyle={{ width: '100%', borderRadius: 30, backgroundColor: '#038d91' }} onPress={() => {
            // Store.setPostData(props.dataToPost);
            props.navigation.navigate('Upload Images');
        }} />

    </View>)
}

export default PostDataButton;


