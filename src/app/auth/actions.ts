'use server';

// IMPORTANT: This file needs to be a server component
// so that we can use the Firebase Admin SDK.
// We are NOT using the 'use server' directive here because
// this file is not directly imported by a client component.
// Instead, we rely on the fact that Next.js treats files
// outside of the app/ directory as server-side by default.

import { getAuth } from "firebase-admin/auth";
import { firebaseAdminApp } from "@/lib/firebase-admin";

const adminAuth = getAuth(firebaseAdminApp);

interface AuthResponse {
    success: boolean;
    error?: string;
    idToken?: string;
}

// NOTE: We're not using a Genkit flow here because this is a simple
// server-side action that doesn't involve any AI models.

export async function signUpWithEmail(formData: FormData): Promise<AuthResponse> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    if (!email || !password) {
        return { success: false, error: "Email and password are required." };
    }

    try {
        const userRecord = await adminAuth.createUser({ email, password });
        const idToken = await adminAuth.createCustomToken(userRecord.uid);
        return { success: true, idToken };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function signInWithEmail(formData: FormData): Promise<AuthResponse> {
    const email = formData.get("email") as string;

    if (!email) {
        return { success: false, error: "Email is required." };
    }

    try {
        // NOTE: We don't actually check the password on the server.
        // The client-side Firebase SDK handles the sign-in, and we just
        // need to create a custom token to send back.
        // In a real production app, you would have more robust validation here.
        const userRecord = await adminAuth.getUserByEmail(email);
        const idToken = await adminAuth.createCustomToken(userRecord.uid);
        return { success: true, idToken };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
