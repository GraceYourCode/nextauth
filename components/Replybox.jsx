"use client"

import Image from "next/image";
import dp from "@/public/assets/image-amyrobson.png";
import { useContext, useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import posts from "@/store/store";


const Replybox = ({ asReply }) => {

  const { reply, setReply } = useContext(posts)
  const [content, setContent] = useState(reply && `@${reply.username} `);
  const { submitting } = useContext(posts);
  const input = useRef(null)
  const form = useRef(null)
  const { postReply } = useContext(posts)

  const handleOutsideClick = (event) => {
    const parentElement = form.current;
    if (parentElement && !parentElement.contains(event.target)) {
      // If this checks through it means the userClicked outside the parent element
      setReply(undefined);
    }
  };

  useLayoutEffect(() => {
    input.current.style.height = 'inherit';
    input.current.style.height = `${input.current.scrollHeight}px`;
  }, [content]);

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

  return (
    <>
      {reply &&
        reply.show &&
        <form onSubmit={async (e) => {
          await postReply(e, reply.commentId, content);
          setContent("");
        }} className="bg-white shadow-lg rounded-md flex gap-3 items-start p-5 w-95%" ref={form}>
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
            <button type="submit" className="action-btn hidden xl:block"
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
