
import React, {useRef, useEffect} from 'react'
import { View, StyleSheet, Animated } from 'react-native'

export default function Waiter({rounded = false}) {
    
    useEffect( () => {

        Rotating();
    } );
    
    
    let anim = useRef(new Animated.Value(RotateX(0))).current;

        
    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(anim, {
          toValue: RotateX(90),
          duration: 5000,
          useNativeDrivexr: true,
        })
    }

    const Rotating = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.loop (fadeIn).start();
      };
    
  
     return (
         <Animated.View style={[styles.container, { transform: anim } ]} > 
              <Animated.View style={[ styles.squared, { transform: (anim) } ]} />
         </Animated.View>
     )
 }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squared: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderColor: 'yellow',
    borderRadius: 50,

  },
  ronded: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderWidth: 5,
    borderColor: 'red',
    borderRadius: 50,
  },
})