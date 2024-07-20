import React, { useState } from 'react';
import {Button, ImageBackground, Text, View} from 'react-native';

import styles from "../styles"
import type { ProfileScreenProps } from "../types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firestoreInstance } from '../Firebase';

function ProfileScreen({navigation, route}: ProfileScreenProps) {
    const image = {uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp"};
    const [email, setEmail] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [user_id, setUser_id] = useState<number>();

    const getData = async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value;
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

    const getUsername = async () => {
        try {
            const value = await AsyncStorage.getItem("username");
            if (value !== null) {
                setUsername(value);
            }
        } catch (error) {
            console.log("error: " + error);
        }
    }

    const getUser_id = async () => {
        try {
            const value = await AsyncStorage.getItem("user_id");
            if (value !== null) {
                setUser_id(parseInt(value));
            }
        } catch (error) {
            console.log("error: " + error);
        }
    }

    getUsername();
    getUser_id();

    return (
        <View style={styles.background}>
            <ImageBackground resizeMode="cover" source={image} style={styles.image}>
                <Text style={styles.brand}>My Profile</Text>
                <Text />
                <Text style={styles.textOutput}>Hi {username}!!</Text>
                <Text style={styles.textOutput}>Your user id is: {user_id}</Text>
                <Text />
                <Button title='Back' onPress={() => navigation.navigate('HomeScreen')}/>
            </ImageBackground>
        </View>
    );
};

export default ProfileScreen;

