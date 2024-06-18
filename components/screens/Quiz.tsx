import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import type { StudySphereProps, RootStackParamList, ProfileScreenProps } from "../types";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


import { useState, useEffect } from 'react';
import { firebase } from '../firebaseConfig';

const Quiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        const fetchQuizzes = async () => {
            const quizRef = firebase.firestore().collection('quizzes');
            const snapshot = await quizRef.get();
            const quizzesData = snapshot.docs.map(doc => doc.data());
            setQuizzes(quizzesData);
        };
        fetchQuizzes();
    }, []);

    const handleNextQuestion = () => {
        if (currentQuestion < quizzes.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption('');
        } else {
            alert('Quiz completed!');
        }
    };

    return (
        <View style={styles.container}>
            {quizzes.length > 0 && (
                <>
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}> {quizzes[currentQuestion]?.question }</Text>
                    </View>
                    {quizzes[currentQuestion]?.options.map((option, index) => (
                        <Button
                            key={index}
                            title={option}
                            onPress={() => setSelectedOption(option)}
                            color={selectedOption === option ? 'blue' : 'gray'}
                        />
                    ))}
                    <Button title="Next Question" onPress={handleNextQuestion} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "turquoise",
        alignItems: "center",
        justifyContent: "center",
    },
    questionContainer: {
        backgroundColor: "darkblue",
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    optionStyle: {
        color: "green",
        padding: 5,
        fontSize: 18,
    },

    optionContainer: {
        borderColor: 'black',
        borderWidth: 2,
        marginTop: 15,
    },

    questionText: {
        fontSize: 24,
    } 

});
