import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, FlatList, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

import { firebase, firestoreInstance, analyticsInstance } from '../Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';

//import FlashcardScreen from './FlashcardScreen';

type FlashcardData = {
  id: string;
  question: string;
  answer: string;
};

type MyFlashcardsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "MyFlashcardsScreen">;

function MyFlashcardsScreen() {
  const image = {uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp"};
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [flip, setFlip] = useState(false);

  const navigation = useNavigation<MyFlashcardsScreenNavigationProp>();

  var totalFlashcards = 0;

  const fetchFlashcards = async () => {
    const username = await AsyncStorage.getItem("username");
    const querySnapshot = await firestoreInstance.collection("User").doc(username as string).collection("Flashcards").get();
    const flashcardsData: FlashcardData[] = [];

    querySnapshot.forEach((doc) => {
      // "as" => considers doc[i] as FlashcardData type
      flashcardsData.push({ id: doc.id, ...doc.data() } as FlashcardData);
    });
    setFlashcards(flashcardsData);
  };

  const handleDelete = async (id: string) => {
    const username = await AsyncStorage.getItem("username");
    const collectionRef = firestoreInstance.collection("Users").doc(username as string).collection("Flashcards");
    await collectionRef.doc(id).delete();
  };

  // Destructure, specify item is of type FlashcardData
  const renderItem = ({item}: {item: FlashcardData}) => (
    <View style={customStyles.flashcardContainer}>
      <TouchableOpacity onPress={() => setFlip(!flip)} style={customStyles.card}>
        {!flip ? (
          <Text>{item.question}</Text>
        ) : (
          <Text>{item.answer}</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  const handleNext = () => {
    setFlip(false);
    setCurrentFlashcard(currentFlashcard + 1);
  }

  const handlePrev = () => {
    setFlip(false);
    if (currentFlashcard > 0) {
      setCurrentFlashcard(currentFlashcard - 1);
    }
  }

  useEffect(() => { fetchFlashcards() });
  totalFlashcards = flashcards.length;

  return (
    <View style={styles.background}>
      <ImageBackground resizeMode="cover" source={image} style={styles.image}>
        {(currentFlashcard >= totalFlashcards) ? (
          <View>
            <Text style={styles.brand}>End of Flashcards!!</Text>
            <Text />
          </ View>
        ) : (
          renderItem({item: flashcards[currentFlashcard]})
        )}
        <Button onPress={handleNext} title="Next"/>
        <Text />
        <Button onPress={handlePrev} title="Prev"/>
        <Text />
        <Button onPress={() => navigation.navigate('FlashcardMainScreen')} title="Back"/>
      </ImageBackground>
    </View>
  );
}

const customStyles = StyleSheet.create({
  card: {
    width: '80%',
    aspectRatio: 1.5,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  flashcardContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
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

export default MyFlashcardsScreen;









