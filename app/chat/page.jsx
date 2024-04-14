"use client"

import Comments from "@/components/Comments";
import Textbox from "@/components/Textbox";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import posts from "@/store/store";


const ChatPage = () => {

  const { data: session } = useSession();
  const [allPosts, setAllPosts] = useState();

  return (
    <posts.Provider value={{ allPosts, setAllPosts }}>
      <>
        <div className="flex justify-center w-screen">
          <main className="align-page flex flex-col gap-y-4 items-center py-3 md:py-5">
            <Comments posts={posts} />
            {/* {session?.user && <Textbox />} */}
            <Textbox />
          </main>
        </div>
      </>
    </posts.Provider>
    // 
  )
}

export default ChatPage
