import React, {
    useRef,
    useState
} from "react";
import {
    View,
    
} from 'react-native'
import Animated, {
    Easing,
    useAnimatedProps
} from "react-native-reanimated";
import {
    Path,
    Defs, Stop, Rect,
     LinearGradient
   
} from "react-native-svg";


const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedStroke = ({
    d,
    progress
}) => {
    const [length, setLength] = useState(0);
    const ref = useRef(null);
    


    
    const animatedProps = useAnimatedProps(() => {

        return {
            strokeDashoffset: length - length * Easing.bezier(0.55, 0.055, 0.675, 0.19)(progress.value),
            fillOpacity: progress.value >= 0.7 ? 1 : 0,
        }
    });

    return (
        <>
            <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#DB396B" stopOpacity="1" />
            <Stop offset="1" stopColor="#DB4F7A" stopOpacity="0.01" />
            </LinearGradient>
            </Defs>

            
                     <AnimatedPath
                    animatedProps={animatedProps}
                    onLayout={() => setLength(ref.current.getTotalLength())}
                    ref={ref}
                    d={d}
                    fill="url(#grad)"
                    stroke="#DB4F7A"
                    strokeWidth={1}
                    strokeDasharray={length}
            />
            </>
    );
};

export default AnimatedStroke;