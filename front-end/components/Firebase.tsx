import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import "@react-native-firebase/analytics";
import "@react-native-firebase/storage";

// Initialize Firestore
const firestoreInstance = firebase.firestore();

// Initialize Analytics
const analyticsInstance = firebase.analytics();

// Initialize Storage
const storageInstance = firebase.storage();

export { firebase, firestoreInstance, analyticsInstance, storageInstance };
