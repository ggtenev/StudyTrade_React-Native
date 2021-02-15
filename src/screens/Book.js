import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Colors from "../constants/Colors";
export default function Book({ route, navigation }) {
  const { author, condition,price, key, title, url } = route.params.book;
  console.log(route.params);
  console.log(url);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.upper}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backArrow}
            >
              <Ionicons name='md-arrow-back' size={24} color='black' />
            </TouchableOpacity>
          </View>
          <View style={styles.lower}></View>
          <View style={styles.book}>
            <Image style={styles.image} source={{ uri: url }} />
            <TouchableOpacity style={styles.btn} onPress={() => {navigation.navigate('Checkout')}}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Checkout
              </Text>
            </TouchableOpacity>
            <Text style={{fontSize:22}}>£{price}</Text>
            {/* <TouchableOpacity
              style={{
                ...styles.btn,
                backgroundColor: Colors.grey,
                marginTop: -5,
              }}
              onPress={() => {}}
            >
              <Text style={{ color: "black", fontWeight: "bold" }}>
                Other Methods
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={{margin:10}}>
        <Text style={{fontWeight:'bold',fontSize:18}}>Book Details</Text>
        <Text style={{fontSize:16}}>Title: {title}</Text>
          <Text style={{fontSize:16}}>Author: {author}</Text>
          <Text style={{fontSize:16}}>Condition: {condition}</Text>
        </View>
        <View style={{margin:10}}>
        <Text style={{fontWeight:'bold',fontSize:18}}>Seller Reviews</Text>
        <View style={styles.review}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image style={{height:70,width:70,borderRadius:35}} source={{uri:'https://www.femalefirst.co.uk/image-library/land/500/s/stephanie-hodge-awi-1011.jpg'}} />
          <View style={{marginLeft:8}}>
            <Text style={{fontSize:16}}>Emily Conner</Text>
            <Text style={{fontWeight:'bold'}}>Designer</Text>
          </View>
          </View>
         
          <View style={{flexDirection:'row',marginLeft:70,marginTop:-10}}>
          <Ionicons name="ios-star" size={24} color="#ecf725" />
          <Ionicons name="ios-star" size={24} color="#ecf725" />
          <Ionicons name="ios-star" size={24} color="#ecf725" />
          <Ionicons name="ios-star" size={24} color="white" />
          <Ionicons name="ios-star" size={24} color="white" />
          </View>
          <Text>Excellent book to get you thinking. About half way through. I've had to give up on 1 so far, for which I didn't even understand the solution. It will improve me or dispatch me. </Text>
        </View>
        <View style={styles.review}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image style={{height:70,width:70,borderRadius:35}} source={{uri:'https://www.torchlightinvestors.com/wp-content/uploads/2018/02/ScottBarsky.jpg'}} />
          <View style={{marginLeft:8}}>
            <Text style={{fontSize:16}}>Mark Robinson</Text>
            <Text style={{fontWeight:'bold'}}>Architect</Text>
          </View>
          </View>
         
          <View style={{flexDirection:'row',marginLeft:70,marginTop:-10}}>
          <Ionicons name="ios-star" size={24} color="#ecf725" />
          <Ionicons name="ios-star" size={24} color="#ecf725" />
          <Ionicons name="ios-star" size={24} color="#ecf725" />
          <Ionicons name="ios-star" size={24} color="#ecf725" />
          <Ionicons name="ios-star" size={24} color="#ecf725" />
          <Ionicons name="ios-star" size={24} color="white" />
          <Ionicons name="ios-star" size={24} color="white" />
          </View>
          <Text>Excellent book to get you thinking. About half way through. I've had to give up on 1 so far, for which I didn't even understand the solution. It will improve me or dispatch me. </Text>
        </View>
        <View style={styles.review}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image style={{height:70,width:70,borderRadius:35}} source={{uri:'https://chicagorealtor-12462.kxcdn.com/wp-content/uploads/2019/02/CF_CCIM-Headshots-3.png'}} />
          <View style={{marginLeft:8}}>
            <Text style={{fontSize:16}}>Tom Barsky</Text>
            <Text style={{fontWeight:'bold'}}>Data Analyst</Text>
          </View>
          </View>
         
          <View style={{flexDirection:'row',marginLeft:70,marginTop:-10}}>
          <Ionicons name="ios-star" size={24} color="#ecf725" />
          <Ionicons name="ios-star" size={24} color="#ecf725" />
          <Ionicons name="ios-star" size={24} color="#ecf725" />
          <Ionicons name="ios-star" size={24} color="#ecf725" />
          <Ionicons name="ios-star" size={24} color="white" />
          <Ionicons name="ios-star" size={24} color="white" />
          </View>
          <Text>Excellent book to get you thinking. About half way through. I've had to give up on 1 so far, for which I didn't even understand the solution. It will improve me or dispatch me. </Text>
        </View>
  
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    flex: 1,
    width: "100%",
  },
  backArrow: {
    margin: 10,
    padding: 5,
    backgroundColor: "white",
    width: 35,
    height: 35,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  review:{
    marginTop:15,
    // flexDirection:'row',
 justifyContent:'center'
  },
  upper: {
    height: 120,
    width: "100%",
    backgroundColor: "grey",
  },
  lower: {
    height: 230,
    width: "100%",
    backgroundColor: Colors.grey,
  },
  book: {
    position: "absolute",
    left: "28%",
    top: 10,
    alignItems: "center",
  },
  image: {
    width: 140,
    height: 230,
    marginTop: 10,
    marginHorizontal: 10,
  },
  btn: {
    borderRadius: 25,
    backgroundColor: "blue",
    // paddingVertical:8,
    paddingHorizontal: 25,
    borderColor: "black",
    height: 30,
    borderWidth: 1,
    width: 160,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});
