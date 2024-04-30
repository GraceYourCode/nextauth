import { useSession } from "next-auth/react";
import Image from "next/image";
import dp from "@/public/assets/image-amyrobson.png";
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import posts from "@/store/store";

const EditBox = ({ contentsToEdit, cancel, handleOutsideClick }) => {
  const { data: session } = useSession();
  const [content, setContent] = useState(contentsToEdit);
  const { submitting } = useContext(posts);
  const input = useRef(null);
  const form = useRef(null);

  useLayoutEffect(() => {
    input.current.style.height = 'inherit';
    input.current.style.height = `${input.current.scrollHeight}px`;
  }, [content]);


  useEffect(() => {
    if (input) {
      input.current.setSelectionRange(input.current.value.length, input.current.value.length);
      input.current.focus();
    }

    document.addEventListener('click', handleOutsideClick(e, form));

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <form onSubmit={async (e) => {
      await submit(e, content);
      setContent("");
    }} className="bg-white shadow-lg rounded-md flex gap-3 items-start p-5 w-full" ref={form}>
      <Image
        alt="dp"
        src={session?.user.image || dp}
        height={30}
        width={30}
        className="hidden sm:block" />
      <div className="flex flex-col justify-end items-end w-full gap-3">
        <textarea value={content} required disabled={submitting} ref={input}
        style={{
          height: "inherit",
        }}
          onChange={
            (e) => {
              /* this takes the contents imputed by the user and stores
              it inside the container "content"*/
              setContent(e.target.value)
            }
          }
          className="textbox" />

        <div className="flex gap-3">
          <button className="text-white bg-contents py-2 px-5 text-sm rounded-md" type="button"
            onClick={cancel}>
            CANCEL
          </button>
          <button type="submit" className="action-btn"
            disabled={submitting}>
            {submitting ? `UPDATING...` : `UPDATE`}
          </button>
        </div>

      </div>
    </form>
  )
}

export default EditBox
