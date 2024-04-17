"use client"

import Image from "next/image";
import dp from "@/public/assets/image-amyrobson.png";
import io from "socket.io-client";
import { useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { IoIosSend } from "react-icons/io";
import posts from "@/store/store";


const Replybox = ({ asReply }) => {
  const socket = io("http://localhost:4000");;

  const { reply, setReply } = useContext(posts)
  const [content, setContent] = useState(reply && `@${reply.username} `);
  const [submitting, setSubmitting] = useState(false);
  const input = useRef(null)
  const form = useRef(null)
  const { data: session } = useSession();

  const handleOutsideClick = (event) => {
    const parentElement = form.current;
    if (parentElement && !parentElement.contains(event.target)) {
      // If this checks through it means the userClicked outside the parent element
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

  const postReply = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const newReply = {
      userId: "661c5b4cc0a66ac825534ed7",
      content: content.split(" ").slice(1).join(" ").toString(),
      likes: 0,
      dateCreated: new Date(),
      commentId: reply.commentId,
      replyingTo: content.split(" ")[0].substring(1),
    }


    try {
      const response = await fetch("/api/reply/new", {
        method: "POST",
        body: JSON.stringify(newReply)
      });

      const pushData = await response.json();
      console.log(pushData, response.ok);
      //re-routes to home page
      if (response.ok) {
        setContent(""); // empty the value of the text area
        setReply(undefined);
      };

      socket.emit("chat-reply", pushData);

    } catch (error) {
      throw error
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {reply &&
        reply.show &&
        <form onSubmit={postReply} className="bg-white shadow-lg rounded-md flex gap-3 items-start p-5 w-95%" ref={form}>
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
                if (e.target.value === `@${reply.username}`) e.target.value = (`@${reply.username} `);
                else setContent(e.target.value);
              }
            }
            className="textbox" />
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
