import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, FlatList, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

import { firebase, firestoreInstance, analyticsInstance } from '../Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//import FlashcardScreen from './FlashcardScreen';

type FlashcardData = {
  id: string;
  question: string;
  answer: string;
};

type MyFlashcardsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "SavedFlashcardsScreen">;

function SavedFlashcardsScreen() {
  const image = {uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp"};
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [flip, setFlip] = useState(false);

  const navigation = useNavigation<MyFlashcardsScreenNavigationProp>();

  var totalFlashcards = 0;

  const confirmDelete = (id: string) => {
    Alert.alert(
      'Delete Flashcard',
      'Are you sure you want to delete this flashcard?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteFlashcard(id),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const deleteFlashcard = async (id: string) => {
    try {
      const username = await AsyncStorage.getItem("username");
      const collectionRef = firestoreInstance.collection("User").doc(username as string).collection("Flashcards");
      await collectionRef.doc(id).delete();
      setCurrentFlashcard(currentFlashcard - 1);
    } catch (error) {
      console.log("error: " + error);
    }
  };

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
        <Text style={styles.brand}>My Flashcards</Text>
        <Text />
        {(currentFlashcard >= totalFlashcards) ? (
        <View>
          <View  style={styles.resultContainer}>
            <Text style={styles.textOutput}>End of Flashcards!!</Text>
          </View>
          <Text />
          <Button onPress={handlePrev} title="Prev"/>
          <Text />
        </ View>
        ) : (
          <View>
            {renderItem({item: flashcards[currentFlashcard]})}
            <View style={styles.nextPrevContainer}>
            <Button onPress={handlePrev} title="Prev"/>
            <Button onPress={() => confirmDelete(flashcards[currentFlashcard].id)} title="Delete" color="red"/>
            <Button onPress={handleNext} title="Next"/>
            </View>
            <Text />
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("FlashcardMainScreen")}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
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
    marginBottom: 10,
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

export default SavedFlashcardsScreen;









