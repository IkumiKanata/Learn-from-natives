import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB5TYufQVlkVtADAlS_xhVL2oL4k3HHyak",
    authDomain: "learn-from-natives.firebaseapp.com",
    projectId: "learn-from-natives",
    storageBucket: "learn-from-natives.appspot.com",
    messagingSenderId: "738772907323",
    appId: "1:738772907323:web:3debff946ad22f1ed3b31e",
    measurementId: "G-T778FW5NZ1"
};
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;