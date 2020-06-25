import React, { useState } from 'react';
import { Text, View, TextInput, Image, StyleSheet, RecyclerViewBackedScrollViewBase, ScrollView, TouchableHighlight, FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import styles from '../Categories/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const adDetails = () => {

    return (
        <View style={styles.detailsRow}>
        <View >
          <Text style={{ textAlign: "left", fontWeight: 'bold' }}>
            Age :
        </Text>
        </View>
        <View>
          <Text style={{ textAlign: "right" }}>2</Text>
        </View>
      </View>

    )
}

export default withNavigation(adDetails)