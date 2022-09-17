import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlagOfcAu-tk4WUA9tHMturgNim-Ydk_Y",
  authDomain: "hacktoon2.firebaseapp.com",
  projectId: "hacktoon2",
  storageBucket: "hacktoon2.appspot.com",
  messagingSenderId: "1072869583781",
  appId: "1:1072869583781:web:28dbc4ecfd4ded9c30164c",
  measurementId: "G-63GD850E6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;