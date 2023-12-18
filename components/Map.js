import React from 'react';
import * as Device from 'expo-device';

import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import Marker from './Marker';
import Waiter from './Waiter';

const Map = ({error, location}) => {
   
  return (
    <View style={msgViewStyles.container}>
      { 
        error 
        && Alert.alert(error)
      }
      <View style={msgViewStyles.paragraph}>
        <Text>
        {
          `Location: 
          ${location ? 
            JSON.stringify(location) 
            : error}`
        }
        </Text> 
      </View> 
      <MapView />
      <View style={msgViewStyles.map}>
      {
        location ? <Marker /> : <Waiter />
      }
      </View>
    </View>
  )
}




const msgViewStyles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center'
},
paragraph: {
  flex: 1,
  color: 'grey',
  alignItems: 'center',
  justifyContent: 'center'
}, 
map: {
  flex: 1,
  backgroundColor: 'none',
  color: 'grey',
  alignItems: 'center',
  justifyContent: 'center'
} 
});



export default Map;
