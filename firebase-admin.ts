import { initializeApp,App,getApps,cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceKey = process.env.FIREBASE_ADMIN_SDK_CREDENTIALS 
    ? JSON.parse(process.env.FIREBASE_ADMIN_SDK_CREDENTIALS)
    : null;

if (!serviceKey) {
    throw new Error("FIREBASE_ADMIN_SDK_CREDENTIALS environment variable is not set");
}

let app: App;

if (getApps().length === 0) {
    app = initializeApp({
        credential: cert(serviceKey),
    });
} else {
    app = getApps()[0];
}

const adminDb = getFirestore(app);
export { app as adminApp, adminDb };
