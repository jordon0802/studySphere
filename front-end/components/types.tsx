    import type { NativeStackScreenProps } from "@react-navigation/native-stack";

    export type RootStackParamList = {
        RegisterScreen : undefined;
        LoginScreen: undefined;
        HomeScreen: undefined;
        ProfileScreen : undefined;
        Quiz : undefined;
        Flashcard : undefined;
        StudyPlanScreen : undefined;
        NotesScreen : undefined;
    };

    export type RegisterScreenProps = NativeStackScreenProps<
        RootStackParamList,
        "RegisterScreen"
    >;

    export type LoginScreenProps = NativeStackScreenProps<
        RootStackParamList,
        "LoginScreen"
    >;

    export type HomeScreenProps = NativeStackScreenProps<
        RootStackParamList,
        "HomeScreen"
    >;

    export type ProfileScreenProps = NativeStackScreenProps<
        RootStackParamList,
        "ProfileScreen"
    >;

    export type QuizProps = NativeStackScreenProps<
        RootStackParamList,
        "Quiz"
    >;

    
    export type FlashcardProps = NativeStackScreenProps<
        RootStackParamList,
        "Flashcard"
    >;

    export type StudyPlanScreenProps = NativeStackScreenProps<
        RootStackParamList,
        "StudyPlanScreen"
    >;

    export type NotesScreenProps = NativeStackScreenProps<
        RootStackParamList,
        "NotesScreen"
    >;


