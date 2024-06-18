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
            <Button title='Flashcards' onPress={() => navigation.navigate('Flashcard')} />
            <Button title='Quiz' onPress={() => navigation.navigate('Quiz')} />
            <Button title='Study Plan' onPress={() => navigation.navigate('StudyPlan')} />
            <Button title='Notes' onPress={() => navigation.navigate('Notes')} />
        </View>
    );
};

export default ProfileScreen;