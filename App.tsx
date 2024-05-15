import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'turquoise',
        flex: 1,
        justifyContent: 'center',
        padding: 5,
    },
    brand: {
        color: 'darkblue',
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textInput: {
        color: 'black',
        textAlign: 'center',
    }
});


const App = () => {
    return (
        <View style={styles.background}>
            <Text style={styles.brand}>Study Sphere</Text>
            <TextInput style={styles.textInput}>Enter you name</TextInput>
        </View>
    );
};

export default App;
