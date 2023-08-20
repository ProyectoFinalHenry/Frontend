// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaq8Q_GpPGGzB-5QzoghkeF4WSiEQ0UPs",
  authDomain: "grano-de-oro-230b3.firebaseapp.com",
  projectId: "grano-de-oro-230b3",
  storageBucket: "grano-de-oro-230b3.appspot.com",
  messagingSenderId: "224727169727",
  appId: "1:224727169727:web:4593d16214066139fee40a"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)