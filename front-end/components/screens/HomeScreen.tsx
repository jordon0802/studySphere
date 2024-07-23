import React from "react";
import { View, Text, Button, ImageBackground, TouchableOpacity } from "react-native";
import styles from "../styles"; 
import type { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "HomeScreen">;

function HomeScreen() {
    const image = {uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp"};
    const navigation = useNavigation<HomeScreenNavigationProp>();
    return (
        <View style={styles.background}>
            <ImageBackground resizeMode="cover" source={image} style={styles.image}>
                <Text style={styles.brand}>StudySphere</Text>
                <Text />

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ProfileScreen")}>
                    <Text style={styles.buttonText}>My Profile</Text>
                </TouchableOpacity>
                <Text />

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("BuddySphereScreen")}>
                    <Text style={styles.buttonText}>BuddySphere</Text>
                </TouchableOpacity>
                <Text />

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("NotesScreen")}>
                    <Text style={styles.buttonText}>My Notes</Text>
                </TouchableOpacity>
                <Text />

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("FlashcardMainScreen")}>
                    <Text style={styles.buttonText}>My Flashcards</Text>
                </TouchableOpacity>
                <Text />

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("QuizScreen")}>
                    <Text style={styles.buttonText}>My Quizzes</Text>
                </TouchableOpacity>
                <Text />

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("StudyPlanScreen")}>
                    <Text style={styles.buttonText}>My Study Plans</Text>
                </TouchableOpacity>
                <Text />

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("LoginScreen")}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

export default HomeScreen;