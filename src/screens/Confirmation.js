// ORDER CONFIRMATION SCREEN 

import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";

export default function Confirmation({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/confirmation.png")}
        style={styles.img}
      />
      <Text
        style={{
          textAlign: "center",
          marginBottom: 15,
          fontSize: 22,
          fontWeight: "700",
        }}
      >
        Your order was placed !
      </Text>

      {/* ORDER NUMBER */}
      <Text
        style={{
          textAlign: "center",
          marginBottom: 15,
          fontSize: 18,
          fontWeight: "600",
        }}
      >
        Order number:
      </Text>
      <Text
        style={{
          textAlign: "center",
          marginBottom: 15,
          fontSize: 24,
          fontWeight: "700",
          color: "red",
        }}
      >
        {Math.floor(Math.random() * 10000000)}
      </Text>

      {/* NAVIGATION AWAY AFTER THE ORDER WAS CONFIRMED */}
      <View style={styles.btn}>
        <Button
          title='Continue Shopping'
          color='green'
          onPress={() => navigation.navigate("Buy")}
        />
      </View>
    </View>
  );
}

//STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  img: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },
  btn: {
    width: "88%",
    // height:466,
    marginTop: 10,
    marginLeft: "6%",
    //  justifyContent:'center',
    //  alignItems:'center',
    borderRadius: 22,
    overflow: "hidden",
  },
});