import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    StudySphere: undefined;
    Profile : {name: string};
};

export type StudySphereProps = NativeStackScreenProps<
    RootStackParamList,
    "StudySphere"
>;

export type ProfileScreenProps = NativeStackScreenProps<
    RootStackParamList,
    "Profile"
>;