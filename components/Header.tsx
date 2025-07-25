'use client';
import { SignedOut, SignedIn,SignInButton, useUser, SignOutButton,UserButton } from '@clerk/nextjs';
import Breadcrumbs from './ui/Breadcrumbs';
function Header() {

    const {user} = useUser();



  return (
<div className="flex items-center justify-between p-5 bg-gray-800 text-white px-7">
  {user && (<h1> {user.firstName}{`'s`} Space</h1>)}

    <Breadcrumbs />

    <div>
        <SignedOut>
           <div className="border border-grey rounded-full px-4 py-2"><SignInButton> Sign In </SignInButton></div>
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
    </div>



    </div>
  )
}

export default Header