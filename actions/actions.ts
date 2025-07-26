'use server';
import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createNewDocument() {
    const { sessionClaims } = await auth();
    
    if (!sessionClaims?.email) {
        throw new Error("User not authenticated");
    }

    try {
        const docCollectionRef = adminDb.collection("documents");
        const docRef = await docCollectionRef.add({
            title: "New Document",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await adminDb
            .collection("users")
            .doc(sessionClaims.email)
            .collection('rooms')
            .doc(docRef.id)
            .set({
                userId: sessionClaims.email,
                role: "owner",
                createdAt: new Date(),
                roomId: docRef.id,
            });

        return { docId: docRef.id };
    } catch (error) {
        console.error("Error creating document:", error);
        throw new Error("Failed to create document");
    }
}
    const docCollectionRef =adminDb.collection("documents");
    const docRef = await docCollectionRef.add({
        title: "New Document"
    })
    await adminDb.collection("users").doc(sessionClaims?.email!).collection('rooms').doc(docRef.id).set({
        userId: sessionClaims?.email,
        role: "owner",
        cretaedAt: new Date(),
        roomId: docRef.id,
    });
    return {docId: docRef.id};

}
