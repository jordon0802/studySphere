import React, { useState, useEffect } from "react";
import {
    View,
    FlatList,
    Text,
    TextInput,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import { firestoreInstance } from "../Firebase";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//!!Update messages for both friend and my side!!

type MessageData = {
    id: string;
    senderId: string | null;
    text: string;
    timestamp: Date;
};

type ChatScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "ChatScreen"
>;
type ChatScreenRouteProp = RouteProp<RootStackParamList, "ChatScreen">;

function ChatScreen() {
    const image = {
        uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp",
    };
    const navigation = useNavigation<ChatScreenNavigationProp>();
    const route = useRoute<ChatScreenRouteProp>();
    const { friendUsername } = route.params;
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [newMessage, setNewMessage] = useState("");
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

    const fetchMessages = async (username: string) => {
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
        const messagesData: MessageData[] = [];

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
                    messagesData.push({
                        id: doc.id,
                        ...doc.data(),
                    } as MessageData);
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
        setNewMessage("");

        //FRIEND SIDE
        await firestoreInstance
            .collection("User")
            .doc(friendUsername)
            .collection("UserChats")
            .doc(chatId)
            .collection("Messages")
            .add(messageData);

        setNewMessage("");
    };

    const getChatId = (userId1: string, userId2: string) => {
        return [userId1, userId2].sort().join("_");
    };

    const renderItem = ({ item }: { item: MessageData }) => (
        <View
            style={[
                styles.chatMessageItem,
                item.senderId === currentUsername
                    ? styles.chatMyMessage
                    : styles.chatFriendMessage,
            ]}
        >
            <Text style={styles.quizOptionText}>{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.background}>
            <ImageBackground
                resizeMode="cover"
                source={image}
                style={styles.image}
            >
                <View style={styles.chatTopBanner}>
                    <TouchableOpacity
                        style={styles.chatBackButton}
                        onPress={() => navigation.navigate("MyFriendsScreen")}
                    >
                        <FontAwesome
                            name="arrow-left"
                            size={30}
                            color="black"
                        />
                    </TouchableOpacity>
                    <Text />
                    <Text style={styles.chatName}>{friendUsername}</Text>
                </View>

                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.chatMessagesContainer}
                />
                <View style={styles.chatBottomBanner}>
                    <TextInput
                        style={styles.chatInput}
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholder="Type a message"
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={sendMessage}
                    >
                        <Text style={styles.buttonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

export default ChatScreen;
