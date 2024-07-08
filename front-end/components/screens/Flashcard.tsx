import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type FlashcardProps = {
  flashcard: {
    question: string;
    answer: string;
    options: string[];
  };
};

const Flashcard: React.FC<FlashcardProps> = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);

  return (
    <TouchableOpacity style={styles.card} onPress={() => setFlip(!flip)}>
      <View style={[styles.cardContent, flip && styles.flipped]}>
        <View style={styles.front}>
          <Text>{flashcard.question}</Text>
          <View style={styles.flashcardOptions}>
            {flashcard.options.map((option, index) => (
              <Text key={index} style={styles.flashcardOption}>{option}</Text>
            ))}
          </View>
        </View>
        <View style={styles.back}>
          <Text>{flashcard.answer}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

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
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backfaceVisibility: 'hidden',
    position: 'relative',
  },
  front: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 20,
    transform: [{ rotateY: '180deg' }],
  },
  flipped: {
    transform: [{ rotateY: '180deg' }],
  },
  flashcardOptions: {
    marginTop: 10,
  },
  flashcardOption: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 5,
  },
});

export default Flashcard;   




