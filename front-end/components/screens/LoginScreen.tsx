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

import styles from "../styles";
import type {
    RootStackParamList,
} from "../types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { firestoreInstance } from "../Firebase";

interface Values {
    email: string;
    password: string;
}

type ProfileScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "ProfileScreen"
>;

function StudySphere() {
    const image = {
        uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp",
    };
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // POST Request
    const doSubmit = async (
        { email, password }: Values,
        navigation: ProfileScreenNavigationProp
    ) => {
        try {
            console.log(email);
            console.log(password);
            let data = JSON.stringify({
                email: email,
                password: password,
            });

            const response = await axios.post(
                "http://180.129.93.209:9080/api/v1/user/login",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const storeData = async (key: string, value: string) => {
                try {
                    await AsyncStorage.setItem(key, value);
                    // Store user_id
                    await firestoreInstance
                        .collection("User")
                        .doc(response.data[1])
                        .update({ user_id: response.data[0] });
                } catch (error) {
                    console.log("error: " + error);
                }
            };

            if (response.status == 200) {
                storeData("user_id", response.data[0]);
                storeData("username", response.data[1]);
                storeData("email", email);

                const bearer = "Bearer ";
                const token = bearer.concat(response.data[2]);
                storeData("token", token);

                setEmail("");
                setPassword("");

                navigation.navigate("HomeScreen");
            }
        } catch (error) {
            Alert.alert("Invalid Credentials", "Please try again");
        } finally {
            setEmail("");
            setPassword("");
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
                    onPress={() => doSubmit({ email, password }, navigation)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Text />
                <TouchableOpacity
                    onPress={() => navigation.navigate("RegisterScreen")}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Register Here</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

export default StudySphere;
