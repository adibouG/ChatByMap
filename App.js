import React, {Component} from 'react';
import { StatusBar, ExpoStatusBar } from 'expo-status-bar';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { 
  Alert, Button, Platform, StyleSheet,
  Text, View, TouchableHighlight, TouchableOpacity,
  TouchableNativeFeedback, TouchableWithoutFeedback 
} from 'react-native';


/*

export class ButtonBasics extends Component {
  _onPressButton() {
    Alert.alert('You tapped the button!');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button onPress={this._onPressButton} title="Press Me" />
        </View>
        <View style={stylesButtonBasic.buttonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Press Me"
            color="#841584"
          />
        </View>
        <View style={stylesButtonBasic.alternativeLayoutButtonContainer}>
          <Button onPress={this._onPressButton} title="This looks great!" />
          <Button onPress={this._onPressButton} title="OK!" color="#841584" />
        </View>
      </View>
    );
  }
}

const stylesButtonBasic = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20,
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});


export class Touchables extends Component {
  _onPressButton() {
    Alert.alert('You tapped the button!');
  }

  _onLongPressButton() {
    Alert.alert('You long-pressed the button!');
  }

  render() {
    return (
      <View style={stylesButtonTouchable.container}>
        <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
          <View style={stylesButtonTouchable.button}>
            <Text style={stylesButtonTouchable.buttonText}>TouchableHighlight</Text>
          </View>
        </TouchableHighlight>
        <TouchableOpacity onPress={this._onPressButton}>
          <View style={stylesButtonTouchable.button}>
            <Text style={stylesButtonTouchable.buttonText}>TouchableOpacity</Text>
          </View>
        </TouchableOpacity>
        <TouchableNativeFeedback
          onPress={this._onPressButton}
          background={
            Platform.OS === 'android'
              ? TouchableNativeFeedback.SelectableBackground()
              : undefined
          }>
          <View style={stylesButtonTouchable.button}>
            <Text style={stylesButtonTouchable.buttonText}>
              TouchableNativeFeedback{' '}
              {Platform.OS !== 'android' ? Platform.OS : ''}
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableWithoutFeedback onPress={this._onPressButton}>
          <View style={stylesButtonTouchable.button}>
            <Text style={stylesButtonTouchable.buttonText}>TouchableWithoutFeedback</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableHighlight
          onPress={this._onPressButton}
          onLongPress={this._onLongPressButton}
          underlayColor="white">
          <View style={stylesButtonTouchable.button}>
            <Text style={stylesButtonTouchable.buttonText}>Touchable with Long Press</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const stylesButtonTouchable = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
  },
});
*/

const ScreenTemplate = (props) => {

  
  /*
  return (
    <View style={styles.container}>
        <StatusBar />
      {{
        (props) =>  <HomeBase {...props}.component 
      }}
    </View>
  )*/
}


function HomeBase({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text>Hom Scren</Text>
      <View>
        <TouchableHighlight underlayColor="white">
          <Text>Start</Text>
        </TouchableHighlight>
      </View>
    
    </View>
  );
}

const HomeScreen = (props) => <ScreenTemplate {...props}  component={<HomeBase {...props} /> } />


const RootStack = createNativeStackNavigator() ;

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator id={1} screenOptions={{ headerTitle: (props) =>  <StatusBar />  }} >
        <RootStack.Screen name="home" component={HomeBase} options={{title:'welcome', contentStyle: styles }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
position: 'relative',
    flex: 1,
    backgroundColor: '#0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
