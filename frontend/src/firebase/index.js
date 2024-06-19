import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDbVk_4RZN0T8nLB9BPKVJbR1h5tIwwka0",
  authDomain: "nubanksakaue.firebaseapp.com",
  projectId: "nubanksakaue",
  storageBucket: "nubanksakaue.appspot.com",
  messagingSenderId: "993065443782",
  appId: "1:993065443782:web:93f1e06672a8f5334712c7",
  measurementId: "G-LGJEWNY1V9"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);