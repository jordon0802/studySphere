import { Button } from "@rneui/base";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ImageBackground,
} from "react-native";
import { NotesScreenProps, RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styles from "../styles";
import { firestoreInstance } from "../Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type NotesData = {
    id: string;
    note: string;
};

type NotesScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "NotesScreen"
>;

function NotesScreen() {
    const image = {
        uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp",
    };
    const navigation = useNavigation<NotesScreenNavigationProp>();
    const [notes, setNotes] = useState<NotesData[]>([]);
    const [newNote, setNewNote] = useState("");

    const addNote = async () => {
        const username = await AsyncStorage.getItem("username");
        const collectionRef = firestoreInstance
            .collection("User")
            .doc(username as string)
            .collection("Notes");
        if (newNote.trim() !== "") {
            await collectionRef.add({ note: newNote });
            getNotes();
            setNewNote("");
        }
    };

    const deleteNote = async (id: string) => {
        const username = await AsyncStorage.getItem("username");
        const collectionRef = firestoreInstance
            .collection("User")
            .doc(username as string)
            .collection("Notes");
        await collectionRef.doc(id).delete();
    };

    const renderNoteItem = ({ item }: { item: NotesData }) => (
        <View style={styles.noteItem}>
            <Text style={styles.noteText}>{item.note}</Text>
            <TouchableOpacity
                onPress={() => deleteNote(item.id)}
                style={styles.delButton}
            >
                <FontAwesome name="close" size={20} color="black" />
            </TouchableOpacity>
        </View>
    );

    const getNotes = async () => {
        const username = await AsyncStorage.getItem("username");
        const notesData: NotesData[] = [];

        const querySnapshot = await firestoreInstance
            .collection("User")
            .doc(username as string)
            .collection("Notes")
            .get();
        querySnapshot.forEach((doc) => {
            notesData.push({ id: doc.id, ...doc.data() } as NotesData);
        });
        setNotes(notesData);
    };

    getNotes();

    return (
        <View style={styles.background}>
            <ImageBackground
                resizeMode="cover"
                source={image}
                style={styles.image}
            >
                <Text style={styles.brand}>My Notes</Text>
                <Text />
                <View style={styles.addNoteContainer}>
                    <TextInput
                        onChangeText={setNewNote}
                        placeholder="Enter your note"
                        placeholderTextColor={"black"}
                        style={styles.noteInput}
                        value={newNote}
                    />
                    <TouchableOpacity
                        style={styles.addNoteButton}
                        onPress={addNote}
                    >
                        <Text style={styles.buttonText}>Add Note</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={notes}
                    renderItem={renderNoteItem}
                    style={styles.notesList}
                />
                <Text />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("HomeScreen")}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <Text />
            </ImageBackground>
        </View>
    );
}

export default NotesScreen;
