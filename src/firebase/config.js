// Import the functions you need from the SDKs you need
import app from "firebase/app";
import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqroYbgcHXpdYV0sjM2tUTb_LP6Q4UfUA",
  authDomain: "proyecto-integ-68431.firebaseapp.com",
  projectId: "proyecto-integ-68431",
  storageBucket: "proyecto-integ-68431.appspot.com",
  messagingSenderId: "1036719500817",
  appId: "1:1036719500817:web:b074e3a245b00f44d54bb0"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();