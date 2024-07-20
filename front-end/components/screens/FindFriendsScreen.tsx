import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { firestoreInstance } from '../Firebase';
import { useNavigation } from '@react-navigation/native';
import { query, where, getDocs, collection } from '@react-native-firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FriendsData = {
  id: string;
  username: string;
}

type ResultsData = {
  results: FriendsData[]
}

type FindFriendsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "FindFriendsScreen">;

export default function FindFriendsScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<FriendsData[]>([]);
  const [friends, setFriends] = useState<FriendsData[]>([]);
  const navigation = useNavigation<FindFriendsScreenNavigationProp>();

  //FETCH USERID
  const getId = async () => {
    try {
        const user_id = await AsyncStorage.getItem("user_id");
        console.log(user_id);
        return user_id;
    } catch (error) {
        console.log("error: " + error);
    }
  }
  const user_id = getId();

  //FETCH FRIEND ID
  const getFriends = async () => {
    try {
      const friendsData: FriendsData[] = [];

      const querySnapshot = await firestoreInstance.collection("User").get();
      querySnapshot.forEach((doc) => {
        friendsData.push({ id: doc.id, ...doc.data() } as FriendsData)
      })
      setFriends(friendsData);
    } catch (error) {
      console.log("ERROR");
    }
    
  };
  getFriends();

  //RENDER
  const renderFriendItem = ({ item }: { item: FriendsData }) => (
    <View style={styles.container}>
      <Text style={styles.container}>{item.username}</Text>
    </View>
  );
   
  //SEARCH FUNCTION
  const searchUsers = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      // Step 1: Fetch the list of friends for the current user
      const friendsRef = firestoreInstance.collection('Users').doc(username as string).collection('Friends');
      const friendsSnapshot = await friendsRef.get();

      // Map over the friend documents to get their IDs
      const friends = friendsSnapshot.docs.map(doc => doc.id);

      // Step 2: Search for users whose names match the search term
      const usersRef = await firestoreInstance.collection('User').get();
      const friendsData : FriendsData[] = [];
      
      usersRef.forEach((doc) => {
        friendsData.push({ id: doc.id, ...doc.data() } as FriendsData)
      });


      // Step 3: Filter out friends from the search results
      //const nonFriends = users.filter(user => !friends.includes(user.id));
      setResults(friendsData);
    } catch (error) {
      console.error('Error searching users: ', error);
    }
  };
  
  // const randomUsers = async () => {
  //   try {
  //     const 
  //   } catch (error) {
  //     console.error('Error loading users', error);
  //   }
  // };
  

  const sendFriendRequest = async () => {
    try {
      // Add friend request to the FriendRequestSent collection of the current user
      const friendRequestSentRef = firestoreInstance
        .collection('Users')
        .doc('user_id')
        .collection('FriendRequestSent')
        .doc('user_id');

      await friendRequestSentRef.set({ requestedAt: new Date() });

      // Add friend request to the FriendRequestReceived collection of the targeted user
      const friendRequestReceivedRef = firestoreInstance
        .collection('Users')
        .doc('user_id')
        .collection('FriendRequestReceived')
        .doc('user_id');

      await friendRequestReceivedRef.set({ receivedAt: new Date() });

      console.log('Friend request sent to:', user_id); 
    } catch (error) {
      console.error('Error sending friend request: ', error);
    }
  };



  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for users"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Search" onPress={searchUsers} />
      <FlatList
        data={results}
        renderItem={({ item } : {item : FriendsData}) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultText}>{item.username}</Text>
            <Button title="+" onPress={() => sendFriendRequest()} />
          </View>
        )}
      />
      <FlatList
        data={friends}
        renderItem={renderFriendItem}
        style={styles.container}
      />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  resultText: {
    fontSize: 16,
    flex: 1,
  },
});
