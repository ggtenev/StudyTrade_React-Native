import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Book() {
  return (
    <View style={styles.container}>
      <Text>Book</Text>
     </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})