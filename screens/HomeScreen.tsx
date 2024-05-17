import * as React from 'react';
import {Button, Text, TextInput, View} from 'react-native';

import styles from "../styles"
import type { HomeScreenProps } from "../types";

function HomeScreen({navigation}: HomeScreenProps) {
    return (
        <View style={styles.background}>
            <Text style={styles.brand}>STUDYSPHERE</Text>
            {/*<TextInput style={styles.textInput}>Enter your name here</TextInput>*/}
            <Button title='Login' onPress={() => navigation.navigate('Profile', {name: 'Jordon'})}/>
        </View>
    );
};

export default HomeScreen;