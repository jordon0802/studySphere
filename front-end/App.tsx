import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { RootStackParamList } from './components/types';
import RegisterScreen from './components/screens/RegisterScreen';
import LoginScreen from './components/screens/LoginScreen';
import HomeScreen from './components/screens/HomeScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import QuizScreen from './components/screens/QuizScreen';
import MyFlashcardsScreen from './components/screens/MyFlashcardsScreen';
import FlashcardMainScreen from './components/screens/FlashcardMainScreen';
import NewFlashcardScreen from './components/screens/NewFlashcardScreen';
import StudyPlanScreen from './components/screens/StudyPlan';
import NotesScreen from './components/screens/NotesScreen';
import FlashcardScreen from './components/screens/FlashcardScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();


function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='RegisterScreen' screenOptions={{headerShown: false}}>

                <Stack.Screen 
                    name="MyFlashcardsScreen"
                    component={MyFlashcardsScreen}
                />

                <Stack.Screen 
                    name="NewFlashcardScreen"
                    component={NewFlashcardScreen}
                />
                
                <Stack.Screen 
                    name="FlashcardMainScreen"
                    component={FlashcardMainScreen}
                />

                <Stack.Screen
                    name="FlashcardScreen"
                    component={MyFlashcardsScreen}
                />

                <Stack.Screen
                    name='HomeScreen'
                    component={HomeScreen}
                />

                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                />

                <Stack.Screen
                    name="NotesScreen"
                    component={NotesScreen}
                />

                <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                />
                
                <Stack.Screen
                    name="QuizScreen"
                    component={QuizScreen}
                />
                
                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                />
                
                <Stack.Screen
                    name='StudyPlanScreen'
                    component={StudyPlanScreen}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};



export default App;


