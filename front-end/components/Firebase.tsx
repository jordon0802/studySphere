import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/analytics';

// Initialize Firestore
const firestoreInstance = firebase.firestore();

// Initialize Analytics
const analyticsInstance = firebase.analytics();

export { firebase, firestoreInstance, analyticsInstance };