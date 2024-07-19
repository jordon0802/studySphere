import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    background: {
        backgroundColor: "turquoise",
        flex: 1,
        justifyContent: "center",
    },
    brand: {
        color: "white",
        borderColor: "white",
        fontSize: 50,
        fontWeight: "bold",
        justifyContent: "center",
        textAlign: "center",
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 20,
        color: "blue"
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    quizOptionContainer: {
        borderRadius: 5,
        borderWidth: 2,
        color: "black",
        marginTop: 15,
    },
    quizOptionStyle: {
        borderRadius: 5,
        color: "black",
        padding: 5,
        alignSelf: "center",
        fontSize: 16,
    },
    quizQuestionContainer: {
        backgroundColor: "lightcyan",
        borderRadius: 10,
        margin: 10,
        padding: 15,
    },    
    quizQuestionText: {
        fontSize: 20,
        textAlign: "center",
    },
    textInput: {
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 5,
        borderWidth: 2,
        marginVertical: 5,
        padding: 10,
        width: "100%",
    },
    textOutput: {
        color: "white",
        fontSize: 24,
        textAlign: "center",
    }
});

export default styles;