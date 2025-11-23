import { initializeApp, getApp, getApps, FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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

// The explicit sign-in flow will be handled by our UI components.
// We no longer need to sign in anonymously here.

export { db, auth, app as firebaseApp };
