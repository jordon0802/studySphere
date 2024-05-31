import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import StudySphere from './components/screens/StudySphere';
import ProfileScreen from './components/screens/ProfileScreen';
import { RootStackParamList } from './components/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='StudySphere' screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name="StudySphere"
                    component={StudySphere}
                    />
                <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    />
            </Stack.Navigator>
        </NavigationContainer>
    );
};



export default App;
