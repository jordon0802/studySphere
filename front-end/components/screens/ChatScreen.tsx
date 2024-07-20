
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button, StyleSheet, TextInput } from 'react-native';
import { firestoreInstance } from '../Firebase';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

//!!Update messages for both friend and my side!!

type MessageData = {
  id: string;
  senderId: string | null;
  text: string;
  timestamp: any;
};

type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "ChatScreen">;
type ChatScreenRouteProp = RouteProp<RootStackParamList, "ChatScreen">;

export default function ChatScreen() {
  const navigation = useNavigation<ChatScreenNavigationProp>(); 
  const route = useRoute<ChatScreenRouteProp>();
  const { friendUsername } = route.params;
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      const username = await AsyncStorage.getItem("username");
      setCurrentUsername(username);
      if (username) {
        fetchMessages(username);
        subscribeToMessages(username);
      }
    };
    fetchCurrentUserId();
  }, []);

  const fetchMessages = async (username : string) => {
    //const username = await AsyncStorage.getItem("username");
    const chatId = getChatId(username, friendUsername);
    const messagesSnapshot = await firestoreInstance
      .collection("User")
      .doc(username)
      .collection("UserChats")
      .doc(chatId)
      .collection("Messages")
      .orderBy("timestamp")
      .get();
    const messagesData : MessageData[] = [];

    messagesSnapshot.forEach((doc) => {
      messagesData.push({ id: doc.id, ...doc.data() } as MessageData);
    });
    setMessages(messagesData);
  };

  const subscribeToMessages = (username: string) => {
    const chatId = getChatId(username, friendUsername);
    return firestoreInstance
      .collection("User")
      .doc(username)
      .collection("UserChats")
      .doc(chatId)
      .collection("Messages")
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        const messagesData: MessageData[] = [];
        snapshot.forEach((doc) => {
          messagesData.push({ id: doc.id, ...doc.data() } as MessageData);
        });
        setMessages(messagesData);
      });
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentUsername) return;
    const chatId = getChatId(currentUsername, friendUsername);
    const messageData = {
      senderId: currentUsername,
      text: newMessage,
      timestamp: new Date(),
    };
    //USER SIDE
    await firestoreInstance
      .collection("User")
      .doc(currentUsername)
      .collection("UserChats")
      .doc(chatId)
      .collection("Messages")
      .add(messageData);
    setNewMessage('');

    //FRIEND SIDE
    await firestoreInstance
      .collection("User")
      .doc(friendUsername)
      .collection("UserChats")
      .doc(chatId)
      .collection("Messages")
      .add(messageData);

    setNewMessage('');
  };

  const getChatId = (userId1: string, userId2: string) => {
    return [userId1, userId2].sort().join('_');
  };

  const renderItem = ({ item }: { item: MessageData }) => (
    <View style={[styles.messageItem, item.senderId === currentUsername ? styles.myMessage : styles.friendMessage]}>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Text style={styles.header}>Chat with {friendUsername}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.messagesContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageItem: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  friendMessage: {
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});