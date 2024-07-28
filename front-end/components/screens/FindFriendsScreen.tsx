import React, { useEffect, useState } from "react";
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ImageBackground,
} from "react-native";
import { firestoreInstance } from "../Firebase";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type FriendData = {
    username: string;
};

type FriendRequest = {
    id: string;
    requestId: string;
    username: string;
};

type UserData = {
    username: string;
    dataVector: number[];
};

type UserDoc = {
    user_id: string;
    profilingDone: number;
};

type UserId = {
    user_id: string;
};

type UserProfile = {
    username: string;
    studyPreference: number | null;
    studyFrequency: number | null;
    fieldOfStudy: number[];
    personality: number | null;
    socialPreference: number | null;
    preferredStudyEnvironment: number[];
    preferredStudyTime: number[];
    dataVector: number[];
};

type FindFriendsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "FindFriendsScreen"
>;

function FindFriendsScreen() {
    const image = {
        uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp",
    };
    const [displayedUsers, setDisplayedUsers] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");
    const navigation = useNavigation<FindFriendsScreenNavigationProp>();
    var completeProfileUsers: string[] = [];
    var completeUsersData: UserData[] = [];
    var friendRequests: string[] = [];
    var friends: string[] = [];
    var incompleteProfileUsers: string[] = [];
    var users: string[] = [];

    useEffect(() => {
        getData();
    }, []);

    const getFriends = async () => {
        try {
            const username = (await AsyncStorage.getItem("username")) as string;
            const friendsSnapshot = await firestoreInstance
                .collection("User")
                .doc(username)
                .collection("Friends")
                .get();
            const friendsData: string[] = [];
            friendsSnapshot.docs.forEach((doc) => {
                friendsData.push((doc.data() as FriendData).username);
            });
            friends = friendsData;
            console.log("Friends: ");
            console.log(friends);
        } catch (error) {
            console.log("Error geting friends: ", error);
        } finally {
            console.log("1) getFriends Done");
        }
    };

    const getFriendRequests = async () => {
        try {
            const username = (await AsyncStorage.getItem("username")) as string;
            const docIdSent: string[] = [];
            const docIdRcvd: string[] = [];

            const friendRequestsSent = firestoreInstance
                .collection("User")
                .doc(username)
                .collection("FriendRequestSent");
            const friendRequestsSentDocId = await friendRequestsSent.get();
            friendRequestsSentDocId.forEach((doc) => {
                docIdSent.push(doc.id);
            });
            const sentLen = docIdSent.length;
            for (var i = 0; i < sentLen; i++) {
                const friendRequestsSentDoc = (
                    await friendRequestsSent.doc(docIdSent[i]).get()
                ).data() as FriendRequest;
                if (!friendRequests.includes(friendRequestsSentDoc.username)) {
                    friendRequests.push(friendRequestsSentDoc.username);
                }
            }

            const friendRequestsRcvd = firestoreInstance
                .collection("User")
                .doc(username)
                .collection("FriendRequestReceived");
            const friendRequestsRcvdDocId = await friendRequestsRcvd.get();
            friendRequestsRcvdDocId.forEach((doc) => {
                docIdRcvd.push(doc.id);
            });
            const rcvdLen = docIdRcvd.length;
            for (var i = 0; i < rcvdLen; i++) {
                const friendRequestsRcvdDoc = (
                    await friendRequestsRcvd.doc(docIdRcvd[i]).get()
                ).data() as FriendRequest;
                if (!friendRequests.includes(friendRequestsRcvdDoc.username)) {
                    friendRequests.push(friendRequestsRcvdDoc.username);
                }
            }
        } catch (error) {
            console.log("error: " + error);
        }
    };

    const getUsers = async () => {
        try {
            const username = await AsyncStorage.getItem("username");
            const usersSnapshot = await firestoreInstance
                .collection("User")
                .get();
            const friendLen = friends.length;
            const friendReqLen = friendRequests.length;
            console.log("friendlen = " + friendLen);
            usersSnapshot.forEach((doc) => {
                var isFriend: boolean = false;
                var isFriendRequest: boolean = false;
                for (var i = 0; i < friendLen; i++) {
                    if (friends[i] == doc.id) {
                        isFriend = true;
                        break;
                    } else {
                        isFriend = false;
                    }
                }
                for (var i = 0; i < friendReqLen; i++) {
                    if (friendRequests[i] == doc.id) {
                        isFriendRequest = true;
                        break;
                    } else {
                        isFriendRequest = false;
                    }
                }
                if (doc.id !== username && !isFriend && !isFriendRequest) {
                    users.push(doc.id);
                    console.log("pushing: " + doc.id);
                }
            });
        } catch (error) {
            console.log("Error geting users: ", error);
        } finally {
            console.log("2) getUsers Done");
        }
    };

    const filter = async (users: string[]) => {
        const len = users.length;
        try {
            for (var i = 0; i < len; i++) {
                const userRef = (
                    await firestoreInstance
                        .collection("User")
                        .doc(users[i])
                        .get()
                ).data() as UserDoc;
                if (userRef.profilingDone == 1) {
                    console.log(users[i] + " profile complete");
                    completeProfileUsers.push(users[i]);
                } else {
                    console.log(users[i] + " profile incomplete");
                    incompleteProfileUsers.push(users[i]);
                }
            }
        } catch (error) {
            console.log("ERROR: " + error);
        } finally {
            console.log("3) filter Done");
        }
    };

    const getCompleteProfileUsersData = async () => {
        const len = completeProfileUsers.length;
        try {
            for (var i = 0; i < len; i++) {
                const docId = [completeProfileUsers[i], "ProfileData"].join(
                    "_"
                );
                const userRef = firestoreInstance
                    .collection("User")
                    .doc(completeProfileUsers[i]);
                const userProfile = (
                    await userRef.collection("Profiling").doc(docId).get()
                ).data() as UserProfile;
                const currentUsersData: UserData[] = completeUsersData;
                completeUsersData.push({
                    username: completeProfileUsers[i],
                    dataVector: userProfile.dataVector,
                });
            }
        } catch (error) {
            console.log("ERROR: " + error);
        } finally {
            console.log("4) getCompleteProfileUsersData Done");
        }
    };

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            setToken(token as string);
        } catch (error) {
            console.log("error: " + error);
        }
    };

    const sendUserDataToBackend = async () => {
        try {
            const username = (await AsyncStorage.getItem("username")) as string;
            const docId = [username, "ProfileData"].join("_");
            const userRef = firestoreInstance.collection("User").doc(username);
            const userProfile = (
                await userRef.collection("Profiling").doc(docId).get()
            ).data() as UserProfile;
            const currentUserData: UserData = {
                username: username,
                dataVector: userProfile.dataVector,
            };

            const allUsersData = completeUsersData;

            let data = JSON.stringify({
                currentUserData: currentUserData,
                allUsersData: allUsersData,
            });

            getToken();
            console.log(token);

            const response = await axios.post(
                "http://180.129.93.209:9080/api/calculate-similarity",
                data,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status == 200) {
                const sortedUsernames: string[] = [];

                response.data.forEach((item: string) => {
                    sortedUsernames.push(item);
                });
                users = sortedUsernames;
            }
        } catch (error) {
            console.error("Error calculating similarity:", error);
        } finally {
            console.log("5) sendUserDataToBackend Done");
        }
    };

    const getUser_id = async (username: string): Promise<string | null> => {
        try {
            const userRef = (
                await firestoreInstance.collection("User").doc(username).get()
            ).data() as UserId;
            return userRef.user_id;
        } catch (error) {
            console.log("error: " + error);
            return null;
        }
    };

    const sendFriendRequest = async (
        friendId: string,
        friendUsername: string
    ) => {
        try {
            const currentUsername = await AsyncStorage.getItem("username");
            if (!currentUsername) return;

            const currentUser_id = await AsyncStorage.getItem("user_id");
            if (!currentUser_id) return;

            const currentUserRef = firestoreInstance
                .collection("User")
                .doc(currentUsername);
            const friendUserRef = firestoreInstance
                .collection("User")
                .doc(friendUsername);

            // Add request to current user
            const requestSentRef = currentUserRef
                .collection("FriendRequestSent")
                .doc();
            await requestSentRef.set({
                id: friendId,
                username: friendUsername,
                requestId: requestSentRef.id,
            });

            // Add request to friend user
            const requestReceivedRef = friendUserRef
                .collection("FriendRequestReceived")
                .doc(requestSentRef.id);
            await requestReceivedRef.set({
                id: currentUser_id,
                username: currentUsername,
                requestId: requestSentRef.id,
            });

            getData();

            console.log(`Friend request sent to ${friendUsername}`);
            Alert.alert(`Friend request sent to ${friendUsername}`);
        } catch (error) {
            console.log("Error sending friend request: ", error);
        }
    };

    const renderItem = ({ item }: { item: string }) => (
        <View style={styles.friendContainer}>
            <Text style={styles.usernameText}>{item}</Text>
            <TouchableOpacity
                onPress={async () => {
                    const friendId = await getUser_id(item);
                    if (friendId) {
                        sendFriendRequest(friendId, item);
                    }
                }}
            >
                <FontAwesome name="plus" size={20} color="black" />
            </TouchableOpacity>
        </View>
    );

    const getData = async () => {
        setLoading(true);
        try {
            await getFriends();
            await getFriendRequests();
            await getUsers();
            await filter(users);
            await getCompleteProfileUsersData();
            await sendUserDataToBackend();
            users.push(...incompleteProfileUsers);
            setDisplayedUsers(users);
        } catch (error) {
            console.log("error: " + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.background}>
            <ImageBackground
                resizeMode="cover"
                source={image}
                style={styles.image}
            >
                <Text style={styles.brand}>Find Friends</Text>
                <Text />
                <FlatList
                    data={displayedUsers}
                    refreshing={loading}
                    renderItem={renderItem}
                    onRefresh={getData}
                    style={styles.friendListContainer}
                />
                <TouchableOpacity style={styles.button} onPress={getData}>
                    <Text style={styles.buttonText}>Refresh</Text>
                </TouchableOpacity>
                <Text />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("BuddySphereScreen")}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <Text />
            </ImageBackground>
        </View>
    );
}

export default FindFriendsScreen;
