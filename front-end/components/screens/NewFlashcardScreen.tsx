import React, { useState } from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';

import { firestoreInstance } from '../Firebase';
import styles from "../styles"

import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NewFlashcardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "NewFlashcardScreen">;

function NewFlashcardScreen() {
  const image = {uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp"};
  const navigation = useNavigation<NewFlashcardScreenNavigationProp>();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async () => {
    const username = await AsyncStorage.getItem("username");
    await firestoreInstance.collection("User").doc(username as string).collection("Flashcards").add({
      question: question,
      answer: answer
    });
    // Reset the form
    setQuestion('');
    setAnswer('');
    navigation.navigate("FlashcardMainScreen");
  };

  return (
    <View style={styles.background}>
      <ImageBackground resizeMode="cover" source={image} style={styles.image}>
        <Text style={styles.brand}>New Flashcard</Text>
        <Text />
        <TextInput
          style={styles.textInput}
          placeholder="Question"
          value={question}
          onChangeText={setQuestion}
        />
        <Text />
        <TextInput
          style={styles.textInput}
          placeholder="Answer"
          value={answer}
          onChangeText={setAnswer}
        />
        <Text />
        <Button onPress={handleSubmit} title="Submit"/>
        <Text />
        <Button onPress={() => navigation.navigate("FlashcardMainScreen")} title="Back"/>
      </ImageBackground>
    </View>
  );
}

export default NewFlashcardScreen;
