import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';


const LOCATION_TASK_NAME = 'background-location-task';
const PERMISSION_NAME = { 
  Location: 'location',
  Camera: 'camera',
  File: 'file'
};


const requestLocationPermissions = async () => {
  const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === 'granted') {
    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
      });
    }
  }
};

// use location the location requested by default  
const PermissionsButton = ({ typeName = PERMISSION_NAME.Location }) => {
  let _onPressFunction = requestLocationPermissions;
  if (typeName === PERMISSION_NAME.Location) {
    
    return (
      <View style={styles.container}>
        <Button onPress={_onPressFunction} 
              title={`Enable background ${typeName}`}
         />
      </View>
    )
  }
};

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data;
    // do something with the locations captured in the background
  }
});

export default PermissionsButton;
