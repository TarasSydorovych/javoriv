import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// Конфігурація Firebase (використовуйте свої дані з Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAxUDd-rGspQ9HpZYcQC0I9_0VyXRAolXs",
  authDomain: "newjavoriv.firebaseapp.com",
  projectId: "newjavoriv",
  storageBucket: "newjavoriv.firebasestorage.app",
  messagingSenderId: "347440953186",
  appId: "1:347440953186:web:1cf004098a61524f8a1e3b",
  measurementId: "G-86PXQF00YP",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const auth = getAuth(app);
export { storage };
