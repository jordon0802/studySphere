import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    addNoteButton: {
        alignItems: "center",
        backgroundColor: "navy",
        borderColor: "white",
        borderRadius: 10,
        borderWidth: 2,
        elevation: 6,
        justifyContent: "center",
        padding: 6,
        shadowColor: "rgba(46, 229, 157, 0.4)",
        shadowOpacity: 0.8,
        shadowOffset : { width: 1, height: 13},
    },
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
    button: {
        alignItems: "center",
        backgroundColor: "navy",
        borderColor: "white",
        borderRadius: 10,
        borderWidth: 2,
        elevation: 6,
        justifyContent: "center",
        marginHorizontal: 60,
        padding: 6,
        shadowColor: "rgba(46, 229, 157, 0.4)",
        shadowOpacity: 0.8,
        shadowOffset : { width: 1, height: 13},
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight:"bold",
    },
    delButton: {
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 5,
        top: 3,
      },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    nextPrevContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
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
    resultContainer: {
        backgroundColor: "lightcyan",
        borderRadius: 10,
        marginHorizontal: 40,
        padding: 12,
    },
    quizResultStyle: {
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold"
    },
    textInput: {
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 5,
        borderWidth: 2,
        marginHorizontal: 10,
        padding: 10,
    },
    textOutput: {
        color: "black",
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center",
    }
});

export default styles;