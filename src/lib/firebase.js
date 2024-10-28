import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// Конфігурація Firebase (використовуйте свої дані з Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyCVnNHNbIxLe_zhoqrzVIhibmScg8lTTdM",
  authDomain: "insortex-adb58.firebaseapp.com",
  projectId: "insortex-adb58",
  storageBucket: "insortex-adb58.appspot.com",
  messagingSenderId: "426044418125",
  appId: "1:426044418125:web:138670b536c0af6ef51404",
  measurementId: "G-W7S7WFHY56",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const auth = getAuth(app);
export { storage };
