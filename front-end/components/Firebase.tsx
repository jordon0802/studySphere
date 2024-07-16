// firebase.tsx
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';

// Initialize Firestore
const firestoreInstance = firebase.firestore();

// Initialize Analytics
const analyticsInstance = firebase.analytics();

export { firebase, firestoreInstance, analyticsInstance };
