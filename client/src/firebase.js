import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBlYBrlZRaYQDPuozgM5q0yXjaw4RVqA1U",
    authDomain: "heartout-mern.firebaseapp.com",
    projectId: "heartout-mern",
    storageBucket: "heartout-mern.appspot.com",
    messagingSenderId: "455500742194",
    appId: "1:455500742194:web:1f92ad1316fdcf9319062b",
    measurementId: "G-9EWB7EKZF1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();

export { auth, provider };
export default db;