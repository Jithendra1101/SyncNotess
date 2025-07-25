"use client";
import { useRoom, useSelf } from "@liveblocks/react";
import { useState } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Button } from "@/components/ui/button";
import { MoonIcon,SunIcon } from "lucide-react";
import { useEffect } from "react";
import {BlockNoteView} from "@blocknote/shadcn";
import { BlockNoteEditor} from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import  stringToColor  from "@/lib/stringToColor";


type EditorProps = {
    doc: Y.Doc;
    provider: any;
    darkMode: boolean;
};


function BlockNote({doc, provider, darkMode}: EditorProps) {

    const userInfo =useSelf((me) => me.info);
    const editor : BlockNoteEditor = useCreateBlockNote({
        collaboration:{
            provider,

            fragment: doc.getXmlFragment("document-store"),
            user:{
                name: userInfo?.name ?? "Anonymous",
                color:stringToColor(userInfo?.email ?? "default@example.com"),
            },
        },
    });




    return(
        <div className="relative max-w-6xl mx-auto">
            <BlockNoteView
        className="min-h-screen"
        editor={editor}
        theme={darkMode ? "dark" : "light"}
        
        
        /></div>
    );
}



function Editor() {

    const room = useRoom();
    const [doc,setDoc] = useState<Y.Doc>();
    const[provider,setProvider] = useState<LiveblocksYjsProvider>();
    const[darkMode,setDarkMode] = useState(false);
    const style = darkMode ? "bg-gray-800 text-white" : "bg-white text-black";
    useEffect(() =>{
        const yDoc = new Y.Doc();
        const yProvider = new LiveblocksYjsProvider(room, yDoc);

        setDoc(yDoc);
        setProvider(yProvider);
        return () => {
            yDoc.destroy();
            yProvider.destroy();
        };

    },[room])


    if (!doc || !provider) {
        return null;}

  return (
    <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 justify-end mb-10">




{/* 
    translatedocumetn
    chat to document  */}


    <Button className={style} onClick={() => setDarkMode(!darkMode)}>
    {darkMode ? <SunIcon/> : <MoonIcon/>}
    </Button>



    </div>

    <BlockNote doc={doc} provider ={provider} darkMode={darkMode}/>
    </div>
  )
}

export default Editor