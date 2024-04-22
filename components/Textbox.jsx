"use client"

import Image from "next/image";
import dp from "@/public/assets/image-amyrobson.png";
import { useContext, useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import posts from "@/store/store";


const Textbox = ({ submit }) => {
  const [content, setContent] = useState();
  const { submitting } = useContext(posts);

  const [fixed, setFixed] = useState(true);

  useEffect(() => {

    if (typeof window !== 'undefined') {
      // Code that uses window (only runs in the browser)
      let prevScrollPos = window.scrollY;

      const onScroll = () => {
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
      }

      window.addEventListener('scroll', onScroll)

      return () => {
        window.removeEventListener("scroll", onScroll)
      }

    }
    // keep track of previous scroll position
  }, [])

  return (
    <div className={`${fixed ? "fixed pb-0" : "pb-3 md:pb-5"} align-page bottom-0 bg-background }`}>
      <form onSubmit={async (e) => {
        await submit(e, content);
        setContent("");
      }} className="bg-white shadow-lg rounded-md flex gap-3 items-start p-5">
        <Image
          alt="dp"
          src={dp}
          height={30}
          width={30}
          className="hidden sm:block" />

        <textarea value={content} required disabled={submitting}
          onChange={
            (e) => {
              /* this takes the contents imputed by the user and stores
              it inside the container "content"*/
              setContent(e.target.value)
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
          <button className="text-blue xl:hidden text-3xl sm:text-4xl">
            <IoIosSend />
          </button>
        }
      </form>
    </div>
  )
}

export default Textbox
