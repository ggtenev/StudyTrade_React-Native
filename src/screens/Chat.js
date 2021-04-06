import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import firebase, { firestore } from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Chat({navigation,route}) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [receiverEmail, setReceiver] = useState();
  const [conversations, setConversations] = useState([])
  const userID = route.params.userID
  // const conversations = route.params.conversations
  // const messageID = conversations[0].user['_id'] === firebase.auth().currentUser.uid ? 1 : 2
  // console.log(userID)
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Contact Seller",
      height: 120,
      headerStyle: {
        height: 70,
        backgroundColor: "white",
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
        elevation: 0,
      },
    });
  }, [navigation]);


  useEffect(() => {
    const convRef = firebase.firestore().collection('conversations')
    if(convRef){
      firebase.firestore().collection('conversations').where("users", "array-contains", firebase.auth().currentUser.uid)
      .onSnapshot((querySnapshot) => {
        const convos = [];
        let sortedConvos = []
        console.log('MESSAGE SENT')
          querySnapshot.forEach( async (doc) => {
            // console.log(doc.data().createdAt.seconds)
              convos.push(doc.data());
              if(convos.length > 1) {
              sortedConvos =  convos.sort(function(a, b){return a.createdAt.seconds-b.createdAt.seconds});
              }
          });
        
          setConversations(sortedConvos)
          // const conv = convos[0]
          // setUserID(conv.users[0])
          // if(conv.users[0] == uid){
          //   firebase.firestore().collection('users').doc(conv.users[1]).get().then(doc => {
          //     setName(doc.data().name)
          //   })
          // } else {
          //   firebase.firestore().collection('users').doc(conv.users[0]).get().then(doc => {
          //     setName(doc.data().name)
          //   })
          // }
      }) 
    }
    
    
   

    setMessages(
      conversations
    //   [
    //   {
    //     _id: 1,
    //     text: 'Hi there!',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
     
     
    // ]
    )
    return
  }, [])

  const onSend = () => {

  
    // firebase.firestore().collection('users').doc(userID).get().then(docRef)
    firebase.firestore().collection('conversations').add({
      id:new Date(),
      createdAt:firebase.firestore.FieldValue.serverTimestamp(),
      users:[userID,firebase.auth().currentUser.uid],
      user: {
        _id: firebase.auth().currentUser.uid, 
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
      // user_1:userID,
      // user_2:firebase.auth().currentUser.uid,
      text,
      // emailSender:firebase.auth().currentUser.email,
      // emailReceiver:receiverEmail 

    })
    setText('')
    // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }

  const mess = conversations.map(c => {
  
    return (
      <View key={Math.random()} style={{width:'100%', alignItems:c['user']['_id'] === firebase.auth().currentUser.uid ? 'flex-end' : 'flex-start'}}>
      <View style={{backgroundColor: c['user']['_id'] === firebase.auth().currentUser.uid ? '#0b9ae8' : 'grey', padding:10,marginVertical:5,width:'40%',borderRadius:10,alignContent:'flex-end'}}>
        <Text style={{color:'white'}}>{c.text}</Text>
        {/* <Text style={{color:'white',fontSize:13}}>{new Date(c.createdAt)}</Text> */}
      </View>
      </View>
    )
  }) 

  return (
  //   <GiftedChat
  //   messages={messages}
  //   onSend={messages => onSend(messages)}
  //   user={{
  //     _id: 1,
  //   }}
  // />
  <View style={styles.container}>
    <ScrollView contentContainerStyle={{paddingBottom:60,paddingHorizontal:10}}>
    {mess}
    </ScrollView>
   
    <View style={{backgroundColor:'white',position:'absolute',bottom:2,flexDirection:'row',alignItems:'center',width:'100%',borderColor:'grey',borderWidth:0.3}}>
    <TextInput placeholder='Your message' style={{paddingHorizontal:7,width:'88%',height:44}} value={text} onChangeText={t => setText(t)} />
    <TouchableOpacity onPress={onSend}>
      <Text style={{color:'blue'}}>Send</Text>
    </TouchableOpacity>
    </View>
    
  </View>
  );
}

const styles = StyleSheet.create({
  container:{
    height:'100%',
    // flex:1,
    // paddingHorizontal:20
  }
})