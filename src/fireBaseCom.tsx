import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB906OhepAbiFJMtZYHdzRJjnb8j0xCvYc",
    authDomain: "factfinder-f2dd7.firebaseapp.com",
    projectId: "factfinder-f2dd7",
    storageBucket: "factfinder-f2dd7.appspot.com",
    messagingSenderId: "690785494463",
    appId: "1:690785494463:web:606a9943ce5f65bf8ced0a",
    measurementId: "G-EEMT08FVMW"
  })

const db: firebase.firestore.Firestore = firebaseApp.firestore()

const auth: any = firebase.auth();

export { db, auth}