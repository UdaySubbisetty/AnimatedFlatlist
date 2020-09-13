import * as React from 'react';
import { Text,Animated,Dimensions, View,Image, StyleSheet,SafeAreaView } from 'react-native';
const { width, height } = Dimensions.get('window');

 let SampleData = [{name : 'Spiderman',image:require('./../assets/spiderman.jpg')},
  {name : 'Deadpool',image : require('./../assets/deadpool.jpg')},
  {name : 'Stormtrooper',image : require('./../assets/stormtrooper.jpg')},
  {name : 'Woody toy',image : require('./../assets/toy.jpg')},
  {name : 'Wolverine',image : require('./../assets/wolverine.jpg')}]
const ITEM_SIZE = width-120
const ITEM_HEIGHT = height/2

export default class AnimationFlatlist extends React.Component {
 
constructor(props) {
    super(props);
    this.state={
      scrollX : new Animated.Value(0),
    }
    
  }

 render()
 {
  
  const {scrollX} = this.state
  const inputRange = [(0),(ITEM_SIZE)]
 const translateX = this.state.scrollX.interpolate({
  inputRange,
   outputRange:[0,-width]
 })

 const backgroundColor = this.state.scrollX.interpolate({
  inputRange,
  outputRange:['#fff','#000']
 })

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style = {{position:'absolute',top:0,left:0,bottom:0,right:width/3,backgroundColor:'#4528AC',
                      transform:[{translateX:translateX}]}}/>

      <View style = {{marginTop:60,marginLeft:60}}>
       <Animated.Text style = {{color:backgroundColor,fontWeight:'bold',fontSize:16}}>Welcome to Amie</Animated.Text>
       <Animated.Text style = {{color:backgroundColor,marginTop:20,width:200, fontWeight:'bold',fontSize:30}}>Choose your character</Animated.Text>

       </View>
      <Animated.FlatList 
      horizontal
      data = {SampleData}
      keyExtractor = {(item,index)=> item.name+index}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      snapToInterval={ITEM_SIZE}
      decelerationRate={0.2}
      renderItem = {this.renderItem}
      onScroll={Animated.event(
        [{nativeEvent:{contentOffset:{x:scrollX}}}],
        {
          useNativeDriver:false
        }
      )}
      />
    </SafeAreaView>
  );
 }

renderItem = ({item,index}) =>
{
  console.log(this.state.scrollX);

  let translateY = this.state.scrollX.interpolate({
    inputRange:[(index-1)*ITEM_SIZE,
                index*ITEM_SIZE,
                (index+1)*ITEM_SIZE],
    outputRange:[0.8,1.1,0.8]
  })

  const changeImageX  = this.state.scrollX.interpolate({
    inputRange:[(index-1)*ITEM_SIZE,
                index*ITEM_SIZE],
    outputRange:[-100,0]
  })

  return (
    <Animated.View key={index+1+'ll'} style = {{marginLeft:(index==0 ? (width-ITEM_SIZE)/2 : 0),marginRight:(index == SampleData.length-1 ? (width-ITEM_SIZE)/2 : 0) , paddingHorizontal :10,height:ITEM_HEIGHT, borderRadius:8,overflow:'hidden', alignSelf:'center',width:ITEM_SIZE,transform:[{scaleX:translateY},{scaleY:translateY}],
    overflow:'hidden'}}>
    <Animated.Image style = {{transform:[{translateX :changeImageX}], flex:1,width:'100%',borderRadius:6}} source = {item.image}/>
    <View style = {{position:'absolute',bottom:20,justifyContent:'center', right:0,left:0,paddingHorizontal:30, height:120}}>
    <Text style = {{color:'#fff',fontSize:16,fontWeight:'bold'}}>Dance with</Text>
    <Text style = {{color:'#fff',marginTop:10, fontSize:24,fontWeight:'bold'}}>{item.name}</Text>

    </View>
    </Animated.View>
  )
  
}
 
}

 


const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
