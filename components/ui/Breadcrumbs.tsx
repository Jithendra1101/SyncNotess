'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import { Fragment } from "react";
function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/');
  return (
    <div>
   <Breadcrumb>
   <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
     
    {segments.map((segment, index) => {
      if (segment === "") return null; // Skip empty segments
      const href = `/${segments.slice(0, index + 1).join('/')}`;
        const isLast = index === segments.length - 1;
      return (
        <Fragment key={segment}>
            <BreadcrumbSeparator/>
            <BreadcrumbItem>
            {isLast ?(<BreadcrumbPage>{segment}</BreadcrumbPage>) : (
        <BreadcrumbLink>{segment}</BreadcrumbLink>    
        )}
            </BreadcrumbItem>
        </Fragment>
      );
    })} 
  </BreadcrumbList>
</Breadcrumb>
</div>
  )
}

export default Breadcrumbs