import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PublicFlashcardScreen")}>
          <Text style={styles.buttonText}>Find Flashcards</Text>
        </TouchableOpacity>
        <Text />
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("NewFlashcardScreen")}>
          <Text style={styles.buttonText}>New Flashcard</Text>
        </TouchableOpacity>
        <Text />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SavedFlashcardsScreen")}>
          <Text style={styles.buttonText}>Saved Flashcards</Text>
        </TouchableOpacity>
        <Text />
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("HomeScreen")}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

export default FlashcardMainScreen;
