import React, { useState } from "react"; 
import { Alert, Button, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firestoreInstance } from "../Firebase";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type QuizData =  {
    id: string,
    answer: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    question: string;
};

type QuizMeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "QuizMeScreen">;

function QuizMeScreen() {
    const image = {uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp"};
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [quizzes, setQuizzes] = useState<QuizData[]>([]);

    const navigation = useNavigation<QuizMeScreenNavigationProp>();

    const confirmDelete = (id: string) => {
        Alert.alert(
          'Delete Quiz',
          'Are you sure you want to delete this quiz?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => deleteQuiz(id),
              style: 'destructive',
            },
          ],
          { cancelable: true }
        );
      };

    const deleteQuiz = async (id: string) => {
        try {
            const username = await AsyncStorage.getItem("username");
            const collectionRef = firestoreInstance.collection("User").doc(username as string).collection("Quizzes");
            await collectionRef.doc(id).delete();
        } catch (error) {
            console.log("error: " + error);
        };
    };

    const fetchQuiz = async () => {
        try {
            const username = await AsyncStorage.getItem("username");
            const querySnapshot = await firestoreInstance.collection("User").doc(username as string).collection("Quizzes").get();
            const quizData: QuizData[] = [];

            querySnapshot.forEach((doc) => {
                // "as" => considers doc[i] as FlashcardData type
                quizData.push({ id: doc.id, ...doc.data() } as QuizData);
            });
            setQuizzes(quizData);
        } catch (error) {
            console.log("error: " + error);
        }
    };
    fetchQuiz();
    
    const handleAnswer = (selectedAnswer: string) => {
        const answer = quizzes[currentQuestion]?.answer;

        if(answer === selectedAnswer){
            setScore((prevScore)=> prevScore + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizzes.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    }

    const handleRestart = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
    }

    const renderOption1 = ( quiz: QuizData ) => {
        if (quiz.option1 == "") { return; }
        return <TouchableOpacity onPress={()=> handleAnswer(quiz.option1)} style={styles.quizOptionContainer}>
            <Text style={styles.quizOptionStyle}> {quiz.option1} </Text>
        </TouchableOpacity>
    }

    const renderOption2 = ( quiz: QuizData ) => {
        if (quiz.option2 == "") { return; }
        return <TouchableOpacity onPress={()=> handleAnswer(quiz.option2)} style={styles.quizOptionContainer}>
            <Text style={styles.quizOptionStyle}> {quiz.option2} </Text>
        </TouchableOpacity>
    }

    const renderOption3 = ( quiz: QuizData ) => {
        if (quiz.option3 == "") { return; }
        return <TouchableOpacity onPress={()=> handleAnswer(quiz.option3)} style={styles.quizOptionContainer}>
            <Text style={styles.quizOptionStyle}> {quiz.option3} </Text>
        </TouchableOpacity>
    }

    const renderOption4 = ( quiz: QuizData ) => {
        if (quiz.option4 == "") { return; }
        return <TouchableOpacity onPress={()=> handleAnswer(quiz.option4)} style={styles.quizOptionContainer}>
            <Text style={styles.quizOptionStyle}> {quiz.option4} </Text>
        </TouchableOpacity>
    }

    return (
        <View style={styles.background}>
            <ImageBackground resizeMode="cover" source={image} style={styles.image}>
                <Text style={styles.brand}>My Quiz</Text>
                <Text />
                {(quizzes.length <= 0) ? (
                    <View>
                        <Text style={styles.brand}>You have no quizzes yet!</Text>
                    </View>
                ) : showScore ? (
                    <View> 
                        <View style={styles.resultContainer}>
                        <Text style={styles.quizResultStyle}> Your Score is: </Text>
                            <Text style={styles.quizResultStyle}> {score} / {quizzes.length} </Text>
                        </View>
                        <Text />
                        <Button onPress={() => handleRestart()} title="Restart" />
                    </View>
                ) : (quizzes[currentQuestion]) ? (
                    <View>
                        <View style={styles.quizQuestionContainer}>
                            <TouchableOpacity onPress={() => confirmDelete(quizzes[currentQuestion].id)} style={styles.delButton}>
                                <FontAwesome name="close" size={20} color="black"/>
                            </TouchableOpacity>
                            <Text style={styles.quizQuestionText}> { quizzes[currentQuestion].question } </Text>
                            {renderOption1(quizzes[currentQuestion])}
                            {renderOption2(quizzes[currentQuestion])}
                            {renderOption3(quizzes[currentQuestion])}
                            {renderOption4(quizzes[currentQuestion])}
                        </View>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.brand}>You have no quizzes here!</Text>
                    </View>
                )}
                <Text />
                <Button title="Back" onPress={() => navigation.goBack()} />
            </ImageBackground>
        </View>
    );
};

export default QuizMeScreen;