"use client"

import Image from "next/image";
import dp from "@/public/assets/image-amyrobson.png";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Textbox = () => {
  const [content, setContent] = useState();
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const postComment = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/comments/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          content: content,
          likes: 0,
          dateCreated: new Date(),
        })
      });

      //re-routes to home page
      if (response.ok) {
        router.push("/chat");
        setContent(""); // empty the value of the text area
      };

    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={postComment} className="bg-white rounded-md fixed w-1/2 bottom-5 flex gap-3 items-start p-5">
      <Image
        alt="dp"
        src={dp}
        height={30}
        width={30} />

      <textarea value={content} required
        onChange={
          (e) => {
            /* this takes the contents imputed by the user and stores
            it inside the container "content"*/
            setContent(e.target.value)
          }
        }
        className="resize-none p-2.5 text-sm w-full h-20 border border-solid border-light-gray rounded-md" />

      <button type="submit" className="text-white disabled:bg-gray-blue px-5 py-2 bg-blue rounded-md text-sm hover:bg-gray-blue disabled:cursor-not-allowed" 
      disabled={submitting}>
        {submitting ? `SENDING...` : `SEND`}
      </button>
    </form>
  )
}

export default Textbox
