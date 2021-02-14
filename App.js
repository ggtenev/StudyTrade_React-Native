import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Nav from "./src/navigation/Navigator";
import firebase from "./src/constants/config";
import Auth from "./src/screens/Auth";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import { decode, encode } from "base-64";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

import reducer from "./src/store/reducer";

const rootReducer = combineReducers({
  reducer: reducer,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

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
    return <Auth />;
  }

  return (
    <Provider store={store}>
      <Nav />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
