import React from 'react';
import { View, Button, StyleSheet, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import styles from '../styles';

type BuddySphereScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "BuddySphereScreen">;

export default function HomeScreen() {
  const image = {uri: "https://wallpapers.com/images/high/dark-blue-background-water-bubbles-k7xwvjs2dnta8dqk.webp"};
  const navigation = useNavigation<BuddySphereScreenNavigationProp>();

    return (
      <View style={styles.background}>
        <ImageBackground resizeMode="cover" source={image} style={styles.image}>
          <Text style={styles.brand}>BuddySphere</Text>
          <Text />
          <Button title="My Friends" onPress={() => navigation.navigate('MyFriendsScreen')} />
          <Text />
          <Button title="Find Friends" onPress={() => navigation.navigate('FindFriendsScreen')} />
          <Text />
          <Button title="Friend Request" onPress={() => navigation.navigate('FriendRequestScreen')} />
          <Text />
          <Button title="Back" onPress={() => navigation.navigate('HomeScreen')} />
        </ImageBackground>
      </View>
    );
}