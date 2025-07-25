"use client";

import NewDocumentButton from "./NewDocumentbutton"
import { Button } from "@/components/ui/button";  
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import SidebarOption from "./SidebarOptions"
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { collectionGroup, DocumentData, query, where } from "firebase/firestore";
import { Menu } from "lucide-react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";


interface RoomDocument extends DocumentData {
  userId: string;
  role: "owner" | "editor";
  createdAt: string;
  roomId: string;
}


function Sidebar() {
  const { user } = useUser();
  const [groupData, setGroupData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });

const [data, loading, error] = useCollection(
  user?.emailAddresses?.[0]
    ? query(
        collectionGroup(db, 'rooms'),
        where('userId', '==', user.emailAddresses[0].emailAddress)
      )
    : null
);


  useEffect(() => {
    if (!data) return;
    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        if (roomData.role === "owner") {
          acc.owner.push({
            id: curr.id,
            ...roomData
          });
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData
          });
        }
        return acc;
      },
      { owner: [], editor: [] }
    );
    setGroupData(grouped);
  }, [data]);

  const menuOptions = (
    <>
      <NewDocumentButton />
      <div className="flex py-4 flex-col space-y4 md:max-w-36 pd-2">
        {groupData.owner.length === 0 ? (
          <h2 className="text-black-500 font-semibold text-sm">
            No Documents Found
          </h2>
        ) : (
          <>
            <h2 className="text-black-500 font-semibold text-sm mb-2">
              My Documents
            </h2>
            {groupData.owner.map((doc) => (
              <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
            ))}
          </>
        )}
      </div>

      {groupData.editor.length > 0 && (
        <div className="flex py-4 flex-col space-y-4 md:max-w-36">
          <h2 className="text-grey-500 font-semibold text-sm">
            Shared with Me
          </h2>
          {groupData.editor.map((doc) => (
            <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className="p-2 md:p-5 bg-gray-150 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu strokeWidth={2.25} />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>
                {menuOptions}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:inline">
        {menuOptions}
      </div>
    </div>
  )
}

export default Sidebar;
