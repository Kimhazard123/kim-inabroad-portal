import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD67YC2-9S6o7vchSMdZu9R3fSEYVHy5hY",
  authDomain: "kim-inabroad-portal.firebaseapp.com",
  projectId: "kim-inabroad-portal",
  storageBucket: "kim-inabroad-portal.firebasestorage.app",
  messagingSenderId: "632952970387",
  appId: "1:632952970387:web:15e044132d922b66278166",
  measurementId: "G-MLL8H1RD3M",
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;