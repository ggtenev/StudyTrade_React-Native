import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import firebase from 'firebase'

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button  onPress={() => firebase.auth().signOut()} title='Sign out'/>
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