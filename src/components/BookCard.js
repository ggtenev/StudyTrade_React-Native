import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function Card({ url, title, author, condition, onPress, navigation }) {
  return (
    <View style={styles.container} >
      <Image source={{ uri: url }} style={styles.img} />
      <Text style={styles.title}>{title}</Text>
      <Text style={{ textAlign: "center", fontSize: 17,marginBottom:8 }}>{author}</Text>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',}}>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={{color:'white',fontSize:13}}>Buy Now</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate('Chat')}>
        <Text style={{color:'white',fontSize:13}}>Message</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "40%",
    marginBottom: 20,
  },
  img: {
    width: "100%",
    height: 250,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  btn: {
    borderRadius: 25,
    backgroundColor: 'black',
    // paddingVertical:8,
    paddingHorizontal: 5,
    borderColor: "black",
    height: 35,
    borderWidth: 1,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
  },
});
