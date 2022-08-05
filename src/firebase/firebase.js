import firebase from "firebase";
import "firebase/firestore"
import "firebase/storage"
import "firebase/auth"



const firebaseConfig = {
  apiKey: "AIzaSyBnoenaypnhp9eH6ya9eswZ_SXggwWbKt4",
  authDomain: "hogan-api-60105.firebaseapp.com",
  projectId: "hogan-api-60105",
  storageBucket: "hogan-api-60105.appspot.com",
  messagingSenderId: "75501472944",
  appId: "1:75501472944:web:8806de3f679c30679a7f75",
  measurementId: "G-6N7TBGYNRZ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const storage = app.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider()

export { auth, db, storage, firebase , googleProvider}