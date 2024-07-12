import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import styles from '../styles'; 
import type { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "HomeScreen">;

const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    return (
        <View style={styles.background}>
            <Text style={styles.brand}>StudySphere</Text>
            <View style={localStyles.buttonContainer}>
                <Button
                    title="Notes"
                    onPress={() => navigation.navigate('NotesScreen')}
                    color="darkblue"
                />
                <Button
                    title="Profile"
                    onPress={() => navigation.navigate('ProfileScreen')}
                    color="darkblue"
                />
                <Button
                    title="Flashcards"
                    onPress={() => navigation.navigate('Flashcard')}
                    color="darkblue"
                />
                <Button
                    title="Quiz"
                    onPress={() => navigation.navigate('Quiz')}
                    color="darkblue"
                />
            </View>
        </View>
    );
};

export default HomeScreen;

const localStyles = StyleSheet.create({
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});