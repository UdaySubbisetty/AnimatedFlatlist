import React, { useRef,useState, useEffect} from 'react'
import { View,Animated,FlatList, Image,StyleSheet,ScrollView, Text, Dimensions, TouchableOpacity } from 'react-native'
const { width, height } = Dimensions.get('window')
const pizzaHutImage = require('./../assets/ph.png')
const burgerKing = require('./../assets/bk.png')
const kfc = require('./../assets/kfc.png')
const md = require('./../assets/mc.png')
const imageOne = require('./../assets/one.jpeg')
const imageTwo = require('./../assets/two.jpeg')
const imageThree = require('./../assets/three.jpeg')

const viewWidth = width - 100
const imageHeight = viewWidth - 60
const dotSpace = (46/3)


const data = [{ title: 'All your favorites restraurants', subTitle: 'Order from the best local \n restaurants with easy,\n on-demand delivery', image: imageOne },
    { title: 'Unmatched \n reliability', subTitle: 'Experience peace of mind \n while tracking your order \n in real time', image: imageTwo },
{title:'24/7 support \n for you',subTitle:'Something come up? Talk \n to a real person. We are here \n to help',image:imageThree}]

export default function Onboarding() {

    const animationValue = useRef(new Animated.Value(0)).current
    const imageAnimationValue = useRef(new Animated.Value(0)).current

    const scrollRef = useRef(null)
    const [activeIndex, setActiveIndex] = useState(1)
    const startAnimation = () => {
        animationValue.setValue(0)
        Animated.timing(animationValue, {
            toValue: 1,
            duration: 30000,
            useNativeDriver: true
             
        }).start(() => { 
            startAnimation()
        });
    }

    
    useEffect(() => {
        startAnimation()
    }, [])

    const CretaeImage = ({ imageStyle, image, viewPosition }) => {

        const rotate = animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['-0deg', '-360deg']
        })
        return (
            <Animated.View style={[styles.imageMainView, styles.boxWithShadow, viewPosition, { transform: [{ rotate }] }]}>
                <Image source={image} style={[imageStyle, { resizeMode: 'contain' }]} />
            </Animated.View>
        )
    }


    const rotate = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })


    
