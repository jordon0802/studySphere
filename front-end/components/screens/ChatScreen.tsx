
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { firestoreInstance } from '../Firebase';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

//!!Update messages for both friend and my side!!

type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "ChatScreen">;

function ChatScreen() {
  const navigation = useNavigation<ChatScreenNavigationProp>(); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatCollectionRef = firestoreInstance.collection("User").doc("user_id").collection("UserChat");

  const getTwoId = async () => {
    try {
        const username = await AsyncStorage.getItem("username");
        const value = (await firestoreInstance.collection("User").doc(username as string).get()).data();
        const object: {user_id?: string} | undefined = value;
        const user_id = object?.user_id;
        console.log(user_id);
        //setCurrentUserId(user_id || null);
        return user_id;
    } catch (error) {
        console.log("error: " + error);
    }
  }

  
  const currentUserId = getTwoId(); // Replace with actual current user ID


  
}

export default ChatScreen;