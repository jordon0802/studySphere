import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput } from 'react-native';
import styles from "../styles"
import { firestoreInstance } from '../Firebase';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// type StudyPlanData = {
//     id : string
//     title : string;
//     description : string;
//     dueDate : string
//   }
  
  type NewStudyPlanScreenProp = NativeStackNavigationProp<RootStackParamList, "NewStudyPlanScreen">;

  function NewStudyPlanScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const navigation = useNavigation<NewStudyPlanScreenProp>();

    //FETCH USERID
    const getId = async () => {
        try {
            const user_id = await AsyncStorage.getItem("user_id");
            console.log(user_id);
            return user_id;
        } catch (error) {
            console.log("error: " + error);
        }
    }
    const user_id = getId();

    const handleSubmit = async () => {
        try {
            const username = await AsyncStorage.getItem("username");
            const collectionRef = firestoreInstance.collection('Users').doc(username as string).collection('StudyPlan');
            await collectionRef.add({
                title: title,
                description : description,
                dueDate : dueDate
            });
            setTitle('');
            setDescription('');
            setDueDate('');
            navigation.navigate("StudyPlanScreen");
            
        } catch (error) {
            console.log('Error Uploading', error);
        };
    }
    
    return (
        <View style={styles.background}>
          <TextInput
            style={customStyles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={customStyles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={customStyles.input}
            placeholder="Due Date"
            value={dueDate}
            onChangeText={setDueDate}
          />
          <Button onPress={handleSubmit} title="Submit"/>
          <Text />
          <Button onPress={() => navigation.navigate("StudyPlanScreen")} title="Back"/>
        </View>
      );
    }
    
    const customStyles = StyleSheet.create({
      input: {
        backgroundColor: "white",
        borderColor: '#ccc',
        borderRadius: 5,
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        width: '100%',
      }
    });

  
  export default NewStudyPlanScreen;