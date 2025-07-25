'use client'
import LivecursorProvider from "./LivecursorProvider";
import  LoadingSpinner  from "@/components/ui/LoadingSpinner";
import { ClientSideSuspense,RoomProvider as RoomProviderWrapper} from "@liveblocks/react";
function RoomProvider({roomId,children}:{roomId:string,children:React.ReactNode}) {
  return (
    <RoomProviderWrapper
    id={roomId}
    initialPresence={{
            cursor:null}}
  >
    
    <ClientSideSuspense fallback={<LoadingSpinner />}>
    <LivecursorProvider>       {children}</LivecursorProvider>
    {children}
    </ClientSideSuspense>
    
    
    </RoomProviderWrapper>
  )
}

export default RoomProvider