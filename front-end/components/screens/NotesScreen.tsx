import { Button } from '@rneui/base';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { NotesScreenProps, RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from "../styles";
import { firestoreInstance } from '../Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from "react-native-vector-icons/FontAwesome"

type NotesData = {
  id: string;
  note: string;
}

type NotesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "NotesScreen">;

function NotesScreen() {
  const image = {uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp"};
  const navigation = useNavigation<NotesScreenNavigationProp>();
  const [notes, setNotes] = useState<NotesData[]>([]);
  const [newNote, setNewNote] = useState('');

  const addNote = async () => {
    const username = await AsyncStorage.getItem("username")
    const collectionRef = firestoreInstance.collection("User").doc(username as string).collection("Notes");
    if (newNote.trim() !== '') {
      await collectionRef.add({note: newNote})
      getNotes();
      setNewNote("");
    }
  };

  const deleteNote = async (id: string) => {
    const username = await AsyncStorage.getItem("username")
    const collectionRef = firestoreInstance.collection("User").doc(username as string).collection("Notes");
    await collectionRef.doc(id).delete();
  }

  const renderNoteItem = ({ item }: { item: NotesData }) => (
    <View style={customStyles.noteItem}>
      <Text style={customStyles.noteText}>{item.note}</Text>
      <View style={customStyles.delButton}>
        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <FontAwesome name="close" size={20} color="black"/>
        </TouchableOpacity>
      </View>
    </View>
  );

  const getNotes = async () => {
    const username = await AsyncStorage.getItem("username");
    const notesData: NotesData[] = [];

    const querySnapshot = await firestoreInstance.collection("User").doc(username as string).collection("Notes").get();
    querySnapshot.forEach((doc) => {
      notesData.push({ id: doc.id, ...doc.data() } as NotesData)
    })
    setNotes(notesData);
  }

  getNotes();

  return (
    <View style={styles.background}>
      <ImageBackground resizeMode="cover" source={image} style={styles.image}>
        <Text style={styles.brand}>My Notes</Text>
        <Text />
        <View style={customStyles.addNoteContainer}>
          <TextInput onChangeText={setNewNote} placeholder="Enter your note" style={customStyles.input} value={newNote}/>
          <View style={styles.buttonContainer}>
            <Button onPress={addNote} title={"Add Note"} />
          </View>
        </View>
        <FlatList
          data={notes}
          renderItem={renderNoteItem}
          style={customStyles.notesList}
        />
        <Button onPress={() => navigation.navigate("HomeScreen")} title="Back"/>
        <Text />
      </ImageBackground>
    </View>
  );
};

const customStyles = StyleSheet.create({
  addNoteContainer: {
    borderRadius: 10,
    flexDirection: "row",
    marginBottom: 20,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  delButton: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 5,
    top: 3,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  notesList: {
    flex: 1,
    marginTop: 10,
  },
  noteItem: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    flexDirection: "row",
    padding: 1,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  noteText: {
    flex: 8,
    padding: 10,
  }
});

export default NotesScreen;
