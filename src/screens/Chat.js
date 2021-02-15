import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

export default function Chat({navigation}) {
  const [messages, setMessages] = useState([]);
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
    setMessages([
      {
        _id: 1,
        text: 'Hi there!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
    messages={messages}
    onSend={messages => onSend(messages)}
    user={{
      _id: 1,
    }}
  />
  );
}

const styles = StyleSheet.create({
  container:{

  }
})