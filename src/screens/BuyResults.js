import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BuyResult() {
  return (
    <View style={styles.container}>
      <Text>Buy Result</Text>
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