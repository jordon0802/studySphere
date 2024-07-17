import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { firestoreInstance } from '../Firebase';

import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NewFlashcardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "NewFlashcardScreen">;

function NewFlashcardScreen() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const navigation = useNavigation<NewFlashcardScreenNavigationProp>();

  const handleOptionChange = (text: string, index: number) => {
    // Creates a copy of options array to "edit"
    const newOptions = [...options];
    // Writes over that copy
    newOptions[index] = text;
    // Write over the original options
    setOptions(newOptions);

  };

  const docRef = firestoreInstance.collection('users').doc('testing')

  const handleSubmit = async () => {
    await docRef.set({
      /*question: question,
      answer: answer,
      options: options,*/
      name: 'bye'
    });
    // Reset the form
    setQuestion('');
    setAnswer('');
    setOptions(['', '', '', '']);
    navigation.navigate('FlashcardMainScreen');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Question"
        value={question}
        onChangeText={setQuestion}
      />
      <TextInput
        style={styles.input}
        placeholder="Answer"
        value={answer}
        onChangeText={setAnswer}
      />
      {options.map((option, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Option ${index + 1}`}
          value={option}
          onChangeText={(text) => handleOptionChange(text, index)}
        />
      ))}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('FlashcardMainScreen')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
  },
  submitButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NewFlashcardScreen;
