import React from 'react';
import {Button, Text, View} from 'react-native';

import styles from "../styles"
import type { ProfileScreenProps } from "../types";

function ProfileScreen({navigation, route}: ProfileScreenProps) {
    return (
        <View style={styles.background}>
            <Text style={styles.brand}>STUDYSPHERE</Text>
            <Text style={styles.textInput}>This is { route.params.name }'s Profile Page</Text>
            <Button title='Back' onPress={() => navigation.navigate('StudySphere')}/>
        </View>
    );
};

export default ProfileScreen;