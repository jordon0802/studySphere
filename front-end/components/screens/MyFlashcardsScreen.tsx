import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import FlashcardScreen from './FlashcardScreen';

type FlashcardData = {
  id: string;
  question: string;
  answer: string;
  options: string[];
};

type MyFlashcardsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "FlashcardScreen">;

function MyFlashcardsScreen() {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const navigation = useNavigation<MyFlashcardsScreenNavigationProp>();

  useEffect(() => {
    const fetchFlashcards = async () => {
      const querySnapshot = await getDocs(collection(db, 'flashcards'));
      const flashcardsData: FlashcardData[] = [];
      querySnapshot.forEach((doc) => {
        flashcardsData.push({ id: doc.id, ...doc.data() } as FlashcardData);
      });
      setFlashcards(flashcardsData);
    };

    fetchFlashcards();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'flashcards', id));
    setFlashcards(flashcards.filter(flashcard => flashcard.id !== id));
  };

  const renderItem = ({ item }: { item: FlashcardData }) => (
    <View style={styles.flashcardContainer}>
      <FlashcardScreen question={item.question} answer={item.answer} options={item.options} />
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={flashcards}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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








