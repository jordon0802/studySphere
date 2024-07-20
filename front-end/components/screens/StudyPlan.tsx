import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, FlatList, Alert } from 'react-native';
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

  //var totalStudyPlan = 0;

  const fetchStudyPlan = async () => {
    try {
      const username = await AsyncStorage.getItem("username");

      if (!username) {
        console.log('No User Found!');
        return;
      }  
      const querySnapshot = await firestoreInstance.collection("User").doc(username as string).collection("StudyPlan").get();
      const studyPlanData : StudyPlanData[] = [];
  
      querySnapshot.forEach((doc) => {
        // "as" => considers doc[i] as StudyPlanData type
        studyPlanData.push({ id: doc.id, ...doc.data() } as StudyPlanData);
      });
      setStudyPlan(studyPlanData);

    } catch (error) {
      console.log('Error fetching StudyPlan', error);
    }
  };

  const deleteStudyPlan = async (id: string) => {
    try {
      const username = await AsyncStorage.getItem('username');
      if (!username) {
        console.log('No User Found!');
        return;
      }
      await firestoreInstance.collection('Users').doc(username as string).collection('StudyPlan').doc(id).delete();
      setStudyPlan(studyPlan.filter(plan => plan.id !== id));
      if (currentStudyPlan > 0) {
        setCurrentStudyPlan(currentStudyPlan - 1);
      }
    } catch (error) {
      console.log('Error deleting StudyPlan', error);
    }
  };

  const confirmDelete = (id: string) => {
    Alert.alert(
      'Delete Study Plan',
      'Are you sure you want to delete this study plan?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteStudyPlan(id),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const completeStudyPlan = async (id: string) => {
    Alert.alert(
      'Complete Study Plan',
      'Have you completed this study plan?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Complete',
          onPress: () => deleteStudyPlan(id),
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }: { item: StudyPlanData }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.dueDate}>Due Date: {item.dueDate}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.smallButtonDelete} onPress={() => confirmDelete(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButtonComplete} onPress={() => completeStudyPlan(item.id)}>
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleNext = () => {
    if (currentStudyPlan < studyPlan.length - 1) {
      setCurrentStudyPlan(currentStudyPlan + 1);
    }
  };

  const handlePrev = () => {
    if (currentStudyPlan > 0)
      setCurrentStudyPlan(currentStudyPlan - 1);
  }

  useEffect(() => {fetchStudyPlan();}, []);

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate('NewStudyPlanScreen')} title="New Plan" />
      <Text />
      {studyPlan.length === 0 ? (
        <Text>Make a Plan!</Text>
      ) : (
        renderItem({ item: studyPlan[currentStudyPlan] })
      )}
      <View style={styles.navigationContainer}>
        <Button onPress={handlePrev} title="Prev" />
        <Button onPress={handleNext} title="Next" />
      </View>
      <View style={styles.homeButtonContainer}>
        <Button onPress={() => navigation.navigate('HomeScreen')} title="Home" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallButtonDelete: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  smallButtonComplete: {
    backgroundColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
  },
  homeButtonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
});

export default StudyPlanScreen;
