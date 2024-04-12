"use client"

import Comments from "@/components/Comments";
import Textbox from "@/components/Textbox";
import { useSession } from "next-auth/react";
import { useState } from "react";



const ChatPage = () => {

  const { data: session } = useSession();
  const [posts, setPosts] = useState();

  async function getStaticProps() {
    // Fetch your data (e.g., blog posts) from an API or database
    const posts = await fetch('/api/comments/all').then((res) => res.json());

    setPosts(posts)
  }

  //to get posts from the server
  setInterval(() => {
    getStaticProps();
  }, 5000);

  return (
    <>
      <div className="flex justify-center w-screen">
        <main className=" w-1/2 flex flex-col gap-y-4 items-center py-5">
          <Comments posts={posts} />
          {session?.user && <Textbox />}
        </main>
      </div>
    </>
  )
}

export default ChatPage
