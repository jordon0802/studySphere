import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

import { firebase, firestoreInstance, analyticsInstance } from '../Firebase';

//import FlashcardScreen from './FlashcardScreen';

type FlashcardData = {
  id: string;
  question: string;
  answer: string;
};

type MyFlashcardsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "MyFlashcardsScreen">;

function MyFlashcardsScreen() {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [flip, setFlip] = useState(false);

  const navigation = useNavigation<MyFlashcardsScreenNavigationProp>();

  var totalFlashcards = 0;

  const fetchFlashcards = async () => {
    const querySnapshot = await firestoreInstance.collection("User").doc("user1").collection("Flashcards").get();
    const flashcardsData : FlashcardData[] = [];

    querySnapshot.forEach((doc) => {
      // "as" => considers doc[i] as FlashcardData type
      flashcardsData.push({ id: doc.id, ...doc.data() } as FlashcardData);
    });
    setFlashcards(flashcardsData);
  };

  const handleDelete = async (id: string) => {
    const collectionRef = firestoreInstance.collection("Users").doc("user1").collection("Flashcards");
    await collectionRef.doc(id).delete();
  };

  // Destructure, specify item is of type FlashcardData
  const renderItem = ({item}: {item: FlashcardData}) => (
    <View style={styles.flashcardContainer}>
      <TouchableOpacity onPress={() => setFlip(!flip)} style={styles.card}>
        {flip ? (
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

  useEffect(() => { fetchFlashcards() }, []);
  totalFlashcards = flashcards.length;

  return (
    <View style={styles.container}>
      {(currentFlashcard >= totalFlashcards) ? (
        <Text>End of Flashcards!!</Text>
      ) : (
        renderItem({item: flashcards[currentFlashcard]})
      )}
      <Button onPress={handleNext} title="Next"/>
      <Button onPress={handlePrev} title="Prev"/>
      <Button onPress={() => navigation.navigate('FlashcardMainScreen')} title="Back"/>
    </View>
  );
}

const styles = StyleSheet.create({
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









