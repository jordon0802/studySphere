import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";

type UploadMaterialsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "UploadMaterialsScreen"
>;

function UploadMaterialsScreen() {
    const image = {
        uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp",
    };
    const navigation = useNavigation<UploadMaterialsScreenNavigationProp>();

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
                    onPress={() => navigation.navigate("HomeScreen")}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

export default UploadMaterialsScreen;
