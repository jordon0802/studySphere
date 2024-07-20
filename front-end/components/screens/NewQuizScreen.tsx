import React, { useState } from "react"; 
import { Button, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { firestoreInstance } from "../Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

type QuizData =  {
    answer : string; 
    options : string[];
    question : string;
};

type QuizMeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "NewQuizScreen">;

function NewQuizScreen() {
    const image = {uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp"};
    const navigation = useNavigation<QuizMeScreenNavigationProp>();
    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSubmit = async () => {
        if (question == "") { console.log("Question must be filled!"); return; }
        if (answer == "") { console.log("Answer must be filled!"); return; }
        if (option1 == "" || option2 == "") { console.log("Options 1 and 2 must be filled!"); return; }
        // Also verify that exactly one answer is matches the options
        var correctAnswers = 0;
        if (answer == option1) { correctAnswers++; }
        if (answer == option2) { correctAnswers++; }
        if (answer == option3) { correctAnswers++; }
        if (answer == option4) { correctAnswers++; }
        if (correctAnswers > 1) { console.log("Must only have 1 correct answer!"); return; }
        if (correctAnswers < 1) { console.log("Answer must match an option!"); return; }
        const username = await AsyncStorage.getItem("username");
        await firestoreInstance.collection("User").doc(username as string).collection("Quizzes").add({
            question: question,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4,
            answer: answer
        });
        // Reset the form
        setQuestion("");
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");
        setAnswer("");
        navigation.navigate("QuizScreen");
    }

    // Make option of adding options and removing options min. 2, max. 4?
    return (
        <View style={styles.background}>
            <ImageBackground resizeMode="cover" source={image} style={styles.image}>
            <Text style={styles.brand}>New Quiz</Text>
            <Text />
            <TextInput
                onChangeText={setQuestion}
                placeholder="Question (required)"
                value={question}
                style={styles.textInput}
            />
            <Text />
            <TextInput
                onChangeText={setAnswer}
                placeholder="Answer (required)"
                value={answer}
                style={styles.textInput}
            />
            <Text />
            <TextInput
                onChangeText={setOption1}
                placeholder="Option 1 (required)"
                value={option1}
                style={styles.textInput}
            />
            <Text />
            <TextInput
                onChangeText={setOption2}
                placeholder="Option 2 (required)"
                value={option2}
                style={styles.textInput}
            />
            <Text />
            <TextInput
                onChangeText={setOption3}
                placeholder="Option 3"
                value={option3}
                style={styles.textInput}
            />
            <Text />
            <TextInput
                onChangeText={setOption4}
                placeholder="Option 4"
                value={option4}
                style={styles.textInput}
            />
            <Text />
            <Button onPress={() => handleSubmit()} title="Submit"/>
            <Text />
            <Button onPress={() => navigation.navigate("QuizScreen")} title="Back"/>
            </ImageBackground>
        </View>
    )
};

export default NewQuizScreen;