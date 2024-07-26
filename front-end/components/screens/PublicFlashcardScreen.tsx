import React, { useEffect, useState } from "react";
import {
    View,
    FlatList,
    Text,
    Button,
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

type FlashcardData = {
    id: string;
    question: string;
    answer: string;
    createdBy: string;
};

type PublicFlashcardScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "PublicFlashcardScreen"
>;

function PublicFlashcardScreen() {
    const image = {
        uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp",
    };
    const [publicFlashcards, setPublicFlashcards] = useState<FlashcardData[]>(
        []
    );
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<PublicFlashcardScreenNavigationProp>();

    useEffect(() => {
        fetchPublicFlashcards();
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

    const fetchUserFlashcards = async (username: string): Promise<string[]> => {
        try {
            const flashcardSnapshot = await firestoreInstance
                .collection("User")
                .doc(username)
                .collection("Flashcards")
                .get();
            const userFlashcardIds = flashcardSnapshot.docs.map(
                (doc) => doc.id
            );
            return userFlashcardIds;
        } catch (error) {
            console.log("Error fetching user flashcards: ", error);
            return [];
        }
    };

    const fetchPublicFlashcards = async () => {
        setLoading(true);
        try {
            const currentUsername = await getCurrentUsername();
            if (!currentUsername) return;

            const userFlashcardIds = await fetchUserFlashcards(currentUsername);

            const flashcardSnapshot = await firestoreInstance
                .collection("PublicFlashcards")
                .get();
            const publicFlashcardData: FlashcardData[] = [];

            flashcardSnapshot.forEach((doc) => {
                const flashcard = {
                    id: doc.id,
                    ...doc.data(),
                } as FlashcardData;
                if (
                    flashcard.createdBy !== currentUsername &&
                    !userFlashcardIds.includes(flashcard.id)
                ) {
                    publicFlashcardData.push(flashcard);
                }
            });
            setPublicFlashcards(publicFlashcardData);
        } catch (error) {
            console.log("Error Fetching Public Flashcards", error);
        } finally {
            setLoading(false);
        }
    };

    const addFlashcardToMyFlashcards = async (flashcard: FlashcardData) => {
        try {
            const username = await getCurrentUsername();
            if (!username) return;

            await firestoreInstance
                .collection("User")
                .doc(username)
                .collection("Flashcards")
                .doc(flashcard.id)
                .set({
                    question: flashcard.question,
                    answer: flashcard.answer,
                    createdBy: flashcard.createdBy,
                });

            Alert.alert("Flashcard added to your flashcards");
        } catch (error) {
            console.log("Error adding flashcard to your flashcards: ", error);
        }
    };

    const renderItem = ({ item }: { item: FlashcardData }) => (
        <View style={styles.flashcardContainer}>
            <View style={styles.quizQuestionContainer}>
                <Text style={styles.textOutput}>Question: {item.question}</Text>
                <Text style={styles.textOutput}>Answer: {item.answer}</Text>
                <Text />
                <TouchableOpacity
                    onPress={() => addFlashcardToMyFlashcards(item)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Add to My Flashcards</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.background}>
            <ImageBackground
                resizeMode="cover"
                source={image}
                style={styles.image}
            >
                <Text style={styles.brand}>Find Flashcards</Text>
                <FlatList
                    data={publicFlashcards}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    refreshing={loading}
                    onRefresh={fetchPublicFlashcards}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={fetchPublicFlashcards}
                >
                    <Text style={styles.buttonText}>Refresh</Text>
                </TouchableOpacity>
                <Text />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("FlashcardMainScreen")}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <Text />
            </ImageBackground>
        </View>
    );
}

const customStyles = StyleSheet.create({
    question: {
        fontSize: 16,
        fontWeight: "bold",
    },
    answer: {
        fontSize: 14,
        marginVertical: 5,
    },
    addButton: {
        backgroundColor: "#007bff",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default PublicFlashcardScreen;
