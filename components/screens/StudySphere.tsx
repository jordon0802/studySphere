import React from 'react';
import {Button, Text, TextInput, View} from 'react-native';

import userSignup from '../Formik';
import styles from "../styles"
import type { StudySphereProps } from "../types";
import UserSignup from '../Formik';

function StudySphere({navigation}: StudySphereProps) {
    return (
        <View style={styles.background}>
            <Text style={styles.brand}>STUDYSPHERE</Text>
            <UserSignup />
            {/*<Button title='Login' onPress={() => navigation.navigate('Profile', {name: 'Jordon'})}/>*/}
        </View>
    );
};

export default StudySphere;