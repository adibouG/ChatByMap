import React, {useState, useEffect} from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';

import * as Location from 'expo-location';
import * as Device from 'expo-device';
import * as TaskManager from 'expo-task-manager';

import Marker from './Marker';
import Waiter from './Waiter';


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  paragraph:{ 
  flex: 1,
  color: 'grey',
  alignItems: 'center',
  justifyContent: 'center'
 }
});



 
 export default function Map () {
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [areaKm, setAreaKm] = useState(1);

  useEffect(() => {
    if (!location) setLocationState();
  }, []);


  const SetLocationTask = (name) => {
    const taskExecutorObj =  { data: { locations }, error }; 
    TaskManager.defineTask(name, (arg = taskExecutorObj) => {
      if (arg.error) {
        // check `error.message` for more details.
        console.log('Error', arg.error.message);
      }
      console.log('locations received', arg.data.locations);
      return arg;
    })
  }

  const setLocationState = async () => {
    try
    {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') throw status;
    
      let loc;
      if (!location) loc = await Location.getLastKnownPositionAsync({});
      else loc = await getCurrentPositionAsync({});
      
      if (location && (JSON.stringify(loc.coords) === JSON.stringify(location.coords))) return;
      
      return setLocation(loc);
      
    }
    catch (err) 
    {
      setErrorMsg(err); 
    }
  } 
  function degreesToRadians(angle) {
    return angle * (Math.PI / 180);
  }
  function kMToLongitudes(km, atLatitude) {
    return km * 0.0089831 / Math.cos(degreesToRadians(atLatitude));
  }
  
  return (
    <View style={styles.container}>
      <MapView
          style={styles.map}
          region={{
          latitude: location?.coords?.latitude || 37.78825,
          longitude: location?.coords?.longitude || -122.4324,
          latitudeDelta: 0.001,
          longitudeDelta: kMToLongitudes(areaKm, 51.588491),
        }}
      >
      </MapView>
      <View style={styles.paragraph}>
        <Text>
        {
          `Location: 
          ${location ? 
            JSON.stringify(location.coords) 
            : errorMsg}`
        }
        </Text> 
      </View> 
    </View>
 );
      }
/*const Map = () => {
   
  return (
    <View style={msgViewStyles.mapContainer}>
      <MapView style={msgViewStyles.map}  
       initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}/>
    {/* <View style={msgViewStyles.container}>
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
      <View style={msgViewStyles.mapContainer}>
      <MapView style={msgViewStyles.map} />
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
mapContainer: {
  flex: 1,
},
   map: {
  width: '100%',
  height: '100%',
},
});


*/
//export default Map;