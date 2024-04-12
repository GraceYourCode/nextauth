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
   }

   fectchComments();
  }, []);

  return (
    <div className="flex justify-center w-screen">
      <main className=" w-1/2 flex items-center py-5">
        <Comment />
        {session?.user && <Textbox />}
      </main>
    </div>
  );
}
