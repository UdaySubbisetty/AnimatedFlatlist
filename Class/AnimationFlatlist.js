import * as React from 'react';
import { Text,Animated,Dimensions, View,Image,
  ImageBackground,
   StyleSheet,SafeAreaView } from 'react-native';
const { width, height } = Dimensions.get('window');


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
  const inputRange = [(0),(this.props.width)]
 const translateX = this.state.scrollX.interpolate({
  inputRange,
   outputRange:[0,-width]
 })

 const backgroundColor = this.state.scrollX.interpolate({
  inputRange,
  outputRange:['#fff','#000']
 })

  return (
    <SafeAreaView style={[styles.container,{backgroundColor:this.props.secondaryBackgroundColor}]}>
      <Animated.View style = {{position:'absolute',top:0,left:0,bottom:0,right:width/3,backgroundColor:this.props.primaryBackgroundColor,
                      transform:[{translateX:translateX}]}}/>

      <View style = {{marginTop:60,marginLeft:60}}>
       <Animated.Text style = {{color:backgroundColor,fontWeight:'bold',fontSize:16}}>{this.props.title}</Animated.Text>
       <Animated.Text style = {{color:backgroundColor,marginTop:20,width:200, fontWeight:'bold',fontSize:30}}>{this.props.subTitle}</Animated.Text>

       </View>
      <Animated.FlatList 
      horizontal
      data = {this.props.data}
      keyExtractor = {(item,index)=> item.name+index}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      snapToInterval={this.props.width}
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
  var ITEM_SIZE = this.props.width
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
    <Animated.View key={index+1+'ll'} style = {{marginLeft:(index==0 ? (width-ITEM_SIZE)/2 : 0),marginRight:(index == this.props.data.length-1 ? (width-ITEM_SIZE)/2 : 0) , marginHorizontal :10,height:this.props.height, borderRadius:8,overflow:'hidden', alignSelf:'center',width:ITEM_SIZE,transform:[{scaleX:translateY},{scaleY:translateY}],
    overflow:'hidden'}}>
      <Animated.View style = {{flex:1,backgroundColor:'#eeeeee', transform:[{translateX :changeImageX}]}}>    
       <ImageBackground resizeMode={'center'} style = {{flex:1,width:'100%',borderRadius:6}} source = {require('./../assets/placeholder.png')}>

    <Animated.Image style = {{ flex:1,width:'100%',borderRadius:6}} source = {{uri:item.image}}/>
    </ImageBackground>
    </Animated.View>
    <View style = {{position:'absolute',bottom:20,justifyContent:'center', right:0,left:0,paddingHorizontal:30, height:120}}>
    <Text style = {{color:'#fff',fontSize:16,fontWeight:'bold'}}>{item.subTitle}</Text>
    <Text style = {{color:'#fff',marginTop:10, fontSize:24,fontWeight:'bold'}}>{item.title}</Text>

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


AnimationFlatlist.defaultProps = {
  data: [ {title : 'Title',subTitle:'Dance with',image : ''},
  {title : 'Title',image :''}],
  height: height/2,
  width: width-120,
  title:'Title',
  subTitle:'Subtitle',
  primaryBackgroundColor :'#4528AC',
  secondaryBackgroundColor : '#fff',
  textPrimaryColor : '#fff',
  textSecondaryColor : '#000',
  

};

