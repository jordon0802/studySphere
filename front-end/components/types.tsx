    import type { NativeStackScreenProps } from "@react-navigation/native-stack";

    export type RootStackParamList = {
        RegisterScreen : undefined;
        LoginScreen: undefined;
        HomeScreen: undefined;
        ProfileScreen : undefined;
        QuizScreen : undefined;
        MyFlashcardsScreen : undefined;
        FlashcardMainScreen : undefined;
        NewFlashcardScreen : undefined;
        StudyPlanScreen : undefined;
        NewStudyPlanScreen : undefined;
        NotesScreen : undefined;
        BuddySphereScreen : undefined; 
        MyFriendsScreen : undefined; 
        FindFriendsScreen : undefined;
        FriendRequestScreen : undefined;
        ChatScreen: { friendId: string; friendUsername: string };
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
    
    export type MyFlashcardScreenProps = NativeStackScreenProps<
        RootStackParamList,
        "MyFlashcardsScreen"
    >;

    export type FlashcardMainScreenProps = NativeStackScreenProps<
        RootStackParamList,
        "FlashcardMainScreen"
    >;

    export type NewFlashcardScreenProps = NativeStackScreenProps<
        RootStackParamList,
        "NewFlashcardScreen"
    >;

    export type StudyPlanScreenProps = NativeStackScreenProps<
        RootStackParamList,
        "StudyPlanScreen"
    >;

    export type NewStudyPlanScreenProps = NativeStackScreenProps<
        RootStackParamList,
        "NewStudyPlanScreen"
    >;

    export type NotesScreenProps = NativeStackScreenProps<
        RootStackParamList,
        "NotesScreen"
    >;

    export type BuddySphereScreenProps = NativeStackScreenProps< 
        RootStackParamList, 
        "BuddySphereScreen" 
    >; 
 
    export type FindFriendsScreenProps = NativeStackScreenProps< 
        RootStackParamList, 
        "FindFriendsScreen" 
    >; 
 
    export type MyFriendsScreenProps = NativeStackScreenProps< 
        RootStackParamList, 
        "MyFriendsScreen" 
    >;

    export type FriendRequestScreenProps = NativeStackScreenProps< 
        RootStackParamList, 
        "FriendRequestScreen" 
    >;

    export type ChatScreenProps = NativeStackScreenProps< 
        RootStackParamList, 
        "ChatScreen" 
>;
    


