import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, TextInput, FlatList } from 'react-native';
import Colors from  '../constants/Colors'
import { FontAwesome } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

const BOOKS = [
  {
    id:1,
    title: "The Crown",
    uri:
      "https://www.indiewire.com/wp-content/uploads/2016/09/thecrown_keyart_us.jpg",
  },
  {
    id:2,
    title: "The Hunt for the Yorkshire Ripper",
    uri:
      "https://images.gr-assets.com/books/1389932218l/54171.jpg",
  },
  {
    id:3,
    title: "Captain Tom",
    uri:
      "https://i0.wp.com/cranfieldandmarstonvale.co.uk/wp-content/uploads/2020/05/61d9af69-cc00-4fe8-98eb-a2c792424262.jpg?w=1080&ssl=1",
  },
  {
    id:4,
    title: "The Dark Side Of The Mind",
    uri:
      "https://images-na.ssl-images-amazon.com/images/I/41NSBdax7oL._SY291_BO1,204,203,200_QL40_.jpg",
  },
 
];

const BookCover = ({uri, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{width:110,height:200, marginTop:10,marginHorizontal:10}}>
      <Image style={{width:'100%', height:'100%'}} source={{uri}} />
    </TouchableOpacity>
  )
    
} 

export default function Buy() {
  const [search, setSearch] = useState('')
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <ScrollView contentContainerStyle={styles.container}> */}
       <StatusBar backgroundColor={Colors.blue} />
       <Image style={styles.img} source={require("../../assets/book.png")} />
        <Text style={{ fontSize: 22, fontWeight: "bold", paddingBottom: 60 }}>
          Study Trade
        </Text>
        <View style={styles.input}>
        <FontAwesome name="search" size={24} color="black" />
        <TextInput value={search} style={styles.inputField} onChangeText= {t=>setSearch(t)}/>
        </View>
        <FlatList 
        horizontal={true}
        data={BOOKS}
        keyExtractor = {(item) => item.id}
        renderItem = {({item}) => {
          return (
            <BookCover 
            uri={item.uri}
            />
          )
        }}
        />
        {/* </ScrollView> */}
     </ScrollView>
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
//  marginBottom:20

    // marginBottom: 15,
    // padding: 10,
  },
  input: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.grey,
    marginBottom:30,
    height: 45,
    borderRadius: 25,
    margin: 5,
    width: "75%",
  },
})