import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Alert,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { firestoreInstance } from "../Firebase";
import { RootStackParamList } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles";

type UserProfile = {
    username: string;
    studyPreference: number | null;
    studyFrequency: number | null;
    fieldOfStudy: number[];
    personality: number | null;
    socialPreference: number | null;
    preferredStudyEnvironment: number[];
    preferredStudyTime: number[];
    dataVector: number[];
};

type ProfileQuizScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "ProfileQuizScreen"
>;

function ProfileQuizScreen() {
    const navigation = useNavigation<ProfileQuizScreenNavigationProp>();
    const image = {
        uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp",
    };
    const [studyPreference, setStudyPreference] = useState<number | null>(null);
    const [studyFrequency, setStudyFrequency] = useState<number | null>(null);
    const [fieldOfStudy, setFieldOfStudy] = useState<number[]>([
        0, 0, 0, 0, 0, 0,
    ]);
    const [personality, setPersonality] = useState<number | null>(null);
    const [socialPreference, setSocialPreference] = useState<number | null>(
        null
    );
    const [preferredStudyEnvironment, setPreferredStudyEnvironment] = useState<
        number[]
    >([0, 0, 0, 0]);
    const [preferredStudyTime, setPreferredStudyTime] = useState<number[]>([
        0, 0, 0, 0, 0,
    ]);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsername = async () => {
            const username = await AsyncStorage.getItem("username");
            setUsername(username);
        };
        fetchUsername();
    }, []);

    const isEmptyForm = () => {
        if (
            studyPreference === null &&
            studyFrequency === null &&
            fieldOfStudy.every((field) => field === 0) &&
            socialPreference === null &&
            preferredStudyEnvironment.every((env) => env === 0) &&
            preferredStudyTime.every((time) => time === 0)
        ) {
            return true;
        }
        return false;
    };

    const validateFields = () => {
        if (
            studyPreference === null ||
            studyFrequency === null ||
            fieldOfStudy.every((field) => field === 0) ||
            personality === null ||
            socialPreference === null ||
            preferredStudyEnvironment.every((env) => env === 0) ||
            preferredStudyTime.every((time) => time === 0)
        ) {
            return false;
        }
        return true;
    };

    //Note that the ! after each field indicates that at this point, each field is expected to be non-null
    //Null fields are handled by throwing an Alert to fill the field first (validateFields())
    const constructDataVector = () => {
        return [
            studyPreference!,
            studyFrequency!,
            ...fieldOfStudy,
            personality!,
            socialPreference!,
            ...preferredStudyEnvironment,
            ...preferredStudyTime,
        ];
    };

    const handleSubmit = async () => {
        if (!validateFields()) {
            Alert.alert(
                "Error",
                "Please fill out all fields before submitting"
            );
            return;
        }
        if (!username) return;

        const dataVector = constructDataVector();

        const docId = [username, "ProfileData"].join("_");

        const userProfile: UserProfile = {
            username,
            studyPreference,
            studyFrequency,
            fieldOfStudy,
            personality,
            socialPreference,
            preferredStudyEnvironment,
            preferredStudyTime,
            dataVector,
        };
        //Sent as a Doc to Firebase as an all original fields + as an array thru dataVector (excl username)

        try {
            // const userRef = firestoreInstance.collection("UserProfiles").doc(username);
            // await userRef.set(userProfile, { merge: true });

            const profileRef = firestoreInstance
                .collection("User")
                .doc(username)
                .collection("Profiling")
                .doc(docId);
            await profileRef.set(userProfile, { merge: true });
            await firestoreInstance
                .collection("User")
                .doc(username)
                .update({
                    profilingDone: 1,
                });

            Alert.alert("Profile updated successfully");
            navigation.navigate("HomeScreen");
        } catch (error) {
            console.log("Error updating profile: ", error);
            Alert.alert("Failed to update profile");
        }
    };

    const handleFieldOfStudySelection = (index: number) => {
        const newFieldOfStudy = [...fieldOfStudy];
        if (newFieldOfStudy[index] === 1) {
            newFieldOfStudy[index] = 0;
        } else {
            const selectedCount = newFieldOfStudy.reduce(
                (count, val) => count + val,
                0
            );
            if (selectedCount < 2) {
                newFieldOfStudy[index] = 1;
            } else {
                Alert.alert(
                    "Error",
                    "You can select a maximum of 2 fields of study"
                );
            }
        }
        setFieldOfStudy(newFieldOfStudy);
    };

    return (
        <View style={styles.background}>
            <ImageBackground
                resizeMode="cover"
                source={image}
                style={styles.image}
            >
                <Text style={styles.brand}>Profile Quiz</Text>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.formBackground}>
                        <Text style={styles.quizQuestionText}>
                            Study Preference
                        </Text>
                        <View style={styles.radioButtonContainer}>
                            <TouchableOpacity
                                onPress={() => setStudyPreference(0)}
                                style={[
                                    styles.radioButton,
                                    studyPreference === 0 &&
                                        styles.radioButtonSelected,
                                ]}
                            />
                            <Text style={styles.quizOptionText}>Individual</Text>
                            <TouchableOpacity
                                onPress={() => setStudyPreference(1)}
                                style={[
                                    styles.radioButton,
                                    studyPreference === 1 &&
                                        styles.radioButtonSelected,
                                ]}
                            />
                            <Text style={styles.quizOptionText}>Group</Text>
                        </View>

                        <Text style={styles.quizQuestionText}>
                            Study Frequency Per Day
                        </Text>
                        <View style={styles.radioButtonContainer}>
                            <TouchableOpacity
                                onPress={() => setStudyFrequency(0)}
                                style={[
                                    styles.radioButton,
                                    studyFrequency === 0 &&
                                        styles.radioButtonSelected,
                                ]}
                            />
                            <Text style={styles.quizOptionText}>&lt; 1h</Text>
                            <TouchableOpacity
                                onPress={() => setStudyFrequency(1)}
                                style={[
                                    styles.radioButton,
                                    studyFrequency === 1 &&
                                        styles.radioButtonSelected,
                                ]}
                            />
                            <Text style={styles.quizOptionText}>2h - 5h</Text>
                            <TouchableOpacity
                                onPress={() => setStudyFrequency(2)}
                                style={[
                                    styles.radioButton,
                                    studyFrequency === 2 &&
                                        styles.radioButtonSelected,
                                ]}
                            />
                            <Text style={styles.quizOptionText}>6h - 8h</Text>
                            <TouchableOpacity
                                onPress={() => setStudyFrequency(3)}
                                style={[
                                    styles.radioButton,
                                    studyFrequency === 3 &&
                                        styles.radioButtonSelected,
                                ]}
                            />
                            <Text style={styles.quizOptionText}>&gt; 8h</Text>
                        </View>

                        <Text style={styles.quizQuestionText}>
                            Field of Study
                        </Text>
                        {[
                            "Computing",
                            "Engineering",
                            "Sciences",
                            "Arts",
                            "Medicine",
                            "Law",
                        ].map((field, index) => (
                            <View key={field} style={styles.checkboxContainer}>
                                <Text style={styles.quizOptionText}>{field}</Text>
                                <TouchableOpacity
                                    onPress={() =>
                                        handleFieldOfStudySelection(index)
                                    }
                                    style={[
                                        styles.checkbox,
                                        fieldOfStudy[index] === 1 &&
                                            styles.checkboxSelected,
                                    ]}
                                />
                            </View>
                        ))}

                        <Text style={styles.quizQuestionText}>Personality</Text>
                        <View style={styles.radioButtonContainer}>
                            <TouchableOpacity
                                onPress={() => setPersonality(0)}
                                style={[
                                    styles.radioButton,
                                    personality === 0 &&
                                        styles.radioButtonSelected,
                                ]}
                            />
                            <Text style={styles.quizOptionText}>Introvert</Text>
                            <TouchableOpacity
                                onPress={() => setPersonality(1)}
                                style={[
                                    styles.radioButton,
                                    personality === 1 &&
                                        styles.radioButtonSelected,
                                ]}
                            />
                            <Text style={styles.quizOptionText}>Extrovert</Text>
                        </View>

                        <Text style={styles.quizQuestionText}>
                            Meet in person?
                        </Text>
                        <View style={styles.radioButtonContainer}>
                            <TouchableOpacity
                                onPress={() => setSocialPreference(0)}
                                style={[
                                    styles.radioButton,
                                    socialPreference === 0 &&
                                        styles.radioButtonSelected,
                                ]}
                            />
                            <Text style={styles.quizOptionText}>No</Text>
                            <TouchableOpacity
                                onPress={() => setSocialPreference(1)}
                                style={[
                                    styles.radioButton,
                                    socialPreference === 1 &&
                                        styles.radioButtonSelected,
                                ]}
                            />
                            <Text style={styles.quizOptionText}>Yes</Text>
                        </View>

                        <Text style={styles.quizQuestionText}>
                            Preferred Study Environment
                        </Text>
                        {[
                            "Quiet place",
                            "Background music",
                            "White noise",
                            "Collaborative space",
                        ].map((env, index) => (
                            <View key={env} style={styles.checkboxContainer}>
                                <Text style={styles.quizOptionText}>{env}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        const newPreferredStudyEnvironment = [
                                            ...preferredStudyEnvironment,
                                        ];
                                        newPreferredStudyEnvironment[index] =
                                            newPreferredStudyEnvironment[
                                                index
                                            ] === 1
                                                ? 0
                                                : 1;
                                        setPreferredStudyEnvironment(
                                            newPreferredStudyEnvironment
                                        );
                                    }}
                                    style={[
                                        styles.checkbox,
                                        preferredStudyEnvironment[index] ===
                                            1 && styles.checkboxSelected,
                                    ]}
                                />
                            </View>
                        ))}

                        <Text style={styles.quizQuestionText}>
                            Preferred Study Time
                        </Text>
                        {[
                            "Early morning",
                            "Late morning",
                            "Afternoon",
                            "Evening",
                            "Late night",
                        ].map((time, index) => (
                            <View key={time} style={styles.checkboxContainer}>
                                <Text style={styles.quizOptionText}>{time}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        const newPreferredStudyTime = [
                                            ...preferredStudyTime,
                                        ];
                                        newPreferredStudyTime[index] =
                                            newPreferredStudyTime[index] === 1
                                                ? 0
                                                : 1;
                                        setPreferredStudyTime(
                                            newPreferredStudyTime
                                        );
                                    }}
                                    style={[
                                        styles.checkbox,
                                        preferredStudyTime[index] === 1 &&
                                            styles.checkboxSelected,
                                    ]}
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>
                <Text />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <Text />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        if (!isEmptyForm()) {
                            Alert.alert(
                                "Unsaved Changes",
                                "You have unsaved changes. Are you sure you want to leave?",
                                [
                                    { text: "Cancel", style: "cancel" },
                                    {
                                        text: "Leave",
                                        style: "destructive",
                                        onPress: () =>
                                            navigation.navigate("HomeScreen"),
                                    },
                                ]
                            );
                        } else {
                            navigation.navigate("HomeScreen");
                        }
                    }}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <Text />
            </ImageBackground>
        </View>
    );
}

export default ProfileQuizScreen;
