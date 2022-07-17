import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCD6uYRRRZdAjnDzvL5rcEhsV6UmQohlDI",
    authDomain: "chatroom-b93bf.firebaseapp.com",
    projectId: "chatroom-b93bf",
    storageBucket: "chatroom-b93bf.appspot.com",
    messagingSenderId: "329879379284",
    appId: "1:329879379284:web:dc6ee33a52bb378a797cc1"
  };

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleProvider = new firebase.auth.GoogleAuthProvider()