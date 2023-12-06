import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

export default function Input({ placeholder, onSubmitEditing }) {
  const [text, setText] = useState('')

  return (
    <View>
        <TextInput
            style={styles.input}
            value={text}
            placeholder={placeholder}

            onChangeText={(value) => setText(value)}
            onSubmitEditing={() => {
              if (!text) return // Don't submit if empty
            
              onSubmitEditing(text)
              setText('')
            }}
        />
        <Text style={{ fontSize: 24 }}>
            {text}
        </Text>
</View>
  )
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    height: 50,
  },
})
