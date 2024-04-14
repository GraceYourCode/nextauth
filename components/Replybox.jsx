"use client"

import Image from "next/image";
import dp from "@/public/assets/image-amyrobson.png";
import io from "socket.io-client";
import { useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoIosSend } from "react-icons/io";
import posts from "@/store/store";


const Replybox = ({ asReply }) => {
  const socket = io("http://localhost:4000");;

  const {reply, setReply} = useContext(posts)
  const [content, setContent] = useState(reply && `@${reply.id} `);
  const [submitting, setSubmitting] = useState(false);
  const input = useRef(null)
  const form = useRef(null)
  const { data: session } = useSession();

  const handleOutsideClick = (event) => {
    const parentElement = form.current;
    if (parentElement && !parentElement.contains(event.target)) {
      // Clicked outside the parent element
      // Perform your action here (e.g., hide the parent element)
      setReply(undefined);
    }
  };

  useEffect(() => {
    if (input) {
      input.current.setSelectionRange(input.current.value.length, input.current.value.length);
      input.current.focus();
    }

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const postComment = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const newComment = {
      userId: session?.user.id,
      content: content,
      likes: 0,
      dateCreated: new Date(),
    }

    try {
      const response = await fetch("/api/comments/new", {
        method: "POST",
        body: JSON.stringify(newComment)
      });

      const pushData = await response.json();
      //re-routes to home page
      if (response.ok) {
        // router.push("/chat");
        setContent(""); // empty the value of the text area
      };

      socket.emit("chat-comment", pushData);

    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {reply &&
        reply.show &&
        <form onSubmit={postComment} className="bg-white shadow-lg rounded-md flex gap-3 items-start p-5 w-95%" ref={form}>
          <Image
            alt="dp"
            src={dp}
            height={30}
            width={30}
            className="hidden sm:block" />

          <textarea value={content} required disabled={submitting} ref={input}
            onChange={
              (e) => {
                /* this takes the contents imputed by the user and stores
                it inside the container "content"*/
                if (e.target.value === `@${reply.id}`) e.target.value = (`@${reply.id} `);
                else setContent(e.target.value);
              }
            }
            className="resize-none p-2.5 text-sm w-full h-10 xs:h-16 sm:h-20 border border-solid border-light-gray rounded-md" />
          {
            //send button for desktop view
            <button type="submit" className="text-white hidden xl:block disabled:bg-gray-blue px-5
          py-2 bg-blue rounded-md text-sm hover:bg-gray-blue disabled:cursor-not-allowed disabled:text-xs"
              disabled={submitting}>
              {submitting ? `SENDING...` : `SEND`}
            </button>
          }
          {
            //send btn for tablet and mobile view 
            <button className="text-blue xl:hidden text-2xl">
              <IoIosSend />
            </button>
          }
        </form>
      }
    </>
  )
}

export default Replybox
