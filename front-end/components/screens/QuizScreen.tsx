    import React from "react";
    import { Button, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

    import type { RegisterScreenProps, RootStackParamList, ProfileScreenProps } from "../types";
    import { useNavigation } from '@react-navigation/native';
    import { NativeStackNavigationProp } from '@react-navigation/native-stack';
    import styles from "../styles";

    import { useState, useEffect } from 'react';
    //import { firebase } from '../firebaseConfig';

    type QuizData =  {
        answer : string;
        options : string[];
        question : string;
    };

    type QuizScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "QuizScreen">;

    function QuizScreen() {
        const image = {uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp"};
        const navigation = useNavigation<QuizScreenNavigationProp>();

        return (
            <View style={styles.background}>
                <ImageBackground resizeMode="cover" source={image} style={styles.image}>
                    <Text style={styles.brand}> My Quizzes</Text>
                    <Text />

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("NewQuizScreen")}>
                        <Text style={styles.buttonText}>New Quiz</Text>
                    </TouchableOpacity>
                    <Text />

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("QuizMeScreen")}>
                        <Text style={styles.buttonText}>Quiz Me</Text>
                    </TouchableOpacity>
                    <Text />
                    
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("HomeScreen")}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>    
        );
    };

    export default QuizScreen;
