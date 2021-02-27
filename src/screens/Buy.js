import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";

const BookCover = ({ uri, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: 110, height: 200, marginTop: 10, marginHorizontal: 10 }}
    >
      <Image style={{ width: "100%", height: "100%" }} source={{ uri }} />
    </TouchableOpacity>
  );
};

export default function Buy({ navigation }) {
  const [search, setSearch] = useState("");
  const [isVerified, setIsverified] = useState(true)
  // const [books, setBooks] = useState( )
  const books = useSelector((state) => state.reducer.storeBooks);
  console.log(books);
  const filteredBooks = books.filter((b) => {
    if (b.title.toLowerCase().includes(search.toLowerCase())) {
      return b;
    }
    if (b.author.toLowerCase().includes(search.toLowerCase())) {
      return b;
    }
    if (String(b.isbn).toLowerCase().includes(search.toLowerCase())) {
      return b;
    }
  });

  

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        if(user.emailVerified) {
          setIsverified(true)
        }
        dispatch(actions.fetchUserStatus(user.uid));
      }
    });
  }, []);

  useEffect(() => {
    dispatch(actions.fetchBooks());
    // const bookZ = useSelector(state => state.reducer.books)
    // setBooks(bookZ)
    return;
  }, []);

  if(!isVerified) {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:22,color:'red', marginBottom:20,textAlign:'center',width:'80%'}}>Please verify you email and sign in again </Text>
        <TouchableOpacity style={styles.btn} onPress={() => firebase.auth().signOut()}>
            <Text style={styles.top}>Sign Out</Text>
          </TouchableOpacity>
      </View>
    )
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <ScrollView contentContainerStyle={styles.container}> */}
      {/* <StatusBar backgroundColor={Colors.blue} /> */}
      <Image style={styles.img} source={require("../../assets/book.png")} />
      <Text style={{ fontSize: 22,  paddingBottom: 10, fontFamily:'Renner' }}>
        Study Trade
      </Text>
      <View style={styles.input}>
        <FontAwesome name='search' size={24} color='black' />
        <TextInput
          value={search}
          style={styles.inputField}
          onChangeText={(t) => setSearch(t)}
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          navigation.navigate("Results", {
            result: filteredBooks,
          })
        }
      >
        <Text style={styles.top}>Search</Text>
      </TouchableOpacity>
      <FlatList
        horizontal={true}
        data={filteredBooks}
        // keyExtractor = {(item) => item.url}
        renderItem={({ item }) => {
          return (
            <BookCover
              // book = {item}
              onPress={() =>
                navigation.navigate("Book", {
                  book: item,
                })
              }
              uri={item.url}
            />
          );
        }}
      />
      {/* </ScrollView> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center',
    alignItems: "center",
    backgroundColor: "white",
  },
  img: {
    width: 90,
    height: 90,
  },
  inputField: {
    fontSize: 18,
    flex: 1,
    marginLeft: 15,
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
    marginBottom: 15,
    height: 45,
    borderRadius: 25,
    margin: 5,
    width: "75%",
  },
  btn: {
    borderRadius: 25,
    backgroundColor: Colors.grey,
    // paddingVertical:8,
    paddingHorizontal: 25,
    borderColor: "black",
    height: 30,
    borderWidth: 1,
    width: 130,
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
