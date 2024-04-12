"use client"

import Comment from "@/components/Comment";
import Textbox from "@/components/Textbox";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [allComments, setAllComments] = useState();

  useEffect(() => {
    const fectchComments = async () => {
      const response = await fetch("/api/comments/all");
      const data = await response.json();
      console.log(data);
      setAllComments(data);
    }

    fectchComments();
  }, []);

  return (
    <div className="flex justify-center w-screen">
      <main className=" w-1/2 flex flex-col gap-y-4 items-center py-5">
        {allComments &&
          allComments.map(comment => (
            <Comment 
            content={comment.content}
            dateCreated={comment.dateCreated}
            likes={comment.likes}
            username={comment.creator.username}
            key={comment._id} />
          ))
        }
        {session?.user && <Textbox />}
      </main>
    </div>
  );
}
