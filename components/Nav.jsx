"use client"

import Link from "next/link"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { useEffect, useState } from "react";

const Nav = () => {
  const { data: session } = useSession

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setToProviders = async () => {
      const response = await getProviders();

      setProviders(response)

      console.log(response)
    }

    setToProviders();
  }, [])

  return (
    <div>
      {session?.user ? (
        <div className="flex gap-12 py-4 px-8">
          <Link href="/" className="text-white text-sm bg-black rounded-3xl py-1.5 px-7">Create Post</Link>

          <button type="button" onClick={signOut}
            className="text-black bg-white border border-black rounded-3xl py-1.5 px-7 text-sm">Sign Out</button>
        </div>
      ) : (
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
    </div>
  )
}

export default Nav
