import axios from 'axios';
import React from 'react';
import { Button, ImageBackground, Text, TextInput , View } from 'react-native';
import * as Yup from 'yup';

import styles from "../styles"
import type { RegisterScreenProps, RootStackParamList, ProfileScreenProps } from "../types";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Values {
    username: String;
    email: String;
    password: String;
}

// Validation Schema
const userSchema = Yup.object({
    username: Yup.string().required('Name is required'),
    email: Yup.string().email('Email is not valid').required('Email is required'),
    password: Yup.string().min(8, 'Password is too short').required('Password is required')
});

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "ProfileScreen">;

// POST Request
async function doSubmit({ username, email, password } : Values, navigation : ProfileScreenNavigationProp) {
    try {
        console.log(username);
        console.log(email);
        console.log(password);
        let data = JSON.stringify({
            "username": username,
            "email": email,
            "password": password
        })
    
        const response = await axios.post('http://10.0.2.2:9080/api/v1/user/register', data, {
            headers: {
            'Content-Type': 'application/json',
        }});
        if (response.status == 200) {
                //navigation.navigate("ProfileScreen", { name : username })
                navigation.navigate("LoginScreen")
        }
    } catch (error) {
        console.log(error);
    }
};

function RegisterScreen() {
    const image = {uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp"};
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const [username, onChangeUsername] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    return (
        <View style={styles.background}>
            <ImageBackground resizeMode="cover" source={image} style={styles.image}>
                <Text style={styles.brand}>STUDYSPHERE</Text>
                <Text />
                <TextInput
                    style={styles.textInput}
                    placeholder="Username"
                    onChangeText={onChangeUsername}
                    value={username}
                />
                <Text />
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={onChangeEmail}
                    value={email}
                />
                <Text />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    onChangeText={onChangePassword}
                    value={password}
                    secureTextEntry={true}
                />
                <Text />
                <Button onPress={() => (doSubmit({username, email, password}, navigation))} title="register" />
                <Text />
                <Button onPress={() => navigation.navigate("LoginScreen")} title="login here" />
            </ImageBackground>
        </View>
    );
};

export default RegisterScreen;