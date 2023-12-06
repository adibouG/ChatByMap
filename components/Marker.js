import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function Marker() {
  return (
    <View style={styles.container}>
      <View style={styles.ronded} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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