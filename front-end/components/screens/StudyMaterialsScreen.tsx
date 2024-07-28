import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import {
    FlatList,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";

type StudyMaterialsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "StudyMaterialsScreen"
>;

function StudyMaterialsScreen() {
    const image = {
        uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp",
    };
    const navigation = useNavigation<StudyMaterialsScreenNavigationProp>();

    return (
        <View style={styles.background}>
            <ImageBackground
                resizeMode="cover"
                source={image}
                style={styles.image}
            >
                <Text style={styles.brand}>Study Materials</Text>
                <Text />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("UploadMaterialsScreen")}
                >
                    <Text style={styles.buttonText}>
                        Upload Study Materials
                    </Text>
                </TouchableOpacity>
                <Text />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate("AllStudyMaterialsScreen")
                    }
                >
                    <Text style={styles.buttonText}>All Study Materials</Text>
                </TouchableOpacity>
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

export default StudyMaterialsScreen;
