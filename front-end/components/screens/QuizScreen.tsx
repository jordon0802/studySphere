    import React from "react";
    import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

    import type { RegisterScreenProps, RootStackParamList, ProfileScreenProps } from "../types";
    import { useNavigation } from '@react-navigation/native';
    import { NativeStackNavigationProp } from '@react-navigation/native-stack';
    import styles from "../styles";

    import { useState, useEffect } from 'react';
    //import { firebase } from '../firebaseConfig';

    type QuizData =  {
        question : string;
        options : string[];
        answer : string;
    };

    type QuizScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "QuizScreen">;

    function QuizScreen() {
        const [currentQuestion, setCurrentQuestion] = useState(0);
        const [score, setScore] = useState(0);
        const [showScore, setShowScore] = useState(false);
        const navigation = useNavigation<QuizScreenNavigationProp>();

        const quizData : QuizData[] = [
            {
                question: "What is the 2 x 2?",
                options: ['2','3','4','5'],
                answer: '4',
            },
            {
                question: "What is the 2 + 2?",
                options: ['2','3','4','5'],
                answer: '4',
            }
        ];

        const handleAnswer = (selectedAnswer: string) => {
            const answer = quizData[currentQuestion]?.answer;

            if(answer === selectedAnswer){
                setScore((prevScore)=> prevScore + 1);
            }

            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < quizData.length) {
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

        return (
            <View style={styles.quizContainer}>
                <Text style={styles.brand}>Quiz</Text>
                {showScore ? (
                    <View> 
                        <Text style={styles.quizOptionStyle}> Your Score is: </Text>
                        <Text style={styles.quizOptionStyle}> {score} / {quizData.length} </Text>
                        <Text />
                        <Button onPress={() => handleRestart()} title="Restart" />
                        <Text />
                        <Button onPress={() => navigation.navigate("HomeScreen")} title="Back" />
                    </View>
                ) : (
                    <View style={styles.quizQuestionContainer}>
                        <Text style={styles.quizQuestionText}> { quizData[currentQuestion].question } </Text>

                        {quizData[currentQuestion].options.map((item, index) => {
                            return <TouchableOpacity key={index} onPress={()=> handleAnswer(item)} style={styles.quizOptionContainer}>
                                <Text style={styles.quizOptionStyle}> {item} </Text>
                            </TouchableOpacity>
                        })}

                        <Button title="Back" onPress={() => navigation.goBack()} /> 
                    </View>
                )}
            </View>    
        );
    };

    export default QuizScreen;
