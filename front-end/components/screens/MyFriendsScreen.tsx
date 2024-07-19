import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { firestoreInstance } from '../Firebase';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FriendsData = {
  id: string;
  username: string;
};


type MyFriendsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "MyFriendsScreen">;

export default function MyFriendsScreen() {
  const getId = async () => {
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

  const [friends, setFriends] = useState<FriendsData[]>([]);
  const navigation = useNavigation<MyFriendsScreenNavigationProp>();
  const user_id = getId(); //Current User Id
  const friendCollectionRef = firestoreInstance.collection("User").doc("user_id").collection("Friends");
  //const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const chatCollectionRef = firestoreInstance.collection("User").doc("user_id").collection("UserChat");

  const fetchFlashcards = async () => {
    const querySnapshot = await friendCollectionRef.get();
    const FriendsData : FriendsData[] = [];

    querySnapshot.forEach((doc) => {
      // "as" => considers doc[i] as FlashcardData type
      FriendsData.push({ id: doc.id, ...doc.data() } as FriendsData);
    });
    setFriends(FriendsData);
  };


  return (
    <View style={styles.container}>
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Text>{item.username}</Text>
            <Button title="Chat" onPress={() => navigation.navigate('ChatScreen')} />
          </View>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  friendItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});