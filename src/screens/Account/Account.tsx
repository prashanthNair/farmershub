import React from 'react';
import {
    FlatList,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    TouchableHighlight,
    Linking
} from 'react-native';
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

const accountDetails = [
    {
        name: 'Buy package',
        id: 1,
        tag: "Sell faster and more at higher margins"
    },
    {
        name: 'My Order',
        id: 1,
        tag: "Check my order status and payments"
    },
    {
        name: 'Invoices',
        id: 1,
        tag: "download your invoices"
    },
    {
        name: 'My Ads',
        id: 1,
        tag: "download your invoices"
    },
    {
        name: 'Settings',
        id: 1,
        tag: "Privacy and logout"
    },
    {
        name: 'Help & Support',
        id: 2,
        tag: "Help center and legal terms"
    },
    {
        name: 'Select Lanquage',
        id: 3,
        tag: "English"
    }
]

const Account = (props) => {

    let renderCategories = ({ item }) => (
        <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => props.navigation.navigate('Ad Details')}>
            <View style={styles.detailsRow}>
                <View >
                    <Text style={{ textAlign: "left", fontWeight: 'bold' }}>
                        {item.name}
                    </Text>
                    <Text>{item.tag}</Text>
                </View>
                <View>
                    <MaterialCommunityIcons name="chevron-right" color={'black'} size={22} />
                </View>
            </View>
        </TouchableHighlight>
    );


    return (
        <ScrollView>
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={{ marginTop: 50 }}>
                    <Text style={{color:'#fff', fontSize:22, fontWeight:'bold'}}>My Account</Text>
                </View>
                <View style={{ flexDirection: 'row', marginVertical: 20, justifyContent: 'space-around' }}>
                    <View style={styles.circle} ></View>
                    <View>
                        <View style={{ margin: 20, }}><Text style={{ fontWeight: 'bold',color:'#fff' }}>Welcome Prasanth</Text>
                            <Text style={{ color: 'blue' }}
                                onPress={() => props.navigation.navigate('Profile')}>
                                Edit Profile
                    </Text>
                        </View>

                    </View>
                </View>
            </View>
            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    data={accountDetails}
                    renderItem={renderCategories}
                    keyExtractor={item => `${item.id}`}
                />
            </View>

        </View>
    </ScrollView>
    )
}

export default withNavigation(Account);