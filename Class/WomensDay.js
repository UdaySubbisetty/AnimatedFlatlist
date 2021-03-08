/* eslint-disable max-len */
import React, { useEffect } from "react";
import { Dimensions,Text, StyleSheet, View } from "react-native";
import Animated,{ Easing, useSharedValue,useAnimatedStyle, withTiming } from "react-native-reanimated";
import Svg from "react-native-svg";
import AnimatedStroke from "./AnimatedStroke";
const MARGIN = 10;
const vWidth = 597 + MARGIN;
const vHeight = 381 + MARGIN;
const width = Dimensions.get("window").width - 64;
const height = (width * vHeight) / vWidth;
const svgPaths = [
    "M48.4 160C76 153.2 81.2 56 145.046 62.821C106.623 62.374 102.4 155.6 49.2 160.4M58 211.2C33.352 170.494 74.902 191.046 117 98C155.6 39.6 195.2 71.6 172.8 101.2C172.8 62.8 134.4 88.8 132.4 120C129.856 189.706 62 173.6 58 211M72.8 258C51.6 169.6 98 207.6 126.8 166C110.644 218.746 104.836 198.194 73.6 258.8M125.2 184.8C141.2 166.4 133.2 143.2 136.4 118C150 79.2 170.8 84 172.8 109.6C172.6667 112.5333 172.5333 115.4667 172.4 118.4L177.6 118.8L172.4 120.8C170.8 127.6 186.703 131.073 172.4 134.8C172.4 137.2 179.6 140.4 172.4 142C172.4 143.4667 179.2 143.6 172.4 146.4C185.2 170.8 154.8 153.2 145.2 165.6ZM106.8 148.8C113.2 146 119.6 146 120.4 124L106.8 149.2Z",
    
];

const WomensDay = () => {
  const progress = useSharedValue(0);
  
    
    useEffect(() => {
    
            progress.value = withTiming(1, {
      duration: 8000,
      easing: Easing.linear,
    });
        
    
    }, [progress]);
    

   
    const testStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
    };
    });
    
  return (
      <View style={styles.layer}>

      <Svg
        width={width}
        height={width}
        viewBox="0 40 230 230"
          >
             
        {svgPaths.map((d, key) => (
          <AnimatedStroke progress={progress} d={d} key={key} />
        ))}
                
          </Svg>

          <Animated.View style={[{  width: '100%', height: 300,justifyContent:'center',alignItems:'center'},testStyle]}>
              <Text style={{fontFamily:"Frunch", fontWeight: '600', fontSize: 18,color:'#DB396B' }}>Happy</Text>
              <Text style={{ fontFamily:"Frunch",fontWeight: '800', fontSize: 80,color:'#DB396B',textAlign:'center' }}>Women's Day</Text>
            </Animated.View>


    
    </View>
  );
};

export default WomensDay;


const styles = StyleSheet.create({
  layer: {
        flex: 1,
    
    justifyContent: "center",
    alignItems: "center",
  },
});
