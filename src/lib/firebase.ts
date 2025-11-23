import { initializeApp, getApp, getApps, FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// The environment variable isn't being picked up reliably in the dev environment.
// For this prototype, we'll hardcode the config to ensure connectivity.
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCLDIX2Zhwedm1yDH4ErHPWh5LrB6W8Xxw",
  authDomain: "studio-679351035-58c98.firebaseapp.com",
  projectId: "studio-679351035-58c98",
  storageBucket: "studio-679351035-58c98.appspot.com",
  messagingSenderId: "1000712197366",
  appId: "1:1000712197366:web:8b5983ef2cf53a5208c8d7"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app as firebaseApp };
