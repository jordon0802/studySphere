import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Button,
    ImageBackground,
    TouchableOpacity,
    Alert,
} from "react-native";
import { firestoreInstance } from "../Firebase";
import styles from "../styles";
import type { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

type HomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "HomeScreen"
>;

function HomeScreen() {
    const image = {
        uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp",
    };
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [isProfileComplete, setIsProfileComplete] = useState(false);

    useEffect(() => {
        checkProfileCompletion();
    }, []);

    const checkProfileCompletion = async () => {
        try {
            const username = await AsyncStorage.getItem("username");
            if (!username) return;

            const identity = [username, "ProfileData"].join("_");

            const profileDoc = await firestoreInstance
                .collection("User")
                .doc(username)
                .collection("Profilling")
                .doc(identity)
                .get();
            if (profileDoc.exists) {
                setIsProfileComplete(true);
            } else {
                setIsProfileComplete(false);
            }
        } catch (error) {
            console.error("Error checking profile completion: ", error);
        }
    };

    const handleBuddySpherePress = () => {
        if (isProfileComplete) {
            navigation.navigate("BuddySphereScreen");
        } else {
            Alert.alert(
                "Profile Incomplete",
                "Please complete the profiling quiz before accessing BuddySphere.",
                [{ text: "OK" }]
            );
        }
    };

    return (
        <View style={styles.background}>
            <ImageBackground
                resizeMode="cover"
                source={image}
                style={styles.image}
            >
                <Text style={styles.brand}>StudySphere</Text>
                <Text />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("ProfileScreen")}
                >
                    <Text style={styles.buttonText}>My Profile</Text>
                </TouchableOpacity>
                <Text />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("ProfileQuizScreen")}
                >
                    <Text style={styles.buttonText}>Study Profile Quiz</Text>
                </TouchableOpacity>
                <Text />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleBuddySpherePress}
                >
                    <Text style={styles.buttonText}>BuddySphere</Text>
                </TouchableOpacity>
                <Text />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("FlashcardMainScreen")}
                >
                    <Text style={styles.buttonText}>My Flashcards</Text>
                </TouchableOpacity>
                <Text />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("NotesScreen")}
                >
                    <Text style={styles.buttonText}>My Notes</Text>
                </TouchableOpacity>
                <Text />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("QuizScreen")}
                >
                    <Text style={styles.buttonText}>My Quizzes</Text>
                </TouchableOpacity>
                <Text />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("StudyPlanScreen")}
                >
                    <Text style={styles.buttonText}>My Study Plans</Text>
                </TouchableOpacity>
                <Text />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("UploadMaterialsScreen")}
                >
                    <Text style={styles.buttonText}>
                        Upload Study Materials
                    </Text>
                </TouchableOpacity>
                <Text />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("LoginScreen")}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

export default HomeScreen;
