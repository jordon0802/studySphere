import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    StudySphere : undefined;
    ProfileScreen : { name : String };
    Quiz : { name : String};
};

export type StudySphereProps = NativeStackScreenProps<
    RootStackParamList,
    "StudySphere"
>;

export type ProfileScreenProps = NativeStackScreenProps<
    RootStackParamList,
    "ProfileScreen"
>;

export type QuizProps = NativeStackScreenProps<
    RootStackParamList,
    "Quiz"
>;
