import { firebase } from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDWiWik3wbc8deUBdTfOcti9v8UW-g5K1A",
    authDomain: "studysphere-f1d2f.firebaseapp.com",
    projectId: "studysphere-f1d2f",
    storageBucket: "studysphere-f1d2f.appspot.com",
    messagingSenderId: "743500797865",
    appId: "1:743500797865:android:807ad5e1b1edb0b8c856b8"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
