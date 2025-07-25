import { initializeApp,App,getApps,cert } from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";


const serviceKey = JSON.parse(process.env.FIREBASE_ADMIN_SDK_CREDENTIALS || '{}');
let app: App;

if(getApps().length === 0) {
app = initializeApp({
    credential: cert(serviceKey),
    });
} else {
    app = getApps()[0];
}

const adminDb = getFirestore(app);
export { app as adminapp,adminDb };
