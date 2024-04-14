"use client"

import Image from "next/image";
import dp from "@/public/assets/image-amyrobson.png";
import io from "socket.io-client";
import { useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoIosSend } from "react-icons/io";
import posts from "@/store/store";

const Textbox = () => {
  const socket = io("http://localhost:4000");;

  const [content, setContent] = useState();
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();

  const [fixed, setFixed] = useState(true);
  const router = useRouter();

  const window = this.window;

  // keep track of previous scroll position
  let prevScrollPos = window.scrollY;

  window.addEventListener('scroll', () => {
    // current scroll position
    const currentScrollPos = window.scrollY;

    // if the user scrolls up
    if (prevScrollPos > currentScrollPos) setFixed(true);
    else {
      // get the height of the window plus the scroll position
      const scrolledTo = window.scrollY + window.innerHeight;

      // change the text box from fixed and scroll to bottom of page
      if (document.body.scrollHeight === scrolledTo) setFixed(false);
    }

    // updates the value of scroll position
    prevScrollPos = currentScrollPos;
  })

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
      console.log(pushData)
      //re-routes to home page
      if (response.ok) {
        router.push("/chat");
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
    <div className={`${fixed ? "fixed pb-0" : "pb-3 md:pb-5"} align-page bottom-0 bg-background`}>
      <form onSubmit={postComment} className="bg-white shadow-lg rounded-md flex gap-3 items-start p-5">
        <Image
          alt="dp"
          src={dp}
          height={30}
          width={30}
          className="hidden sm:block" />

        <textarea value={content} required
          onChange={
            (e) => {
              /* this takes the contents imputed by the user and stores
              it inside the container "content"*/
              setContent(e.target.value)
            }
          }
          className="resize-none p-2.5 text-sm w-full h-10 xs:h-16 sm:h-20 border border-solid border-light-gray rounded-md" />

        {
          //send button for desktop view
          <button type="submit" className="text-white hidden xl:block disabled:bg-gray-blue px-5 py-2 bg-blue rounded-md text-sm hover:bg-gray-blue disabled:cursor-not-allowed"
            disabled={submitting}>
            {submitting ? `SENDING...` : `SEND`}
          </button>
        }
        {
          //send btn for tablet and mobile view 
          <button className="text-blue xl:hidden text-lg">
            <IoIosSend />
          </button>
        }
      </form>
    </div>
  )
}

export default Textbox
