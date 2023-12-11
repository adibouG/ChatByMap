
import React, {Component} from 'react';

import { 
    Alert, Platform, StyleSheet, Text, View, 
    Button, Pressable, TouchableHighlight, TouchableOpacity, 
    TouchableNativeFeedback, TouchableWithoutFeedback
} from 'react-native';

import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function StyledButton({ label, theme, onPress }) {
  if (theme === "primary") {
    return (
      <View
      style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={onPress}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
        </Pressable>
    </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={onPress} >
          <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
      </View>
  );
}


const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});

const stylesButtonBasic = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    BasicButtonContainer: {
      margin: 20,
    },
    alternativeLayoutButtonContainer: {
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

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

  /*1
export class ButtonBase extends Component {

  _onPressButton() {
    Alert.alert('You tapped the button!');
  }

  _onLongPressButton() {
    Alert.alert('You long-pressed the button!');
  }

  render() {
    
    let {type, text, color, colorTouch} = this.props;
    type = type || 'basic';
    text = text || false;;
    color = color || false;
    colorTouch = colorTouch || false;
    if (type === 'basic')
    {
        return (
          <View style={stylesButtonTouchable.container}>
            <TouchableHighlight onPress={this._onPressButton} underlayColor={colorTouch} >
              <View style={stylesButtonTouchable.button}>
                <Text style={stylesButtonTouchable.buttonText}>{text}</Text>
              </View>
            </TouchableHighlight>
          </View>
        )
    }
    else if (type === 'alert')    <TouchableOpacity onPress={this._onPressButton}>
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
*/
