import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator,LogBox } from "react-native";
import Nav from "./src/navigation/Navigator";
import firebase from "./src/constants/config";
import Auth from "./src/screens/Auth";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';

import { decode, encode } from "base-64";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
 LogBox.ignoreAllLogs()

import reducer from "./src/store/reducer";

const rootReducer = combineReducers({
  reducer: reducer,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

const loadFonts = () =>Font.loadAsync({
  'Renner': require("./assets/Gotham-Ultra.otf"),
 
});

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  if (!fontsLoaded) {
    return (
      <AppLoading
      onError={() => {}}
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    );
  }

 else {

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color='blue' size='large' />
      </View>
    );
  }

  if (!loggedIn) {
    return <Auth />;
  }

  return (
    <Provider store={store}>
      <Nav />
    </Provider>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
