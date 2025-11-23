import * as admin from 'firebase-admin';

let firebaseAdminApp: admin.app.App;

try {
  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccountString) {
    throw new Error('The FIREBASE_SERVICE_ACCOUNT environment variable is not set. The application will not be able to perform authenticated backend operations.');
  }
  const serviceAccount = JSON.parse(serviceAccountString);

  if (!admin.apps.length) {
    firebaseAdminApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    firebaseAdminApp = admin.apps[0]!;
  }
} catch (e) {
  console.error("Firebase Admin SDK initialization error", e);
  // This will cause admin-dependent features to fail, but the app might still run.
  // @ts-ignore
  firebaseAdminApp = null;
}

export { firebaseAdminApp };
