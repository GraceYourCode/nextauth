"use client"

import { getProviders, signIn, signOut, useSession } from "next-auth/react"

import { useEffect, useState } from "react";



const Navigation = () => {
  const {data: session} = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setToProviders = async () => {
      const response = await getProviders();

      setProviders(response)

    }

    setToProviders();
  }, [])

  return (
    <nav>
      {session?.user ? (
        <button onClick={signOut}>Sign Out</button>
      ): (
        <>
           {providers &&
            Object.values(providers).map(provider => (
              <button type="button" key={provider.name} 
              className="text-black bg-white border border-black rounded-3xl py-1.5 px-7 text-sm"
              onClick={() => signIn(provider.id)}>Sign In</button>
            ))
          }
        </>
      )}
    </nav>
  )
}

export default Navigation
