import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import firebase, { firestore } from 'firebase'

export default function Conversations({navigation}) {
const [conversations, setConversations] = useState([])
const [names, setName] = useState('')
const [userID, setUserID] = useState()
const uid = firebase.auth().currentUser.uid
  React.useEffect(() => {
    
    firebase.firestore().collection('conversations').where("users", "array-contains", firebase.auth().currentUser.uid)
    .onSnapshot((querySnapshot) => {
      let conv;
      const convos = [];
        querySnapshot.forEach((doc) => {
          
            convos.push(doc.data());
        }); 
        setConversations(convos)
        if(convos.length){
           conv = convos[0]
          
          if(conv.users[0] == uid){
            setUserID(conv.users[1])
            firebase.firestore().collection('users').doc(conv.users[1]).get().then(doc => {
              setName([...names,doc.data().name])
            })
          } else {
            setUserID(conv.users[0])
            firebase.firestore().collection('users').doc(conv.users[0]).get().then(doc => {
              setName([...names,doc.data().name])
            })
          }
        }
       
      
        
    });
  },[navigation])
  
  const mappedConvos = Array.from(new Set(names)).map(name => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Chat',{ userID })} key={String(Math.random())} style={styles.convos}>
        <Image style={{height:44,width:44,borderRadius:25,marginLeft:20}} source={{uri:'https://placeimg.com/140/140/any'}} />
        <Text style={{fontWeight:'bold',fontSize:22,marginLeft:10,color:'blue'}}>{name}</Text>
      </TouchableOpacity>
    )
  })
  return (
    <View style={styles.container}>
     {mappedConvos}
     </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,

  },
  convos:{
    width:'100%',
    height:60,
    borderColor:'grey',
    borderWidth:0.4,
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'row',
    marginTop:5

  }
})