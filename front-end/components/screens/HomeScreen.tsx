import React from 'react';
import { View, Text, Button, ImageBackground } from 'react-native';
import styles from '../styles'; 
import type { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "HomeScreen">;

function HomeScreen() {
    const image = {uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp"};
    const navigation = useNavigation<HomeScreenNavigationProp>();
    return (
        <View style={styles.background}>
            <ImageBackground resizeMode="cover" source={image} style={styles.image}>
                <Text style={styles.brand}>StudySphere</Text>
                <Text />
                <Button
                    title="My Profile"
                    onPress={() => navigation.navigate('ProfileScreen')}
                />
                <Text />
                <Button
                    title="BuddySphere"
                    onPress={() => navigation.navigate('BuddySphereScreen')}
                />
                <Text />
                <Button
                    title="My Notes"
                    onPress={() => navigation.navigate('NotesScreen')}
                />
                <Text />
                <Button
                    title="My Flashcards"
                    onPress={() => navigation.navigate('FlashcardMainScreen')}
                />
                <Text />
                <Button
                    title="My Quizzes"
                    onPress={() => navigation.navigate('QuizScreen')}
                />
                <Text />
                <Button
                    title="My Study Plans"
                    onPress={() => navigation.navigate('StudyPlanScreen')}
                />
                <Text />
                <Button
                    title="Logout"
                    onPress={() => navigation.navigate('LoginScreen')}
                />
            </ImageBackground>
        </View>
    );
};

export default HomeScreen;