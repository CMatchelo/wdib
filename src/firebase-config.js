import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDFPYQIj2vMdMBzEz7V2BbINv-ILvrSxSc",
  authDomain: "zerei-4495a.firebaseapp.com",
  databaseURL: "https://zerei-4495a-default-rtdb.firebaseio.com",
  projectId: "zerei-4495a",
  storageBucket: "zerei-4495a.appspot.com",
  messagingSenderId: "577891053333",
  appId: "1:577891053333:web:5844d55d79501613a7831c"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)