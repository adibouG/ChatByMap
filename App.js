import React, { Component, useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';

import { 
  Alert, Platform, Text,TextInput, 
  View, SafeAreaView, StyleSheet,
  Button, Pressable, TouchableHighlight, TouchableOpacity, 
  TouchableNativeFeedback, TouchableWithoutFeedback
} from 'react-native';

import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import * as TaskManager from 'expo-task-manager';
import * as ImagePicker from 'expo-image-picker';

import StyledButton from './components/Button';


//import db from './components/DBStore';
import chatSpace from './components/DBStore';

import Map from './components/Map';
import { Chatty } from 'react-native-chatty';



function StartScreen({ navigation, route }) {
  
  const onPress = (e) => navigation.navigate("Home")
  
  return (

    <SafeAreaView style={styles.container}>
      <StyledButton theme="primary" label="Start" onPress={onPress}/>
      <StyledButton label="Settings"  onPress={onPress}/>
    </SafeAreaView>
  );
}

const MessageView = () => {
  return (
    <View style={msgViewStyles.msgViewStyles}>
     
    </View>
  )
}

function HomeScreen({ navigation, route }) {

 
  return (
  <SafeAreaView style={msgViewStyles.container}>
    <Map />
    {/*
     <ChatMsgView />
    */}
   
  </SafeAreaView>
 );
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
} 
});



const ChatMsgView = () => {
  const mess1 = {
    id: 1,
    text: 'Hello',
    me: true,
    createdAt: new Date(),
    user: {
      id: 1,
      username: 'John Doe',
      avatar: { uri: 'https://i.pravatar.cc/300' },
    },
  };

  const [messages, setMessages] = useState([mess1]);
  const text = useRef()

  const onPressSend = (data) => {
    // Implement
    console.log (data)
//     socket.send((da)ta)
  }
  return (
    <View>
     <Chatty
        messages={messages}
        headerProps={
          {
            id: 0,
            username: "Muhammed Kaplan",
            avatar: { uri: "https://i.pravatar.cc/320" },
          }
        }
        footerProps={
          { 
            // To prevent re-rendering, using ref instead of states.
            onChangeText: (_text) => text.current = _text,
            onPressSend
          }
        }
      />
    </View>
  )
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
  const getImage = (s) => ImagePicker.PickImageAsync (s) ;  
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