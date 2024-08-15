import React, { useEffect, useState } from "react";
import {
    Button,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

import { firestoreInstance } from "../Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles";

type FlashcardData = {
    id: string;
    question: string;
    answer: string;
};

type MyFlashcardsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "SavedFlashcardsScreen"
>;

function SavedFlashcardsScreen() {
    const image = {
        uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp",
    };
    const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
    const [currentFlashcard, setCurrentFlashcard] = useState(0);
    const [flip, setFlip] = useState(false);

    const navigation = useNavigation<MyFlashcardsScreenNavigationProp>();

    var totalFlashcards = 0;

    const confirmDelete = (id: string) => {
        Alert.alert(
            "Delete Flashcard",
            "Are you sure you want to delete this flashcard?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => deleteFlashcard(id),
                    style: "destructive",
                },
            ],
            { cancelable: true }
        );
    };

    const deleteFlashcard = async (id: string) => {
        try {
            const username = await AsyncStorage.getItem("username");
            const collectionRef = firestoreInstance
                .collection("User")
                .doc(username as string)
                .collection("Flashcards");
            await collectionRef.doc(id).delete();
            totalFlashcards -= 1;
            if (currentFlashcard != 0) {
                setCurrentFlashcard(currentFlashcard - 1);
            }
        } catch (error) {
            console.log("error: " + error);
        }
    };

    const fetchFlashcards = async () => {
        const username = await AsyncStorage.getItem("username");
        const querySnapshot = await firestoreInstance
            .collection("User")
            .doc(username as string)
            .collection("Flashcards")
            .get();
        const flashcardsData: FlashcardData[] = [];

        querySnapshot.forEach((doc) => {
            // "as" => considers doc[i] as FlashcardData type
            flashcardsData.push({ id: doc.id, ...doc.data() } as FlashcardData);
        });
        setFlashcards(flashcardsData);
    };

    // Destructure, specify item is of type FlashcardData
    const renderItem = ({ item }: { item: FlashcardData }) => (
        <View style={styles.flashcardContainer}>
            <TouchableOpacity
                onPress={() => setFlip(!flip)}
                style={styles.flashcard}
            >
                {!flip ? (
                    <Text style={styles.quizQuestionText}>{item.question}</Text>
                ) : (
                    <Text style={styles.quizQuestionText}>{item.answer}</Text>
                )}
            </TouchableOpacity>
        </View>
    );

    const handleNext = () => {
        setFlip(false);
        setCurrentFlashcard(currentFlashcard + 1);
    };

    const handlePrev = () => {
        setFlip(false);
        if (currentFlashcard > 0) {
            setCurrentFlashcard(currentFlashcard - 1);
        }
    };

    useEffect(() => {
        fetchFlashcards();
    });
    totalFlashcards = flashcards.length;

    return (
        <View style={styles.background}>
            <ImageBackground
                resizeMode="cover"
                source={image}
                style={styles.image}
            >
                <Text style={styles.brand}>My Flashcards</Text>
                <Text />
                {currentFlashcard >= totalFlashcards ? (
                    <View>
                        <View style={styles.resultContainer}>
                            <Text style={styles.textOutput}>
                                End of Flashcards!!
                            </Text>
                        </View>
                        <Text />
                        <Button onPress={handlePrev} title="Prev" />
                        <Text />
                    </View>
                ) : (
                    <View>
                        {renderItem({ item: flashcards[currentFlashcard] })}
                        <View style={styles.nextPrevContainer}>
                            <Button onPress={handlePrev} title="Prev" />
                            <Button
                                onPress={() =>
                                    confirmDelete(
                                        flashcards[currentFlashcard].id
                                    )
                                }
                                title="Delete"
                                color="red"
                            />
                            <Button onPress={handleNext} title="Next" />
                        </View>
                        <Text />
                    </View>
                )}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("FlashcardMainScreen")}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

export default SavedFlashcardsScreen;
