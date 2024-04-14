"use client"

import dynamic from 'next/dynamic'

const Textbox = dynamic(() => import('@/components/Textbox'), {
  ssr: false,
})
import Comments from "@/components/Comments";
// import Textbox from "@/components/Textbox";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import posts from "@/store/store";


const ChatPage = () => {

  const { data: session } = useSession();
  const [allPosts, setAllPosts] = useState();
  const [reply, setReply] = useState();

  return (
    <posts.Provider value={{
      allPosts,
      setAllPosts,
      reply,
      setReply
    }}>
      <>
        <div className="flex flex-col items-center w-screen bg-background">
          <main className="align-page flex flex-col gap-y-4 items-center pb-3 md:pb-5">
            <Comments posts={posts} />
            {/* {session?.user && <Textbox />} */}
          </main>
          <Textbox />
        </div>
      </>
    </posts.Provider>
    // 
  )
}

export default ChatPage
