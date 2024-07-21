import React, { useEffect,useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { firestoreInstance } from '../Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FriendRequestScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "FindFriendsScreen">;

type FriendRequestData = {
  id: string;
  username: string;
  requestId: string;
};

export default function FriendRequestScreen() {
  const [friendRequests, setFriendRequests] = useState<FriendRequestData[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<FriendRequestScreenNavigationProp>();

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  //FETCH USERID
  const getUsername = async () => {
    try {
        const username = await AsyncStorage.getItem("username");
        return username;
    } catch (error) {
        console.log("error: " + error);
    }
  };

  const fetchFriendRequests = async () => {
    setLoading(true);
    try {
      const username = await AsyncStorage.getItem("username");
      if (!username) return;

      const friendRequestsSnapshot = await firestoreInstance
        .collection('User')
        .doc(username)
        .collection('FriendRequestReceived')
        .get();
      
      const friendRequestData: FriendRequestData[] = friendRequestsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FriendRequestData[];
      setFriendRequests(friendRequestData);

    } catch (error) {
      console.log('Error Fetching FriendRequests', error);
    } finally {
      setLoading(false)
    }
  };

  const acceptFriendRequest = async (friendId: string, friendUsername: string, requestId: string) => {
    try {
      const currentUsername = await getUsername();
      if (!currentUsername) return;

      const currentUserRef = firestoreInstance.collection('User').doc(currentUsername);
      const friendUserRef = firestoreInstance.collection('User').doc(friendUsername);
      const user_id = await AsyncStorage.getItem("user_id");

      //Add each other to Friends collection
      await currentUserRef.collection('Friends').doc(currentUsername).set({ id: friendId, username: friendUsername });
      await friendUserRef.collection('Friends').doc(friendUsername).set({ id : user_id as string ,username: currentUsername });

      //Remove FriendRequestReceived of current user
      await currentUserRef.collection('FriendRequestReceived').doc(requestId).delete();

      //Remove FriendRequestSent of the other user
      await friendUserRef.collection('FriendRequestSent').doc(requestId).delete();

      //Refresh friend requests
      setFriendRequests(friendRequests.filter(request => request.id !== requestId));

      Alert.alert('Friend request accepted');
    } catch (error) {
      console.log("Error accepting friend request: ", error);
    }
  };

  const rejectFriendRequest = async (friendUsername: string, requestId: string) => {
    try {
      const currentUsername = await getUsername();
      if (!currentUsername) return;

      const currentUserRef = firestoreInstance.collection('User').doc(currentUsername);
      const friendUserRef = firestoreInstance.collection('User').doc(friendUsername);

      //Remove FriendRequestReceived of current user
      await currentUserRef.collection('FriendRequestReceived').doc(requestId).delete();

      //Remove FriendRequestSent of the other user
      await friendUserRef.collection('FriendRequestSent').doc(requestId).delete();

      //Refresh friend requests
      setFriendRequests(friendRequests.filter(request => request.id !== requestId));

      Alert.alert('Friend request rejected');
    } catch (error) {
      console.log("Error rejecting friend request: ", error);
    }
  };

  const renderItem = ({ item }: { item: FriendRequestData }) => (
    <View style={styles.friendRequestItem}>
      <Text>{item.username}</Text>
      <Button title="Accept" onPress={() => acceptFriendRequest(item.id, item.username, item.requestId)} />
      <Button title="Reject" onPress={() => rejectFriendRequest(item.username, item.requestId)} />
    </View>
  );

  return (
    <View style={styles.container}>
      {friendRequests.length === 0 ? (
        <View style={styles.noRequestsContainer}>
          <Text>No friend requests</Text>
          <Button title="Find Friends" onPress={() => navigation.navigate("FindFriendsScreen")} />
        </View>
      ) : (
        <FlatList
          data={friendRequests}
          keyExtractor={(item) => item.requestId}
          renderItem={renderItem}
          refreshing={loading}
          onRefresh={fetchFriendRequests}
        />
      )}
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

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
  noRequestsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});