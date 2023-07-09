// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSlsQRqJa8qacYt5WiejnU7z8K7U3NbhY",
  authDomain: "myproject-6135b.firebaseapp.com",
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



