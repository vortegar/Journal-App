// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();

// Your web app's Firebase configuration
//Dev/prod
// const firebaseConfig = {
//   apiKey: "AIzaSyBJqIncZdUnY3f_FDoYxfn3gKN4keRr2jM",
//   authDomain: "react-cursos-80288.firebaseapp.com",
//   projectId: "react-cursos-80288",
//   storageBucket: "react-cursos-80288.appspot.com",
//   messagingSenderId: "931817584109",
//   appId: "1:931817584109:web:d98157b811f7896073e3e4"
// };

//testing
// const firebaseConfig = {
//   apiKey: "AIzaSyB95kCtv0sU0RdirBnQVSfQ9hoEB95oubE",
//   authDomain: "prueba-c5838.firebaseapp.com",
//   projectId: "prueba-c5838",
//   storageBucket: "prueba-c5838.appspot.com",
//   messagingSenderId: "573610055529",
//   appId: "1:573610055529:web:1ded0aa17c33a218a18ff8"
// };

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

console.log(firebaseConfig)
// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );