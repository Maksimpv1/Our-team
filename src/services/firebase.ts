import { getFirestore } from "@firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDc0ZU-QAvTqDcvvtsETovUQdl34hqCzjE",
    authDomain: "test-alfai.firebaseapp.com",
    projectId: "test-alfai",
    storageBucket: "test-alfai.appspot.com",
    messagingSenderId: "749594729502",
    appId: "1:749594729502:web:d095ffd8fa0f85fcdb220f",
    measurementId: "G-2TKNYEZ47Q"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbFirebase = getFirestore(app); 

export { auth, dbFirebase };