'use client'
import Document from "@/components/ui/Document";
function DocumentPage({params:{id}}:
    {
        params:{
            id: string;
        }
    }
) {
   
  return (
   <>
    <div className="flex flex-col flex-2 min-h-screen">
        <Document id={id} />
    </div>
    </>
  )
}

export default DocumentPage;