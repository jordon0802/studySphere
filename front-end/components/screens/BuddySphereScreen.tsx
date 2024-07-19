import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type BuddySphereScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "BuddySphereScreen">;

export default function HomeScreen() {
  const navigation = useNavigation<BuddySphereScreenNavigationProp>();

    return (
      <View style={styles.container}>
        <Text style={styles.title}>BuddySphere</Text>
        <Button title="My Friends" onPress={() => navigation.navigate('MyFriendsScreen')} />
        <Button title="Find Friends" onPress={() => navigation.navigate('FindFriendsScreen')} />
        <Button title="Friend Request" onPress={() => navigation.navigate('FriendRequestScreen')} />
        <Button title="Home" onPress={() => navigation.navigate('HomeScreen')} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
  });