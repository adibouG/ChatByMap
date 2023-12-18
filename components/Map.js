import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';

import * as Location from 'expo-location';
import * as Device from 'expo-device';
import * as TaskManager from 'expo-task-manager';

//import Marker from './Marker';
import Waiter from './Waiter';


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    flex:1,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  paragraphContainer:{ 
    position: 'absolute',
    height: '20%',
    width: '100%',
    bottom:20,
    color: 'grey',
    alignItems: 'center',
    justifyContent: 'flex-end'
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
  
  /* helpers function to calculate the area
   displayed by the Map according to areaKm state*/ 
  function degreesToRadians(angle) {
    return angle * (Math.PI / 180);
  }
  function kMToLongitudes(km, atLatitude) {
    return km * 0.0089831 / Math.cos(degreesToRadians(atLatitude));
  }
  
  const onRegionChange = () => setLocationState();

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
      {
        location ?
          <MapView
            style={styles.map}
            region={{
              latitude: location?.coords?.latitude || 37.78825,
              longitude: location?.coords?.longitude || -122.4324,
              latitudeDelta: 0.001,
              longitudeDelta: kMToLongitudes(areaKm, location?.coords?.latitude),
            }}
           onRegionChange={onRegionChange}
          >
            <Marker 
              coordinate={{
                latitude: location?.coords?.latitude,
                longitude: location?.coords?.longitude
              }} 
            />
          </MapView>
        : 
          <Waiter />
      }
      </View>
      <View style={styles.paragraphContainer}>
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

