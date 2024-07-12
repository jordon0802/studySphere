    import type { NativeStackScreenProps } from "@react-navigation/native-stack";

    export type RootStackParamList = {
        RegisterScreen : undefined;
        LoginScreen: undefined;
        HomeScreen: undefined;
        ProfileScreen : undefined;
        QuizScreen : undefined;
        FlashcardScreen : undefined;
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

    export type QuizScreenProps = NativeStackScreenProps<
        RootStackParamList,
        "QuizScreen"
    >;
    
    export type FlashcardScreenProps = NativeStackScreenProps<
        RootStackParamList,
        "FlashcardScreen"
    >;

    export type StudyPlanScreenProps = NativeStackScreenProps<
        RootStackParamList,
        "StudyPlanScreen"
    >;

    export type NotesScreenProps = NativeStackScreenProps<
        RootStackParamList,
        "NotesScreen"
    >;


