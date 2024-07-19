import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { firestoreInstance } from '../Firebase';
import styles from "../styles"

import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NewFlashcardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "NewFlashcardScreen">;

function NewFlashcardScreen() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const navigation = useNavigation<NewFlashcardScreenNavigationProp>();

  const handleSubmit = async () => {
    const username = await AsyncStorage.getItem("username");
    const collectionRef =  await firestoreInstance.collection("User").doc(username as string).collection("Flashcards").add({
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
      <TextInput
        style={customStyles.input}
        placeholder="Question"
        value={question}
        onChangeText={setQuestion}
      />
      <TextInput
        style={customStyles.input}
        placeholder="Answer"
        value={answer}
        onChangeText={setAnswer}
      />
      <Button onPress={handleSubmit} title="Submit"/>
      <Text />
      <Button onPress={() => navigation.navigate("FlashcardMainScreen")} title="Back"/>
    </View>
  );
}

const customStyles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    width: '100%',
  }
});

export default NewFlashcardScreen;
