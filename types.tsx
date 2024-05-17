import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Home: undefined;
    Profile : {name: string};
};

export type HomeScreenProps = NativeStackScreenProps<
    RootStackParamList,
    "Home"
>;

export type ProfileScreenProps = NativeStackScreenProps<
    RootStackParamList,
    "Profile"
>;