// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcILGtbfARyWvQb5U5I0bcdTZyaxNs0MQ",
  authDomain: "clone-c09d0.firebaseapp.com",
  projectId: "clone-c09d0",
  storageBucket: "clone-c09d0.firebasestorage.app",
  messagingSenderId: "1008231307692",
  appId: "1:1008231307692:web:31c8f5e9e322ab33b58209",
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