renderItem = ({item,index}) => {
        
        return(
        <View style={[{ padding: 20, flex: 1, flexDirection: 'row' }]}>

                            <View key={item.subTitle} style={{ width:width,height:'100%'}}>
                                <Text>{item.title}</Text>
                            </View>
                        
                 
            </View>
        )
    }

    
 _onMomentumScrollEnd = ({ nativeEvent }) => {
   
   const index = Math.round(nativeEvent.contentOffset.x / width);
   if (index !== activeIndex) {
     setActiveIndex(index+1)
   }
 };

    return (
        <View style={styles.mainView}>
            <View style={{ marginTop: 80 }}>
                <View style={[styles.circleView, {padding:20,position:'absolute'}]}>
                    {data.map((item,index) => { 

                    const inputRange = [width*(index-1) ,width*index, width*(index+1)]
                         const rotateImage = imageAnimationValue.interpolate({
        inputRange: inputRange,
        outputRange:['-360deg','0deg', '360deg']
    })

    const opacity = imageAnimationValue.interpolate({
        inputRange: inputRange,
        outputRange:[0,1,0]
    })
                        
                        
                     

                        return (
                            <Animated.Image key={item.title} source={item.image} style={[styles.innerImage, {opacity, transform: [{ rotate: rotateImage }] }]} />
                        )
                    })}
                    
                </View>
            <Animated.View style={[styles.circleView, { transform: [{ rotate }] }]}>
                <View style={{ padding: 20,flex:1}}>
                    <CretaeImage image={kfc} viewPosition={styles.kfcPosition} imageStyle={styles.kfc}/>
                    <CretaeImage image={md} viewPosition={styles.mdPosition} imageStyle={styles.md}/>
                </View>
                <CretaeImage image={pizzaHutImage} viewPosition={styles.pizzaHutPosition} imageStyle={styles.pizzaHut} />
                <CretaeImage image={burgerKing} viewPosition={styles.burgerKingPosition} imageStyle={styles.burgerKing}/>

                </Animated.View>
            </View>

            <View style={{ flex: 1}}>
                <Animated.ScrollView
                ref={scrollRef}
                horizontal
                snapToInterval={width}
                pagingEnabled
                keyExtractor={(item)=>{item.subTitle}}
                    decelerationRate={0.2}
                    onMomentumScrollEnd={_onMomentumScrollEnd}
                scrollEventThrottle={16}
                    bounces={false}
                   
                showsHorizontalScrollIndicator={false}  
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: imageAnimationValue } } }],
                    { useNativeDriver: true }
                    )}
                >
                    {data.map((item, index) => { 

                           
                        
                        return (
                            <View key={item.subTitle} style={[{flexDirection: 'row',width:width}]}>

                            <View key={item.subTitle} style={{ width:width,padding:20,justifyContent:'center',alignItems:'center' }}>
                                    <Text numberOfLines={2} style={{ fontSize: 30, textAlign: 'center', fontWeight: '700' }} >{item.title}</Text>
                                     <Text numberOfLines={3} style={{fontSize:16,textAlign:'center',marginTop:25 ,color:'rgb(202,202,202)',fontWeight:'500',lineHeight:22}} >{item.subTitle}</Text>

                            </View>
                        
                 
                     </View>
                        )
                    })
                    }
                </Animated.ScrollView>
            </View>
            
            <View style={{ width: '100%', height: 50, justifyContent:'center',alignItems:'center' }}>
                <View style={{width:40, justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
                {data.map((item, index) => { 
                    
                    const size = 5
                    return (
                        <View key={`key${index}`} style = {{borderRadius:size/2, height:size,width:size,backgroundColor:'rgb(202,202,202)'}}/>
                    )
                })}
                    
                    <Animated.View style={[styles.dotView, {
                        transform: [{
                            translateX: Animated.divide(imageAnimationValue, width).interpolate({
                                inputRange: [0, 1],
                                outputRange:[0,dotSpace]
                    })}]}]}/>

                    </View>
            </View>
                
            
            <TouchableOpacity activeOpacity={1} style={[styles.button,styles.boxWithShadow]}
                onPress={() => { 

                    
                    if (activeIndex != data.length) {
                        setActiveIndex(pre => pre + 1)
                        scrollRef.current.scrollTo({ x: width * activeIndex, animated: true })
                    }
                    
                }}>
                <Text style={{ fontWeight: '700', fontSize: 15, color: '#fff' }}>{activeIndex == data.length ? "Start" : 'Next'}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView:{
        flex: 1, backgroundColor: '#fff',
        alignItems:'center'
    },
    pizzaHut: {
        height: 25, width: 25, borderRadius: 12.5,
        
    },

     md: {
        height: 25, width: 25, borderRadius: 15,
        
    },
     kfc: {
        height: 35, width: 35, borderRadius: 20,
        
    },
     innerImage:{position:'absolute',left:20,top:20, height:'100%',width:'100%',borderRadius:imageHeight},
    burgerKing: {
        height: 45, width: 45, borderRadius: 22.5,
        
    },

    dotView:{position:'absolute', borderRadius:5, height:10,width:10,backgroundColor:'rgb(224,121,71)'},
    button: {
        marginBottom:50,marginTop:30, height: 60, alignItems: 'center', justifyContent: 'center', width: 200, borderRadius: 15, backgroundColor: 'rgb(224,121,71)' 
    },
    circleView: {
         borderColor:'rgb(240,240,240)',borderWidth:1,  borderRadius: viewWidth / 2, height: viewWidth, width: viewWidth 
    },
    imageMainView: {
         position: 'absolute',
        padding: 3,
        backgroundColor: '#fff',
        borderRadius:25
    },
    pizzaHutPosition: {
        top: 40,
        left: 18,
    },
     mdPosition: {
        bottom: (viewWidth-180)/2,
        right: (viewWidth-100)/2,
    },
     kfcPosition: {
        bottom:(viewWidth-60)/2 ,
        right: 3,
    },

    burgerKingPosition: {
        bottom: 40,
        left: 8,
    },

    
    boxWithShadow: {
    shadowColor: 'gray',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 5,  
    elevation: 5
}
})
