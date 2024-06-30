import axios from 'axios';
import React from 'react';
import { Button, Text, TextInput , View } from 'react-native';
import * as Yup from 'yup';

import styles from "../styles"
import type { RegisterScreenProps, RootStackParamList, ProfileScreenProps } from "../types";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Values {
    email: String;
    password: String;
}

// Validation Schema
const userSchema = Yup.object({
    email: Yup.string().email('Email is not valid').required('Email is required'),
    password: Yup.string().min(8, 'Password is too short').required('Password is required')
});

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "ProfileScreen">;

// POST Request
async function doSubmit({ email, password } : Values, navigation : ProfileScreenNavigationProp) {
    try {
        console.log(email);
        console.log(password);
        let data = JSON.stringify({
            "email": email,
            "password": password
        })
    
        const response = await axios.post('http://10.0.2.2:9080/api/v1/user/login', data, {
            headers: {
            'Content-Type': 'application/json',
        }});
        if (response.status == 200) {
                navigation.navigate("HomeScreen")
        }
    } catch (error) {
        console.log(error);
    }
};

function StudySphere() {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    return (
        <View style={styles.background}>
            <Text style={styles.brand}>STUDYSPHERE</Text>
            
            <TextInput
                style={styles.loginPage}
                placeholder="Email"
                onChangeText={onChangeEmail}
                value={email}
            />

            <TextInput
                style={styles.loginPage}
                placeholder="Password"
                onChangeText={onChangePassword}
                value={password}
                secureTextEntry={true}
            />

            <Button onPress={() => (doSubmit({email, password}, navigation))} title="login" />
            <Text />
            <Button onPress={() => navigation.navigate("RegisterScreen")} title="register here" />
        </View>
    );
};

export default StudySphere;