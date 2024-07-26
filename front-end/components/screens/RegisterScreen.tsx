import axios from "axios";
import React, { useState } from "react";
import {
    Alert,
    Button,
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import * as Yup from "yup";

import styles from "../styles";
import type {
    RegisterScreenProps,
    RootStackParamList,
    ProfileScreenProps,
} from "../types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { firestoreInstance } from "../Firebase";

interface Values {
    username: string;
    email: string;
    password: string;
}

// Validation Schema
const userSchema = Yup.object({
    username: Yup.string().required("Name is required"),
    email: Yup.string()
        .email("Email is not valid")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password is too short")
        .required("Password is required"),
});

type ProfileScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "ProfileScreen"
>;

function RegisterScreen() {
    const image = {
        uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp",
    };
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const setProfiling = async () => {
        await firestoreInstance.collection("User").doc(username).set({
            profilingDone: 0,
            user_id: 0,
        });
    };

    // POST Request
    const doSubmit = async (
        { username, email, password }: Values,
        navigation: ProfileScreenNavigationProp
    ) => {
        try {
            console.log(username);
            console.log(email);
            console.log(password);
            let data = JSON.stringify({
                username: username,
                email: email,
                password: password,
            });

            const response = await axios.post(
                "http://180.129.93.209:9080/api/v1/user/register",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status == 200) {
                setProfiling();

                setUsername("");
                setEmail("");
                setPassword("");
                navigation.navigate("LoginScreen");
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.background}>
            <ImageBackground
                resizeMode="cover"
                source={image}
                style={styles.image}
            >
                <Text style={styles.brand}>STUDYSPHERE</Text>
                <Text />
                <TextInput
                    style={styles.textInput}
                    placeholder="Username"
                    placeholderTextColor={"black"}
                    onChangeText={setUsername}
                    value={username}
                />
                <Text />
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor={"black"}
                    onChangeText={setEmail}
                    value={email}
                />
                <Text />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor={"black"}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                />
                <Text />
                <TouchableOpacity
                    onPress={() =>
                        doSubmit({ username, email, password }, navigation)
                    }
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <Text />
                <TouchableOpacity
                    onPress={() => navigation.navigate("LoginScreen")}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login Here</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

export default RegisterScreen;
