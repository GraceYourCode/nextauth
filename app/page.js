"use client"

import Comment from "@/components/Comment";
import Textbox from "@/components/Textbox";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [allComments, setAllComments] = useState();

  useEffect(() => {
    fetch("/api/comments/all")
      .then(res=> res.json)
      .then(data=> console.log(data))
      .catch(err => console.error(err));
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
