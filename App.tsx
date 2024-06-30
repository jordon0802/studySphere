import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { RootStackParamList } from './components/types';
import RegisterScreen from './components/screens/RegisterScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import Quiz from './components/screens/Quiz';
import LoginScreen from './components/screens/LoginScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='RegisterScreen' screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    />
                <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    />
                <Stack.Screen
                    name='Quiz'
                    component={Quiz}
                    />
            </Stack.Navigator>
        </NavigationContainer>
    );
};



export default App;
