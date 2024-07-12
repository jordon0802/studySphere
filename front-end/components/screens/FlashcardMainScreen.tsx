import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type FlashcardMainScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "FlashcardMainScreen">;

function FlashcardMainScreen() {
  const navigation = useNavigation<FlashcardMainScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewFlashcardScreen')}>
        <Text style={styles.buttonText}>New Flashcard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyFlashcardsScreen')}>
        <Text style={styles.buttonText}>My Flashcards</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 20,
    backgroundColor: '#000',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FlashcardMainScreen;
