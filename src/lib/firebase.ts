import { initializeApp, getApp, getApps, FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfigString = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;

let firebaseConfig: FirebaseOptions | null = null;

if (firebaseConfigString) {
    try {
        firebaseConfig = JSON.parse(firebaseConfigString);
    } catch (e) {
        console.error("Could not parse NEXT_PUBLIC_FIREBASE_CONFIG. Make sure it's a valid JSON string.", e);
    }
} else {
    console.warn("Firebase config not found. Please set the NEXT_PUBLIC_FIREBASE_CONFIG environment variable.");
}

const app = firebaseConfig && !getApps().length ? initializeApp(firebaseConfig) : (getApps().length > 0 ? getApp() : null);

const db = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;

if (auth) {
    signInAnonymously(auth).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Anonymous sign-in failed (${errorCode}): ${errorMessage}`);
    });
}

export { db, auth };
