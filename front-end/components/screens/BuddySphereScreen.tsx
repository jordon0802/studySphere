import React from "react";
import { View, Button, StyleSheet, Text, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import styles from "../styles";

type BuddySphereScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "BuddySphereScreen">;

export default function HomeScreen() {
  const image = {uri: "https://wallpapers.com/images/high/bubbles-phone-mxbajctl63dkrkmx.webp"};
  const navigation = useNavigation<BuddySphereScreenNavigationProp>();

    return (
      <View style={styles.background}>
        <ImageBackground resizeMode="cover" source={image} style={styles.image}>
          <Text style={styles.brand}>BuddySphere</Text>
          <Text />

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MyFriendsScreen")}>
            <Text style={styles.buttonText}>My Friends</Text>
          </TouchableOpacity>
          <Text />

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("FindFriendsScreen")}>
            <Text style={styles.buttonText}>Find Friends</Text>
          </TouchableOpacity>
          <Text />

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("FriendRequestScreen")}>
            <Text style={styles.buttonText}>Friend Requests</Text>
          </TouchableOpacity>
          <Text />

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("HomeScreen")}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
}