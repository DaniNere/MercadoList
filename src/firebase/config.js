import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAexKU14Jh8elupR8nu2fGAjRMKg68AH5o",
  authDomain: "mercadolist-soulcode.firebaseapp.com",
  projectId: "mercadolist-soulcode",
  storageBucket: "mercadolist-soulcode.appspot.com",
  messagingSenderId: "482514735818",
  appId: "1:482514735818:web:f1fbcf53c43460f4369a33",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
