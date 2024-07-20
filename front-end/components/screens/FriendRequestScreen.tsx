import React, { useEffect,useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { firestoreInstance } from '../Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FriendRequestScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "FindFriendsScreen">;

type FriendRequestData = {
  id: string;
  name: string;
};

export default function FriendRequestScreen() {
    const [friendRequests, setFriendRequests] = useState<FriendRequestData[]>([]);
    const navigation = useNavigation<FriendRequestScreenNavigationProp>();

    //FETCH USERID
    const getId = async () => {
      try {
          const user_id = await AsyncStorage.getItem("user_id");
          return user_id;
      } catch (error) {
          console.log("error: " + error);
      }
    }
    const user_id = getId();


    useEffect(() => {
        const fetchFriendRequests = async () => {
          const friendRequestsRef = firestoreInstance.collection('Users').doc("username").collection('FriendRequestReceived');
          const snapshot = await friendRequestsRef.get();
          const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FriendRequestData));
          setFriendRequests(requests);
        };
    
        fetchFriendRequests();
      }, []);
    
      const acceptFriendRequest = async () => {
        const currentUserRef = firestoreInstance.collection('users').doc(); //add user_id
        const friendUserRef = firestoreInstance.collection('users').doc(); //friend id
    
        // Add each other to Friends collection
        await currentUserRef.collection('Friends').doc(friendId).set({ name: friendName });
        await friendUserRef.collection('Friends').doc(currentUserId).set({ name: 'YourName' }); // Replace 'YourName' with the actual name
    
        // Remove from FriendRequestReceived of current user
        await currentUserRef.collection('FriendRequestReceived').doc().delete(); // add user id
    
        // Remove from FriendRequestSent of the other user
        await friendUserRef.collection('FriendRequestSent').doc().delete(); //add friend id
    
        // Refresh friend requests
        setFriendRequests(friendRequests.filter(request => request.id !== friendId)); //friendId is added friends id
      };
    
      return (
        <View style={styles.container}>
          <FlatList
            data={friendRequests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.friendRequestItem}>
                <Text>{item.name}</Text>
                <Button title="Accept" onPress={() => acceptFriendRequest()} />
              </View>
            )}
          />
          <Button title="Back" onPress={() => navigation.goBack()} />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      friendRequestItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginVertical: 5,
        width: '100%',
      },
    });
    