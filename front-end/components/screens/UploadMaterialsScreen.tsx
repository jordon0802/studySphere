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
import DocumentPicker, {
    DocumentPickerResponse,
} from "react-native-document-picker";
import { storageInstance } from "../Firebase";
import RNFetchBlob from "rn-fetch-blob";
import { useState } from "react";
import {
    checkManagePermission,
    requestManagePermission,
} from "manage-external-storage";

type UploadMaterialsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "UploadMaterialsScreen"
>;

function UploadMaterialsScreen() {
    const image = {
        uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp",
    };
    const navigation = useNavigation<UploadMaterialsScreenNavigationProp>();
    const [fileNames, setFileNames] = useState<string[]>([]);
    const [uri, setUri] = useState<string[]>([]);

    var blob: string = "";
    var documents: DocumentPickerResponse[] = [];

    const pickDocument = async () => {
        try {
            documents = await DocumentPicker.pick({
                allowMultiSelection: true,
            });
            const len = documents.length;
            const names: string[] = [];
            const uris: string[] = [];
            for (var i = 0; i < len; i++) {
                names.push(documents[i].name as string);
                uris.push(documents[i].uri as string);
            }
            setFileNames(names);
            setUri(uris);
        } catch (error) {
            console.log("error: " + error);
        }
    };

    const confirmUpload = () => {
        Alert.alert(
            "Upload File(s)?",
            "Are you sure you want to upload the following file(s)?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Upload",
                    onPress: () => uploadDocument(),
                    style: "default",
                },
            ],
            { cancelable: true }
        );
    };

    const uploadDocument = async () => {
        try {
            console.log("uploadDocument called");
            const len = uri.length;
            console.log("doc len: " + len);
            for (var i = 0; i < len; i++) {
                blob = (await RNFetchBlob.fs.stat(uri[i])).path;

                if (await checkManagePermission()) {
                    console.log("Permissions Granted");
                } else {
                    await requestManagePermission();
                }

                if (await checkManagePermission()) {
                    await storageInstance
                        .ref("files/" + fileNames[i])
                        .putFile(blob)
                        .then((snapshot) => {
                            console.log("Upload Success");
                        })
                        .catch((e) => console.log("error: " + e))
                        .finally(() =>
                            navigation.navigate("StudyMaterialsScreen")
                        );
                } else {
                    Alert.alert("Missing Required Permissions");
                }
            }
        } catch (error) {
            console.log("error: " + error);
        }
    };

    const renderNames = ({ item }: { item: string }) => {
        return <Text style={styles.textOutput}>{item}</Text>;
    };

    return (
        <View style={styles.background}>
            <ImageBackground
                resizeMode="cover"
                source={image}
                style={styles.image}
            >
                <Text style={styles.brand}>Upload Study Materials</Text>
                <Text />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => pickDocument()}
                >
                    <Text style={styles.buttonText}>Select file to upload</Text>
                </TouchableOpacity>
                <Text />

                <FlatList data={fileNames} renderItem={renderNames} />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => confirmUpload()}
                >
                    <Text style={styles.buttonText}>Upload</Text>
                </TouchableOpacity>
                <Text />

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

export default UploadMaterialsScreen;
