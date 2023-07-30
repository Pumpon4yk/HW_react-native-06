import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import {
//   API_KEY,
//   AUTH_DOMAIN,
//   PROJECT_ID,
//   STORAGE_BUCKET,
//   MESSAGING_SENDER_ID,
//   APP_ID,
//   MEASUREMENT_ID,
//   DATABASE_URL
// } from "@env";

const firebaseConfig = {
  // apiKey: API_KEY,
  // authDomain: AUTH_DOMAIN,
  // databaseURL: DATABASE_URL,
  // projectId:  PROJECT_ID,
  // storageBucket: STORAGE_BUCKET,
  // messagingSenderId: MESSAGING_SENDER_ID,
  // appId: APP_ID,
  // measurementId: MEASUREMENT_ID

  apiKey: "AIzaSyCSlsQRqJa8qacYt5WiejnU7z8K7U3NbhY",
  authDomain: "myproject-6135b.firebaseapp.com",
  databaseURL: "https://myproject-6135b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "myproject-6135b",
  storageBucket: "myproject-6135b.appspot.com",
  messagingSenderId: "111699265339",
  appId: "1:111699265339:web:b71342e978ef55a906191e",
  measurementId: "G-82STE4R5XF"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);



