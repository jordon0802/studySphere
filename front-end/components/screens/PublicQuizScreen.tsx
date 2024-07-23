import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { firestoreInstance } from "../Firebase";
import { RootStackParamList } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type PublicQuizData = {
  id: string,
  answer: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  question: string;
  createdBy : string | null;
};



type PublicQuizScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "PublicQuizScreen">;

export default function PublicQuizScreen() {
  const [publicQuizzes, setPublicQuizzes] = useState<PublicQuizData[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<PublicQuizScreenNavigationProp>();

  useEffect(() => {
      fetchPublicQuizzes();
  }, []);

  const getCurrentUsername = async (): Promise<string | null> => {
      try {
        const username = await AsyncStorage.getItem("username");
        return username;
      } catch (error) {
        console.log("Error fetching username: ", error);
        return null;
      }
    };

  const fetchUserQuizzes = async (username: string): Promise<string[]> => {
    try {
      const flashcardSnapshot = await firestoreInstance.collection("User").doc(username).collection("Quizzes").get();
      const userFlashcardIds = flashcardSnapshot.docs.map(doc => doc.id);
      return userFlashcardIds;
    } catch (error) {
      console.log("Error fetching user flashcards: ", error);
      return [];
    }
  };

  const fetchPublicQuizzes = async () => {
      setLoading(true);
      try {
          const currentUsername = await getCurrentUsername();
          if (!currentUsername) return;

          const userQuizzesIds = await fetchUserQuizzes(currentUsername);

          const quizSnapshot = await firestoreInstance.collection("PublicQuiz").get();
          const publicQuizData: PublicQuizData[] = [];
          quizSnapshot.forEach((doc) => {
              const quiz = { id: doc.id, ...doc.data() } as PublicQuizData;
              if (quiz.createdBy !== currentUsername && !userQuizzesIds.includes(quiz.id)) {
                  publicQuizData.push(quiz);
              }
          });
          setPublicQuizzes(publicQuizData);

      } catch (error) {
          console.log("Error Fetching Public Quizzes", error);
      } finally {
          setLoading(false);
      }
  };

  const addQuizToMyQuizzes = async (quiz: PublicQuizData) => {
      try {
        const username = await getCurrentUsername();
        if (!username) return;
  
        await firestoreInstance.collection("User").doc(username).collection("Quizzes").doc(quiz.id).set({
          question: quiz.question,
          option1: quiz.option1,
          option2: quiz.option2,
          option3: quiz.option3,
          option4: quiz.option4,
          answer: quiz.answer,
          createdBy: username,
        });
  
        Alert.alert("Quiz added to your quizzes");
      } catch (error) {
        console.log("Error adding quiz to your quizzes: ", error);
      }
  };

  const renderItem = ({ item }: { item: PublicQuizData }) => (
    <View style={styles.quizItem}>
      <Text style={styles.question}>{item.question}</Text>
      <TouchableOpacity onPress={() => addQuizToMyQuizzes(item)} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add to My Quizzes</Text>
      </TouchableOpacity>
    </View>
    );
    
    return (
      <View style={styles.container}>
        <FlatList
          data={publicQuizzes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListFooterComponent={<Button title="Refresh" onPress={fetchPublicQuizzes} />}
          refreshing={loading}
          onRefresh={fetchPublicQuizzes}
        />
        <Button title="Back" onPress={() => navigation.goBack()} />
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
    quizItem: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginVertical: 5,
      width: '100%',
    },
    question: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    addButton: {
      backgroundColor: '#007bff',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginTop: 10,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 16,
    },
  });