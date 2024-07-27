import React, { useState } from "react";
import {
    Button,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Switch,
    Alert,
} from "react-native";

import { firestoreInstance } from "../Firebase";
import styles from "../styles";

import { useNavigation } from "@react-navigation/native";
import type { RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NewFlashcardScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "NewFlashcardScreen"
>;

function NewFlashcardScreen() {
    const image = {
        uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp",
    };
    const navigation = useNavigation<NewFlashcardScreenNavigationProp>();
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    const handleSubmit = async () => {
        const username = await AsyncStorage.getItem("username");

        const newFlashcard = {
            question: question,
            answer: answer,
            createdBy: username,
        };

        if (isPublic) {
            await firestoreInstance
                .collection("PublicFlashcards")
                .add(newFlashcard);
        } else {
            await firestoreInstance
                .collection("User")
                .doc(username as string)
                .collection("Flashcards")
                .add(newFlashcard);
        }

        // Reset the form
        setQuestion("");
        setAnswer("");
        setIsPublic(false);
        navigation.navigate("FlashcardMainScreen");
        Alert.alert("Flashcard created successfully");
    };

    return (
        <View style={styles.background}>
            <ImageBackground
                resizeMode="cover"
                source={image}
                style={styles.image}
            >
                <Text style={styles.brand}>New Flashcard</Text>
                <Text />
                <TextInput
                    style={styles.textInput}
                    placeholder="Question"
                    placeholderTextColor={"black"}
                    value={question}
                    onChangeText={setQuestion}
                />
                <Text />

                <TextInput
                    style={styles.textInput}
                    placeholder="Answer"
                    placeholderTextColor={"black"}
                    value={answer}
                    onChangeText={setAnswer}
                />
                <View style={styles.switchContainer}>
                    <Text style={styles.quizOptionText}>Make Public</Text>
                    <Switch value={isPublic} onValueChange={setIsPublic} />
                </View>
                <Text />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <Text />

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

export default NewFlashcardScreen;
