"use client"

import { getProviders, signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image";

import { useEffect, useState } from "react";


const Navigation = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [fixed, setFixed] = useState(false)

  useEffect(() => {
    const setToProviders = async () => {
      const response = await getProviders();

      setProviders(response)

    }

    setToProviders();

    if (typeof window !== 'undefined') {
      // Code that uses window (only runs in the browser)

      // keep track of previous scroll position
      let prevScrollPos = window.scrollY;

      const onScroll = () => {
        // current scroll position
        const currentScrollPos = window.scrollY;

        if (prevScrollPos > currentScrollPos) {
          // user has scrolled up
          if (currentScrollPos === 0) setFixed(false);
          else setFixed(true);
        } else setFixed(false);

        // update previous scroll position
        prevScrollPos = currentScrollPos;
      }

      window.addEventListener('scroll', onScroll);

      return () => {
        window.removeEventListener("scroll", onScroll)
      }

    }





  }, [])

  return (
    <nav className={`${fixed && "fixed"} bg-background text-right align-page py-3`}>
      {/**checks if user is logged in, it displays sign out
       * so the user can sign out
       */}
      {session?.user ? (
        <>
          <Image
            width={28}
            height={28}
            src={session?.user.image}
            alt="profile pic" />
            
          <button className="auth" onClick={signOut}>
            Sign Out
          </button>
        </>
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
