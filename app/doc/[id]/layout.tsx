import { auth } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";
import  RoomProvider  from "@/components/ui/RoomProvider";


export default async function DocLayout({children,params:{id}}:{children:React.ReactNode,params:{id:string}}) {
  const { userId } =await auth();

  if (!userId) {
    // redirect to sign-in page if not authenticated
   return <RedirectToSignIn redirectUrl={`/doc/${id}`} />;
  }

  return (
   <RoomProvider roomId={id}>
     {children}
   </RoomProvider>
  );
}
