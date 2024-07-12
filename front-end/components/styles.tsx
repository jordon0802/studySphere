import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    background: {
        backgroundColor: 'turquoise',
        flex: 1,
        justifyContent: 'center',
        padding: 5,
    },
    brand: {
        color: 'darkblue',
        fontSize: 50,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
        color: 'blue'
    },
    loginPage: {
        borderColor: 'black',
        borderRadius: 5,
        color: 'grey',
        textAlign: 'left'
    },
    quizContainer: {
        alignItems: "center",
        backgroundColor: "turquoise",
        flex: 1,
        fontWeight: 'bold',
        justifyContent: "center",
        padding: 5,
        textAlign: 'center',
    },
    quizOptionContainer: {
        borderWidth: 2,
        color: 'darkblue',
        marginTop: 15,
    },
    quizOptionStyle: {
        color: "green",
        padding: 5,
        alignSelf: 'center',
        fontSize: 18,
    },
    quizQuestionContainer: {
        backgroundColor: "white",
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },    
    quizQuestionText: {
        fontSize: 24,
    },
    textInput: {
        color: 'black',
        textAlign: 'center',
    }
});

export default styles;