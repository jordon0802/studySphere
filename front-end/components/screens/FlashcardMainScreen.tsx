import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import styles from "../styles"

type FlashcardMainScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "FlashcardMainScreen">;

function FlashcardMainScreen() {
  const navigation = useNavigation<FlashcardMainScreenNavigationProp>();

  return (
    <View style={styles.background}>
      <Text style={styles.brand}>Flashcards</Text>
      <Button onPress={() => navigation.navigate("NewFlashcardScreen")} title="New Flashcard"/>
      <Text />
      <Button onPress={() => navigation.navigate("MyFlashcardsScreen")} title="My Flashcards"/>
      <Text />
      <Button onPress={() => navigation.navigate("HomeScreen")} title="Back" />
    </View>
  );
}

export default FlashcardMainScreen;
