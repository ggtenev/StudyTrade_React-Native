import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Nav from './src/navigation/Navigator'
import firebase from "./src/constants/config";
import Auth from './src/screens/Auth'

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSigned, setIsSigned] = useState(false)

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoaded(true);
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
        setLoaded(true);
      }
    });
  }, []);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color='blue' size='large' />
      </View>
    );
  }

  if (!loggedIn) {
    return (
      <Auth />
     
    );
  }

  return (
    <Nav />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    alignItems: 'center',
    justifyContent: 'center',
  },
});
