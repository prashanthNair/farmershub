import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { withAuthenticator } from 'aws-amplify-react-native'

import Amplify from '@aws-amplify/core'
import config from './aws-exports'
import BottomNavigation from './src/components/BottomTabNavigator/bottomtabnavigator';
import { NavigationContainer } from '@react-navigation/native';

Amplify.configure(config)

function App() {
  return (
    <NavigationContainer>
      <BottomNavigation />
    </NavigationContainer>
  );
}

// export default withAuthenticator(App, { includeGreetings: true })

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
