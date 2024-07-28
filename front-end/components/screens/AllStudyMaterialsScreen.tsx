import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import {
    Alert,
    FlatList,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { storageInstance } from "../Firebase";
import RNFS from "react-native-fs";
import type { FirebaseStorageTypes } from "@react-native-firebase/storage";
import {
    checkManagePermission,
    requestManagePermission,
} from "manage-external-storage";

type AllStudyMaterialsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "AllStudyMaterialsScreen"
>;

function AllStudyMaterialsScreen() {
    const image = {
        uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp",
    };
    // const [docs, setDocs] = useState<>();
    const [loading, setLoading] = useState<boolean>(false);
    const [fileNames, setFileNames] = useState<string[]>([]);
    const navigation = useNavigation<AllStudyMaterialsScreenNavigationProp>();

    useEffect(() => {
        getFiles();
    }, []);

    const getFiles = async () => {
        const docs = (await storageInstance.ref("files/").listAll())
            .items as FirebaseStorageTypes.Reference[];
        const names: string[] = [];
        docs.forEach((file) => {
            names.push(file.name);
        });
        setFileNames(names);
    };

    const confirmDownload = (name: string) => {
        Alert.alert(
            "Download File?",
            "Are you sure you want to download " + name + "?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Download",
                    onPress: () => downloadFile(name),
                    style: "default",
                },
            ],
            { cancelable: true }
        );
    };

    const downloadFile = async (name: string) => {
        const downloadTo = RNFS.DownloadDirectoryPath + "/" + name;
        console.log(RNFS.DownloadDirectoryPath);
        if (await checkManagePermission()) {
            console.log("Permissions Granted");
        } else {
            await requestManagePermission();
        }

        if (await checkManagePermission()) {
            await storageInstance
                .ref("files/" + name)
                .writeToFile(downloadTo)
                .catch((error) => {
                    Alert.alert("Failed to download file", error.message);
                });
        } else {
            Alert.alert("Missing Required Permissions");
        }
    };

    const renderItem = ({ item }: { item: string }) => {
        return (
            <View style={styles.materialsContainer}>
                <Text style={styles.quizQuestionText}>{item}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => confirmDownload(item)}
                >
                    <Text style={styles.buttonText}>Download</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.background}>
            <ImageBackground
                resizeMode="cover"
                source={image}
                style={styles.image}
            >
                <Text style={styles.brand}>All Study Materials</Text>
                <Text />

                <FlatList
                    data={fileNames}
                    onRefresh={getFiles}
                    renderItem={renderItem}
                    refreshing={loading}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("StudyMaterialsScreen")}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <Text />
            </ImageBackground>
        </View>
    );
}

export default AllStudyMaterialsScreen;
