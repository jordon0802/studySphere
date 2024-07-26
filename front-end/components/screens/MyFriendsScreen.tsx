import React, { useState, useEffect } from "react";
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import { firestoreInstance } from "../Firebase";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles";

type FriendsData = {
    id: string;
    username: string;
};

type MyFriendsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "MyFriendsScreen"
>;

function MyFriendsScreen() {
    const image = {
        uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp",
    };
    const getId = async () => {
        try {
            const username = await AsyncStorage.getItem("username");
            const value = (
                await firestoreInstance
                    .collection("User")
                    .doc(username as string)
                    .get()
            ).data();
            const object: { user_id?: string } | undefined = value;
            const user_id = object?.user_id;
            return user_id;
        } catch (error) {
            console.log("error: " + error);
        }
    };

    const [friends, setFriends] = useState<FriendsData[]>([]);
    const navigation = useNavigation<MyFriendsScreenNavigationProp>();

    useEffect(() => {
        fetchFriends();
    }, []);

    const fetchFriends = async () => {
        const username = await AsyncStorage.getItem("username");
        const friendsSnapshot = await firestoreInstance
            .collection("User")
            .doc(username as string)
            .collection("Friends")
            .get();
        const friendsData: FriendsData[] = [];

        friendsSnapshot.forEach((doc) => {
            // "as" => considers doc[i] as FlashcardData type
            friendsData.push({ id: doc.id, ...doc.data() } as FriendsData);
        });
        setFriends(friendsData);
    };

    const startChat = (friendId: string, friendUsername: string) => {
        navigation.navigate("ChatScreen", { friendId, friendUsername });
    };

    const renderItem = ({ item }: { item: FriendsData }) => (
        <TouchableOpacity
            style={styles.quizQuestionContainer}
            onPress={() => startChat(item.id, item.username)}
        >
            <Text style={styles.quizQuestionText}>{item.username}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.background}>
            <ImageBackground
                resizeMode="cover"
                source={image}
                style={styles.image}
            >
                <Text style={styles.brand}>My Friends</Text>
                <Text />
                <FlatList
                    data={friends}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
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

const customStyles = StyleSheet.create({
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
        fontWeight: "bold",
    },
});

export default MyFriendsScreen;
