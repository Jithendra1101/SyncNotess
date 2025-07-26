'use client';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createNewDocument } from "@/actions/actions";
import { useTransition } from "react";
import { useUser } from "@clerk/nextjs";

function NewDocumentButton() {
    const { user, isSignedIn } = useUser();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleCreateNewDocument = () => {
        if (!isSignedIn) {
            router.push('/sign-in');
            return;
        }

        startTransition(async () => {
            try {
                const { docId } = await createNewDocument();
                router.push(`/doc/${docId}`);
            } catch (error) {
                console.error("Error creating document:", error);
                alert("Failed to create document. Please try again.");
            }
        });
    };

    return (
        <Button 
            onClick={handleCreateNewDocument} 
            disabled={isPending}
            className="w-full"
        >
            {isPending ? "Creating..." : "New Document"}
        </Button>
    );
}

export default NewDocumentButton;