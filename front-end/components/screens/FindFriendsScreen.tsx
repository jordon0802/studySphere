import React, { useEffect, useState } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground } from "react-native";
import { firestoreInstance } from "../Firebase";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles";

type UserData = {
  username : string;
};

type userId = {
  user_id: string;

}

type FriendsData = {
  id: string;
  username: string;
};

// type RequestData = {
//   id: string;
//   username: string;
//   requestId: string;
// };

type FindFriendsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "FindFriendsScreen">;

function FindFriendsScreen() {
  const image = {uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp"};
  const [users, setUsers] = useState<UserData[]>([]);
  // const [user_id, setUser_id] = useState<string>("");
  // const [username, setUsername] = useState<string>("");
  const [friends, setFriends] = useState<FriendsData[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<FindFriendsScreenNavigationProp>();

  useEffect(() => {
    fetchData();
  }, []);

  const getCurrentUsername = async (): Promise<string | null> => {
    try {
      const username = await AsyncStorage.getItem("username");
      return username;
    } catch (error) {
      console.log("Error fetching username: ", error);
      return null;
    }
  };

  // const handleUsername = (Username: string | undefined) => {
  //   setUsername(Username as string);
  //   return username;
  // }


  const fetchUser_id = async (username: string): Promise<string | null> => {
    try {
      const userRef = (await firestoreInstance.collection("User").doc(username).get()).data() as userId;
      //setUser_id(userRef.user_id);
      return userRef.user_id;
    } catch (error) {
      console.log("error: " + error);
      return null;
    }
  }

  const fetchFriends = async (currentUsername: string) => {
    try {
      const friendsSnapshot = await firestoreInstance.collection("User").doc(currentUsername).collection("Friends").get();
      const friendsData: FriendsData[] = friendsSnapshot.docs.map(doc => ({
        id: doc.id,
        username: doc.data().username
      }));
      setFriends(friendsData);
    } catch (error) {
      console.log("Error fetching friends: ", error);
    }
  };

  const fetchUsers = async (currentUsername: string) => {
    try {
      const usersSnapshot = await firestoreInstance.collection("User").get();
      const usersData: UserData[] = [];
      usersSnapshot.forEach((doc) => {
        if (doc.id !== currentUsername && !friends.find(friend => friend.username === doc.id)) {
          usersData.push({ username: doc.id });
        }
      });
      setUsers(usersData);
    } catch (error) {
      console.log("Error fetching users: ", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const currentUsername = await getCurrentUsername();
      if (!currentUsername) return;

      await fetchFriends(currentUsername);
      await fetchUsers(currentUsername);
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };


  const sendFriendRequest = async (friendId: string, friendUsername: string) => {
    try {
      const currentUsername = await getCurrentUsername();
      if (!currentUsername) return;

      const currentUser_id = await AsyncStorage.getItem("user_id");
      if (!currentUser_id) return;

      const currentUserRef = firestoreInstance.collection("User").doc(currentUsername);
      const friendUserRef = firestoreInstance.collection("User").doc(friendUsername);

      // Add request to current user
      const requestSentRef = currentUserRef.collection("FriendRequestSent").doc();
      await requestSentRef.set({ id : friendId, username: friendUsername, requestId: requestSentRef.id });

      // Add request to friend user
      const requestReceivedRef = friendUserRef.collection("FriendRequestReceived").doc(requestSentRef.id);
      await requestReceivedRef.set({ id : currentUser_id, username: currentUsername, requestId: requestSentRef.id });

      console.log(`Friend request sent to ${friendUsername}`);
      Alert.alert(`Friend request sent to ${friendUsername}`)
    } catch (error) {
      console.log("Error sending friend request: ", error);
    }
  };

  const renderItem = ({ item }: { item: UserData }) => (
    <View style={customStyles.userItem}>
      <Text style={customStyles.username}>{item.username}</Text>
      <TouchableOpacity
        onPress={async () => {
          const friendId = await fetchUser_id(item.username);
          if (friendId) {
            sendFriendRequest(friendId, item.username);
          }
        }}
        style={customStyles.addButton}
      >
        <Text style={customStyles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.background}>
      <ImageBackground resizeMode="cover" source={image} style={styles.image}>
        <FlatList
          data={users}
          renderItem={renderItem}
        />
        <TouchableOpacity style={styles.button} onPress={() => fetchData}>
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>
        <Text />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("BuddySphereScreen")}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <Text />
      </ImageBackground>
    </View>
  );
}



const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
    backgroundColor: "white",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default FindFriendsScreen;