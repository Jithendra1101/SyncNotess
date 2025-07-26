import {NextRequest, NextResponse} from 'next/server';
import {auth} from "@clerk/nextjs/server";
import liveblocks from "@/lib/liveblocks";
import { adminDb } from '@/firebase-admin';
export async function POST(request: NextRequest) {
  if (!liveblocks) {
    return new Response("Liveblocks not configured", { status: 500 });
  }

  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  // You can add more logic here if needed, like fetching user data or other operations

  const {sessionClaims}= await auth();
  
  let room;
  try {
    const body = await request.json();
    room = body.room;
  } catch (error) {
    return new Response("Invalid JSON in request body", { status: 400 });
  }

  if (!room) {
    return new Response("Room parameter is required", { status: 400 });
  }


  const session = liveblocks.prepareSession(sessionClaims?.email!,{
    userInfo:{
        name:sessionClaims?.fullName!,
        email:sessionClaims?.email!,
        avatar:sessionClaims?.image!,
    }
  });
  const usersInRoom = await adminDb.collection("rooms")
  .where("userId","==", sessionClaims?.email!)
  .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id ===room);
  if (userInRoom?.exists){
    session.allow(room,session.FULL_ACCESS);
    const{body,status}= await session.authorize();
    console.log('You are authorized to access this room:', room);
    return new Response(body,{status});
  }
  else{
    return NextResponse.json(
        {message: "You are not authorized to access this room"},
        {status: 403}
    );
  }


}
