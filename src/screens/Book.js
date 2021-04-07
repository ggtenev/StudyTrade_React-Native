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
  const { author, condition,price, key, title, url, isbn } = route.params.book;
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
          <Text style={{fontSize:16}}>ISBN: {isbn}</Text>
        </View>




        <View style={{margin:10}}>
        <Text style={{fontWeight:'bold',fontSize:18}}>Seller Reviews</Text>
        <View style={styles.review}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image style={{height:70,width:70,borderRadius:35}} source={{uri:'https://static.showit.co/1200/eOjZEXZuS9uRmeBymGd_QQ/55058/karissavantassel-headshot2.jpg'}} />
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
          <Text>The seller was lovely, but took a while to respond. We sorted out the payment and I absolutely love the book. It is exactly as described and I can’t wait to begin reading it. </Text>
        </View>
        <View style={styles.review}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image style={{height:70,width:70,borderRadius:35}} source={{uri:'https://www.torchlightinvestors.com/wp-content/uploads/2018/02/ScottBarsky.jpg'}} />
          <View style={{marginLeft:8}}>
            <Text style={{fontSize:16}}>Mark Robinson</Text>
            <Text style={{fontWeight:'bold'}}>Computer Science (BSc), Student</Text>
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
          <Text>Excellent seller and had a great experience with the service. Communication was efficient and effective which aided the transaction process and will be looking forward to reading the book. </Text>
        </View>
        <View style={styles.review}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image style={{height:70,width:70,borderRadius:35}} source={{uri:'https://cdn.shortpixel.ai/spai/w_788+q_lossy+ret_img+to_webp/https://www.colemanphotographix.com/wp-content/uploads/Student-Headshots-027.jpg'}} />
          <View style={{marginLeft:8}}>
            <Text style={{fontSize:16}}>Tom Kewell</Text>
            <Text style={{fontWeight:'bold'}}>Computer Science (BSc), Student</Text>
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
          <Text>Good service experienced with this seller. The book matched the description stated and will be looking out for any other books that is listed by this seller.  </Text>
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
