
import React, {useRef, useEffect} from 'react'
import { Platform,View, StyleSheet, Animated, Easing } from 'react-native'

export default function Waiter({rounded = false}) {
        
  const useNative = Platform.OS === "web"; //for Web the useNativeDriver fail on loop animations

  const anim = useRef(new Animated.Value(0)).current;

 
    useEffect(() => {
      Animated.loop(
        Animated.timing(
          anim, {
            toValue: 360,
            easing: Easing.inOut(Easing.linear),
            duration: 5000,
            useNativeDriver: useNative,
            isInteraction: false
        }), {iterations: -1}
      ).start();
      }, [anim]);
  
    const spin = anim.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    });


     return (
         <View style={styles.container} > 
              <Animated.View style={[ styles.squared ,   {
            transform: [{ rotateZ: spin }, { rotateX: spin }]   
          }]} />
         </View>
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