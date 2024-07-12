import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import styles from '../styles'; 
import type { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "HomeScreen">;

function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    return (
        <View style={styles.background}>
            <Text style={styles.brand}>StudySphere</Text>
            <View style={localStyles.buttonContainer}>
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
                    title="Flashcard"
                    onPress={() => navigation.navigate('FlashcardScreen')}
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

const localStyles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
        color: 'blue'
    },
});