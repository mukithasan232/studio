import { initializeApp, getApp, getApps, FirebaseOptions } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, browserLocalPersistence } from "firebase/auth";

let firebaseApp, auth, db;

try {
  const firebaseConfigStr = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;
  if (!firebaseConfigStr) {
    throw new Error("NEXT_PUBLIC_FIREBASE_CONFIG is not set. The application will not work without it.");
  }
  const firebaseConfig: FirebaseOptions = JSON.parse(firebaseConfigStr);

  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApp();
  }

  // Use initializeAuth for better control, especially in different environments
  auth = initializeAuth(firebaseApp, {
    // This helps with persistence across browser tabs.
    persistence: browserLocalPersistence
  });
  
  // Use initializeFirestore to avoid potential issues in some environments
  db = initializeFirestore(firebaseApp, {});

} catch (e) {
  console.error("Firebase initialization error", e);
  // Set to null so other parts of the app can check for it
  firebaseApp = null;
  auth = null;
  db = null;
}

export { db, auth, firebaseApp };
