import React from 'react';
import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import styles from "../styles"

type FlashcardMainScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "FlashcardMainScreen">;

function FlashcardMainScreen() {
  const image = {uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp"};
  const navigation = useNavigation<FlashcardMainScreenNavigationProp>();

  return (
    <View style={styles.background}>
      <ImageBackground resizeMode="cover" source={image} style={styles.image}>
        <Text style={styles.brand}> My Flashcards</Text>
        <Text />
        <Button onPress={() => navigation.navigate("NewFlashcardScreen")} title="New Flashcard"/>
        <Text />
        <Button onPress={() => navigation.navigate("MyFlashcardsScreen")} title="Saved Flashcards"/>
        <Text />
        <Button onPress={() => navigation.navigate("HomeScreen")} title="Back" />
      </ImageBackground>
    </View>
  );
}

export default FlashcardMainScreen;
