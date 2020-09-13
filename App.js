/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import AnimationFlatlist from './Class/AnimationFlatlist'

class App extends React.Component 
{
  render()
  {
    return(
      <View style = {{flex:1}}>
      <AnimationFlatlist/>
      </View>
    )
  }
}

export default App;
