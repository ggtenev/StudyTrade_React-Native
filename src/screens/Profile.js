import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import firebase from "firebase";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";
import MapView, { Marker } from "react-native-maps";
import { Col, Row, Grid } from "react-native-easy-grid";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

let screenHeight = Dimensions.get("window").height;

export default function Profile({ navigation }) {
  const email = useSelector((state) => state.reducer.email);
  const name = useSelector((state) => state.reducer.name);
  const university = useSelector((state) => state.reducer.university);
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Profile",
      height: 120,
      headerStyle: {
        height: 120,
        backgroundColor: "black",
      },
      headerRight: () => {
        return (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => firebase.auth().signOut()}
          >
            <Text style={{ color: "white", fontSize: 13 }}>Sign Out</Text>
          </TouchableOpacity>
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    //Asking user for location permissions
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  if (!location)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' color='grey' />
      </View>
    );
    const data = [
      {key:'Order ID'},
      {key:'Item'},
      {key:'Buy/Sell'},
      {key:'Date'},
      {key:'Condition'},
      {key:'Price'},
      {key:'3455'},
      {key:'Pet Cemetery'},
      {key:'Buy'},
      {key:'13-10-2020'},
      {key:'Used'},
      {key:'8.99'},
      {key:'1125'},
      {key:'The Wall'},
      {key:'Sell'},
      {key:'12-4-2020'},
      {key:'Used'},
      {key:'5.10'},
      {key:'8875'},
      {key:'The Kite Chaser'},
      {key:'Sell'},
      {key:'1-7-2020'},
      {key:'Used'},
      {key:'12.99'},
      {key:'1129'},
      {key:'Sapiens'},
      {key:'Buy'},
      {key:'13-1-2019'},
      {key:'Used'},
      {key:'11.50'},


    ]

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={{ margin: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>
            Personal Details
          </Text>
          <Text style={{ fontSize: 18 }}>{name}</Text>
          <Text style={{ fontSize: 18 }}>Email: {email}</Text>
          <Text style={{ fontSize: 18 }}>University: {university}</Text>
        </View>
        <View style={{ margin: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>
            Location Preference
          </Text>
          {/* Displaying the map */}
          <MapView
            style={styles.mapStyle}
            region={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            />
          </MapView>
        </View>
        <View style={{ margin: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>
            Transaction History
          </Text>
          <FlatList 
          data={data}
          numColumns={6}
          keyExtractor={item => Math.random().toString(12)}
          renderItem={({item}) => {
              return (
                <View style={{backgroundColor:Colors.grey,margin:1,width:'16.66%',justifyContent:'center'}}>
                  <Text style={{fontSize:12,textAlign:'center',fontWeight:'bold'}}>{item.key}</Text>
                </View>
              )
          }}
          />
         
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center',
    backgroundColor: "white",
    // alignItems: "center",
  },
  btn: {
    borderRadius: 25,
    backgroundColor: "black",
    // paddingVertical:8,
    paddingHorizontal: 25,
    borderColor: "white",
    height: 30,
    borderWidth: 1,
    width: 110,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -50,
  },
  mapStyle: {
    width: "99%",
    height: Platform.OS === "ios" ? screenHeight * 0.46 : screenHeight * 0.4,
    // marginBottom:Platform.OS === 'ios' ? 30 : 0
  },
  btn: {
    borderRadius: 25,
    backgroundColor: "black",
    // paddingVertical:8,
    paddingHorizontal: 5,
    borderColor: "white",
    height: 30,
    borderWidth: 1,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
  },
});
