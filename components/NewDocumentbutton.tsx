'use client';
import { useRouter } from "next/navigation";
import {Button} from "@/components/ui/button";
import { createNewDocument } from "@/actions/actions";
import { useTransition } from "react";
import { useUser } from "@clerk/nextjs";
import { RedirectToSignIn } from "@clerk/nextjs";


 function NewDocumentbutton() {
  //  const { user, isSignedIn } = useUser();

  // if (!isSignedIn) {
  //   // redirect to sign-in page if not authenticated
  //  return <RedirectToSignIn redirectUrl="/" />;
  // }
 const { user, isSignedIn } = useUser();
  const[isPending, StartTransition] = useTransition();

  const router = useRouter();

  const handleCreateNewDocument =  () => {
       

  if (!isSignedIn) {
    // redirect to sign-in page if not authenticated
   return <RedirectToSignIn redirectUrl="/" />;
  }

    StartTransition(async () => {
    const {docId} = await createNewDocument();
    router.push(`/doc/${docId}`);
    console.log("Creating a new document...");
    // You can add your logic here to interact with Firebase or any other service
  });
  };
  return (
   <Button onClick={handleCreateNewDocument} disabled={isPending}>
    {isPending ? "Creating..." : " New Document"}
      </Button>
  )
}

export default NewDocumentbutton


