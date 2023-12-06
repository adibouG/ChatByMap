import React, { Component, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import * as ImagePicker from 'expo-image-picker';

import { 
  Alert, Platform, SafeAreaView, StyleSheet, Text, View, 
  Button, Pressable, TouchableHighlight, TouchableOpacity, 
  TouchableNativeFeedback, TouchableWithoutFeedback
} from 'react-native';

import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StyledButton from './components/Button';
import Marker from './components/Marker';
import Waiter from './components/Waiter';

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

const GetLocation = async (setError, setLocation) => {
      
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setError('Permission to access location was denied');
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  setLocation(location);
  return;
}

 function StartScreen({ navigation, route }) {
  
  const onPress = (e) => navigation.navigate("Home")
  
  return (

    <SafeAreaView style={styles.container}>
      <StyledButton theme="primary" label="Start" onPress={onPress}/>
      <StyledButton label="Settings"  onPress={onPress}/>
    </SafeAreaView>
  );
}

function HomeScreen({ navigation, route }) {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    GetLocation(setErrorMsg, setLocation);
  }, []);

  let text;
  let node = <Waiter/>;
  if (errorMsg) {
    text = errorMsg;
    node = Alert.alert(errorMsg);  
  } 

  else {
    text = JSON.stringify(location);
    node = <Marker />
  }


  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
        {node}
    </SafeAreaView>
  );
}



function SettingsScreen({ navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
      <StyledButton theme="primary" label="Start" />
      <StyledButton label="Settings"/>
    </SafeAreaView>
  );
}

const RootStack = createNativeStackNavigator() ;

const ScreenLogoTitle = ({children}) => {
  return (
    <View>
      <StatusBar style="auto" /> 
      <Text>{children}</Text>
    </View>
  )
 }

export default function App() {
  
  const [selectedImage, setSelectedImage] = useState(null);
  const getImage = (s) => PickImageAsync (s) ;  
  return (
    <NavigationContainer>
      <RootStack.Navigator id={1} screenOptions={{ headerTitle: (props) =>  <ScreenLogoTitle {...props} /> }} >
        <RootStack.Screen name="Start" component={StartScreen} options={{ title:'welcome', contentStyle: styles }} />
        <RootStack.Screen name="Home" component={HomeScreen} options={{title:'Home', contentStyle: styles }} />
        <RootStack.Screen name="Settings" component={SettingsScreen} options={{title:'Settings', contentStyle: styles, gestureEnabled: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
