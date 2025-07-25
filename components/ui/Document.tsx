"use client"





import {FormEvent, useEffect, useState as usestate, useTransition} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {updateDoc, doc} from "firebase/firestore";
import {db} from "@/firebase";
import{useDocumentData} from "react-firebase-hooks/firestore";
import Editor from "./Editor";





function Document({id}:{id:string}) {
  const [data, loading,error] = useDocumentData(doc(db,"documents",id));
  const [input,setInput] = usestate("");
  // const isowner = useOwner();
  const [isUpdating,startTransition] = useTransition();

  useEffect(() => {
    if(data){
      setInput(data.title);
    } 
  },[data])



  const updateTitle =(e:FormEvent) =>
  {e.preventDefault();
    if(input.trim()){
      startTransition(async() =>{
        await  updateDoc(doc(db,"documents",id),{
          title:input,
        });
      })
    }
  }

  return (
    <div>
      <div className="flex max-w-6xl mx-auto justify-between pb-5">
      <form className="flex flex-1 space-x-2"onSubmit={updateTitle}>
      <Input value={input} onChange={(e) => setInput(e.target.value)}/>
      <Button disabled={isUpdating} type="submit">{isUpdating ? "Updating.." : "Update"}</Button>
      </form>
      </div>
    
    {/*update title section*/}
    
    <div>
      {/* Manage users section */}
      {/*avaters of active users*/}
      
    </div>

    <hr className="pb-10"/>
      {/*collabrative editor section*/}
      <Editor/>

    </div>
  )
}

export default Document