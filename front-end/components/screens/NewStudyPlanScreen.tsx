import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, ImageBackground } from 'react-native';
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
    const image = {uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp"};
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const navigation = useNavigation<NewStudyPlanScreenProp>();

    //FETCH USERID
    // const getId = async () => {
    //     try {
    //         const user_id = await AsyncStorage.getItem("user_id");
    //         console.log(user_id);
    //         return user_id;
    //     } catch (error) {
    //         console.log("error: " + error);
    //     }
    // }
    // const user_id = getId();

    const handleSubmit = async () => {
        try {
            const username = await AsyncStorage.getItem("username");

            if (!username) {
                console.log('No User Found!');
                return;
            }

            const collectionRef = firestoreInstance.collection('User').doc(username as string).collection('StudyPlan');
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
        }
    };
    
    return (
        <View style={styles.background}>
          <ImageBackground resizeMode="cover" source={image} style={styles.image}>
            <Text style={styles.brand}>New Studyplan</Text>
            <Text />
            <TextInput
              style={styles.textInput}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <Text />
            <TextInput
              style={styles.textInput}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
            <Text />
            <TextInput
              style={styles.textInput}
              placeholder="Due Date"
              value={dueDate}
              onChangeText={setDueDate}
            />
            <Text />
            <Button onPress={handleSubmit} title="Submit"/>
            <Text />
            <Button onPress={() => navigation.navigate("StudyPlanScreen")} title="Back"/>
          </ImageBackground>
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