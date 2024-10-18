// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBrYFrlOnw15YF96L8O3ffU2xtGI_eMcQg",
    authDomain: "usermanagment-4b450.firebaseapp.com",
    projectId: "usermanagment-4b450",
    storageBucket: "usermanagment-4b450.appspot.com",
    messagingSenderId: "381781317094",
    appId: "1:381781317094:web:24acfafd59c1710cf43227",
    measurementId: "G-9E40CKFCF7"
  };;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
