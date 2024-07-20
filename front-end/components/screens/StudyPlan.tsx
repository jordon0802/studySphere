import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { firestoreInstance } from '../Firebase';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type StudyPlanData = {
  id : string
  title : string;
  description : string;
  dueDate : string
}

type StudyPlanScreenProp = NativeStackNavigationProp<RootStackParamList, "StudyPlanScreen">;

function StudyPlanScreen() {
  const [studyPlan, setStudyPlan] = useState<StudyPlanData[]>([]);
  const [currentStudyPlan, setCurrentStudyPlan] = useState(0);
  const navigation = useNavigation<StudyPlanScreenProp>();

  var totalStudyPlan = 0;

  const fetchStudyPlan = async () => {
    const username = await AsyncStorage.getItem("username");
    const querySnapshot = await firestoreInstance.collection("User").doc(username as string).collection("StudyPlan").get();
    const studyPlanData : StudyPlanData[] = [];

    querySnapshot.forEach((doc) => {
      // "as" => considers doc[i] as FlashcardData type
      studyPlanData.push({ id: doc.id, ...doc.data() } as StudyPlanData);
    });
    setStudyPlan(studyPlanData);
  };

  const renderItem = ({item}: {item: StudyPlanData}) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.dueDate}>Due Date: {item.dueDate}</Text>
    </TouchableOpacity>
  );

  const handleNext = () => {
    setCurrentStudyPlan(currentStudyPlan + 1);
  }

  const handlePrev = () => {
    if (currentStudyPlan > 0)
      setCurrentStudyPlan(currentStudyPlan - 1);
  }

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate('NewStudyPlanScreen')} title="New Plan"/>
      <Text/>
      {(currentStudyPlan >= totalStudyPlan) ? (
        <Text>All Current Plans!</Text>
      ) : (
        renderItem({item: studyPlan[currentStudyPlan]})
      )}
      <Button onPress={handleNext} title="Next"/>
      <Button onPress={handlePrev} title="Prev"/>
      <Button onPress={() => navigation.navigate('HomeScreen')} title="Home"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top', // Ensure multiline input works correctly
  },
  saveButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  dueDate: {
    fontSize: 12,
    color: '#888',
  },
});

export default StudyPlanScreen;
