import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { firestoreInstance } from '../Firebase';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FriendsData = {
  id: string;
  username: string;
};


type MyFriendsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "MyFriendsScreen">;

function MyFriendsScreen() {
  const image = {uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp"};
  const getId = async () => {
    try {
        const username = await AsyncStorage.getItem("username");
        const value = (await firestoreInstance.collection("User").doc(username as string).get()).data();
        const object: {user_id?: string} | undefined = value;
        const user_id = object?.user_id;
        //console.log(user_id);
        //setCurrentUserId(user_id || null);
        return user_id;
    } catch (error) {
        console.log("error: " + error);
    }
  }

  const [friends, setFriends] = useState<FriendsData[]>([]);
  const navigation = useNavigation<MyFriendsScreenNavigationProp>();
  //const user_id = getId(); //Current User Id

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    const username = await AsyncStorage.getItem("username");
    const friendsSnapshot = await firestoreInstance.collection("User").doc(username as string).collection("Friends").get();
    const friendsData : FriendsData[] = [];

    friendsSnapshot.forEach((doc) => {
      // "as" => considers doc[i] as FlashcardData type
      friendsData.push({ id: doc.id, ...doc.data() } as FriendsData);
    });
    setFriends(friendsData);
  };

  const startChat = (friendId: string, friendUsername: string) => {
    navigation.navigate('ChatScreen', {friendId, friendUsername});
  };

  const renderItem = ({ item }: { item: FriendsData }) => (
    <TouchableOpacity style={styles.friendItem} onPress={() => startChat(item.id, item.username)}>  
      <View style={styles.textContainer}>
        <Text style={styles.username}>{item.username}</Text>
      </View>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyFriendsScreen;