import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles'; 
import MenuButton from '../../userComponents/MenuButton/MenuButton'
import { DrawerContentComponentProps } from 'react-navigation-drawer';

export default class DrawerContainer extends React.Component<DrawerContentComponentProps> {
 public propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    })
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <MenuButton
            title="HOME"
            source={require('../../../assets/icons/home.png')}
            onPress={() => {
              navigation.navigate('Home');
              navigation.dismiss()
            }}
          />
          <MenuButton
            title="CATEGORIES"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.navigate('Categories');
              navigation.dismiss();
            }}
          />
          <MenuButton
            title="SEARCH"
            source={require('../../../assets/icons/search.png')}
            onPress={() => {
              navigation.navigate('Search');
              navigation.dismiss();
            }}
          />
        </View>
      </View>
    );
  }
}

// DrawerContainer.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired
//   })
// };
