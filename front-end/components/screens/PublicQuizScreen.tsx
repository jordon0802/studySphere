import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Button,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { firestoreInstance } from "../Firebase";
import { RootStackParamList } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles";

type PublicQuizData = {
    id: string;
    answer: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    question: string;
    createdBy: string | null;
};

type PublicQuizScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "PublicQuizScreen"
>;

function PublicQuizScreen() {
    const image = {
        uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp",
    };
    const [publicQuizzes, setPublicQuizzes] = useState<PublicQuizData[]>([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<PublicQuizScreenNavigationProp>();

    useEffect(() => {
        fetchPublicQuizzes();
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

    const fetchUserQuizzes = async (username: string): Promise<string[]> => {
        try {
            const flashcardSnapshot = await firestoreInstance
                .collection("User")
                .doc(username)
                .collection("Quizzes")
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

    const fetchPublicQuizzes = async () => {
        setLoading(true);
        try {
            const currentUsername = await getCurrentUsername();
            if (!currentUsername) return;

            const userQuizzesIds = await fetchUserQuizzes(currentUsername);

            const quizSnapshot = await firestoreInstance
                .collection("PublicQuiz")
                .get();
            const publicQuizData: PublicQuizData[] = [];
            quizSnapshot.forEach((doc) => {
                const quiz = { id: doc.id, ...doc.data() } as PublicQuizData;
                if (
                    quiz.createdBy !== currentUsername &&
                    !userQuizzesIds.includes(quiz.id)
                ) {
                    publicQuizData.push(quiz);
                }
            });
            setPublicQuizzes(publicQuizData);
        } catch (error) {
            console.log("Error Fetching Public Quizzes", error);
        } finally {
            setLoading(false);
        }
    };

    const addQuizToMyQuizzes = async (quiz: PublicQuizData) => {
        try {
            const username = await getCurrentUsername();
            if (!username) return;

            await firestoreInstance
                .collection("User")
                .doc(username)
                .collection("Quizzes")
                .doc(quiz.id)
                .set({
                    question: quiz.question,
                    option1: quiz.option1,
                    option2: quiz.option2,
                    option3: quiz.option3,
                    option4: quiz.option4,
                    answer: quiz.answer,
                    createdBy: username,
                });

            Alert.alert("Quiz added to your quizzes");
        } catch (error) {
            console.log("Error adding quiz to your quizzes: ", error);
        }
    };

    const renderOption1 = (quiz: PublicQuizData) => {
        if (quiz.option1 == "") {
            return;
        }
        if (quiz.option1 == quiz.answer) {
            return <Text style={styles.quizAnswerText}> {quiz.option1} </Text>;
        }
        return <Text style={styles.quizOptionText}> {quiz.option1} </Text>;
    };

    const renderOption2 = (quiz: PublicQuizData) => {
        if (quiz.option2 == "") {
            return;
        }
        if (quiz.option2 == quiz.answer) {
            return <Text style={styles.quizAnswerText}> {quiz.option2} </Text>;
        }
        return <Text style={styles.quizOptionText}> {quiz.option2} </Text>;
    };

    const renderOption3 = (quiz: PublicQuizData) => {
        if (quiz.option3 == "") {
            return;
        }
        if (quiz.option3 == quiz.answer) {
            return <Text style={styles.quizAnswerText}> {quiz.option3} </Text>;
        }
        return <Text style={styles.quizOptionText}> {quiz.option3} </Text>;
    };

    const renderOption4 = (quiz: PublicQuizData) => {
        if (quiz.option4 == "") {
            return;
        }
        if (quiz.option4 == quiz.answer) {
            return <Text style={styles.quizAnswerText}> {quiz.option4} </Text>;
        }
        return <Text style={styles.quizOptionText}> {quiz.option4} </Text>;
    };

    const renderItem = ({ item }: { item: PublicQuizData }) => (
        <View style={styles.quizQuestionContainer}>
            <Text style={styles.quizQuestionText}>{item.question}</Text>
            {renderOption1(item)}
            {renderOption2(item)}
            {renderOption3(item)}
            {renderOption4(item)}
            <TouchableOpacity
                onPress={() => {
                    addQuizToMyQuizzes(item);
                    fetchPublicQuizzes();
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Add to My Quizzes</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.background}>
            <ImageBackground
                resizeMode="cover"
                source={image}
                style={styles.image}
            >
                <Text style={styles.brand}>Find Quizzes</Text>
                <FlatList
                    data={publicQuizzes}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    refreshing={loading}
                    onRefresh={fetchPublicQuizzes}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={fetchPublicQuizzes}
                >
                    <Text style={styles.buttonText}>Refresh</Text>
                </TouchableOpacity>
                <Text />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("QuizScreen")}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <Text />
            </ImageBackground>
        </View>
    );
}

export default PublicQuizScreen;
