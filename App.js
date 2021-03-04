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
  Dimensions,
  View,
  Text,
  StatusBar,
} from 'react-native';
import AnimationFlatlist from './Class/AnimationFlatlist'

const { width, height } = Dimensions.get('window');

let SampleData = [{title : 'Spiderman',image :require('./assets/spiderman.jpg') ,subTitle:'Dance with'},
  {title : 'Deadpool',subTitle:'Dance with',image : require('./assets/deadpool.jpg')},
  {title : 'Stormtrooper',image :require('./assets/stormtrooper.jpg')},
  {title : 'Woody toy',image:require('./assets/toy.jpg')},
  {title : 'Wolverine',image :require('./assets/wolverine.jpg')}]

const ITEM_SIZE = width-120
const ITEM_HEIGHT = height/2

class App extends React.Component 
{
  render()
  {
    return(
      <View style = {{flex:1}}>
      <AnimationFlatlist
       data={SampleData}
       height={ITEM_HEIGHT}
       width={ITEM_SIZE}
       title={'Welcome'}
       subTitle={'Choose your character'}
       primaryBackgroundColor = '#4528AC'
       secondaryBackgroundColor = 'rgb(245, 245, 245)'
       textPrimaryColor = '#fff'
       textSecondaryColor = '#000'
      />
      </View>
    )
  }
}

export default App;
