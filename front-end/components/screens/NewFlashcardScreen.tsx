import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { firestoreInstance } from '../Firebase';
import styles from "../styles"

import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NewFlashcardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "NewFlashcardScreen">;

function NewFlashcardScreen() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const navigation = useNavigation<NewFlashcardScreenNavigationProp>();

  // 2nd collection: user_id
  const collectionRef = firestoreInstance.collection("User").doc("user1").collection("Flashcards")

  const handleSubmit = async () => {
    await collectionRef.add({
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
