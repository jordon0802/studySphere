    import React from "react";
    import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

    import type { RegisterScreenProps, RootStackParamList, ProfileScreenProps } from "../types";
    import { useNavigation } from '@react-navigation/native';
    import { NativeStackNavigationProp } from '@react-navigation/native-stack';


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
            <View style={styles.container}>
                {showScore ?
                (
                    <View> 
                        <Text style={styles.optionStyle}> Your Score is: </Text>
                        <Text style={styles.optionStyle}> {score} / {quizData.length} </Text>
                        <Text />
                        <Button onPress={() => handleRestart()} title="Restart" />
                        <Text />
                        <Button onPress={() => navigation.navigate("HomeScreen")} title="Back" />
                    </View>
                ) : (
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}> { quizData[currentQuestion]?.question } </Text>

                        {quizData[currentQuestion]?.options.map((item, index) => {
                            return <TouchableOpacity key={index} onPress={()=> handleAnswer(item)} style={styles.optionContainer}>
                                <Text style={styles.optionStyle}> {item} </Text>
                            </TouchableOpacity>
                        })}

                        <Button title="Back" onPress={() => navigation.goBack()} /> 
                    </View>
                )    
                }
            </View>    
        );
    };

    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
            backgroundColor: "turquoise",
            flex: 1,
            fontWeight: 'bold',
            justifyContent: "center",
            padding: 5,
            textAlign: 'center',
        },
        questionContainer: {
            backgroundColor: "white",
            padding: 10,
            margin: 10,
            borderRadius: 5,
        },
        optionStyle: {
            color: "green",
            padding: 5,
            alignSelf: 'center',
            fontSize: 18,
        },

        optionContainer: {
            //borderColor: 'black',
            borderWidth: 2,
            color: 'darkblue',
            marginTop: 15,
        },

        questionText: {
            fontSize: 24,
        }

    });

    export default QuizScreen;
