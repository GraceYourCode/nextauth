"use client"

import { getProviders, signIn, signOut, useSession } from "next-auth/react"

import { useEffect, useState } from "react";
import Image from "next/image"



const Navigation = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [fixed, setFixed] = useState(false)


  // keep track of previous scroll position
  let prevScrollPos = window.scrollY;

  const onScroll = () => {
    // current scroll position
    const currentScrollPos = this.window.scrollY;

    if (prevScrollPos > currentScrollPos) {
      // user has scrolled up
      if (currentScrollPos === 0) setFixed(false);
      else setFixed(true);
    } else setFixed(false);

    // update previous scroll position
    prevScrollPos = currentScrollPos;
  }

  
  useEffect(() => {
    const setToProviders = async () => {
      const response = await getProviders();
      
      setProviders(response)
      
    }
    
    setToProviders();
    
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll)
    }

  }, [])

  return (
    <nav className={`${fixed && "fixed"} bg-background text-right align-page py-3`}>
      {/**checks if user is logged in, it displays sign out
       * so the user can sign out
       */}
      {session?.user ? (
        <button className="auth" onClick={signOut}>
          Sign Out
        </button>
      ) : (

        <>
          {/** since user is not logged in, 
         * it asks user to log in
         */}
          {providers &&
            Object.values(providers).map(provider => (
              <button key={provider.name} className="auth"
                onClick={() => signIn(provider.id)}>
                Sign In
              </button>
            ))}
        </>
      )}
    </nav>
  )
}


export default Navigation
