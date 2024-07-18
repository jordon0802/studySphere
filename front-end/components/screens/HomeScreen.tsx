import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import styles from '../styles'; 
import type { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { firestoreInstance } from '../Firebase';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "HomeScreen">;

function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const getData = async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                console.log("key: " + key)
                console.log("value: " + value);
                return value;
            } else {
                console.log(key + " is null");
            }
        } catch (error) {
            console.log("error: " + error);
        }
    }

    const getId = async () => {
        try {
            const username = await AsyncStorage.getItem("username");
            const value = (await firestoreInstance.collection("User").doc(username as string).get()).data();
            const object: {user_id?: string} | undefined = value;
            const user_id = object?.user_id;
            console.log(user_id);
            return user_id;
        } catch (error) {
            console.log("error: " + error);
        }
    }

    getData("user_id");
    getData("token");
    getId();

    return (
        <View style={styles.background}>
            <Text style={styles.brand}>StudySphere</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="Notes"
                    onPress={() => navigation.navigate('NotesScreen')}
                />
                <Text />
                <Button
                    title="Profile"
                    onPress={() => navigation.navigate('ProfileScreen')}
                />
                <Text />
                <Button
                    title="Flashcards"
                    onPress={() => navigation.navigate('FlashcardMainScreen')}
                />
                <Text />
                <Button
                    title="Quiz"
                    onPress={() => navigation.navigate('QuizScreen')}
                />
            </View>
        </View>
    );
};

export default HomeScreen;