import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDGMhCmYdCB9b1TJEcUBUPMk_ao4HKb9po",
    authDomain: "administrador-926be.firebaseapp.com",
    projectId: "administrador-926be",
    storageBucket: "administrador-926be.appspot.com",
    messagingSenderId: "48953394743",
    appId: "1:48953394743:web:f971e4b4e9ace56e6661b2"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}

  