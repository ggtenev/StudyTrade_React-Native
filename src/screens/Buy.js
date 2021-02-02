import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TextInput } from 'react-native';
import Colors from  '../constants/Colors'
import { FontAwesome } from '@expo/vector-icons'; 

export default function Buy() {
  const [search, setSearch] = useState('')
  return (
    <View style={styles.container}>
       <StatusBar backgroundColor={Colors.blue} />
       <Image style={styles.img} source={require("../../assets/book.png")} />
        <Text style={{ fontSize: 22, fontWeight: "bold", paddingBottom: 60 }}>
          Study Trade
        </Text>
        <View style={styles.input}>
        <FontAwesome name="search" size={24} color="black" />
        <TextInput value={search} style={styles.inputField} onChangeText= {t=>setSearch(t)}/>
        </View>
        
     </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    // justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
  },
  img:{
    width:90,
    height:90
  },
  inputField: {
    fontSize:18,
flex:1,
 marginLeft:15,

    // marginBottom: 15,
    // padding: 10,
  },
  input: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.grey,
    
    height: 45,
    borderRadius: 25,
    margin: 5,
    width: "75%",
  },
})