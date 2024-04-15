import { FaPlus, FaMinus } from "react-icons/fa";
import Identifier from "./Identifier";
import Button from "./Button";
import Contents from "./Contents";
import Reply from "./Reply";
import Replybox from "./Replybox";
import { useContext, useState } from "react";
import posts from "@/store/store";

const Comment = ({ likes, content, username, dateCreated, id, image }) => {

  const { reply, setReply } = useContext(posts)

  const showReplyBox = (id) => {
    setReply({
      id: id,
      show: true,
    })
  }

  return (
    <div className="flex flex-col items-end w-full gap-4">
      <div className="bg-white p-5 rounded-md flex gap-4 items-start w-full min-h-fit">

        {/* this aside tag below is meant for desktop view and tablet view */}
        <aside className="bg-background px-3 rounded-md py-3 hidden sm:block">
          <button className="flex flex-col gap-3 items-center">
            <FaPlus className="icons" />

            <p className="font-medium text-blue">{likes}</p>

            <FaMinus className="icons" />
          </button>
        </aside>

        <main className="flex flex-col w-full gap-y-3">
          <div className="flex justify-between w-full">
            <Identifier date={dateCreated} username={username} image={image} />
            <Button hide={true} click={showReplyBox} id={id} />
          </div>
          <Contents content={content} />
          {
            // for sreens with smaller width
            <div className="flex sm:hidden justify-between">
              <aside className="bg-background px-4 rounded-lg py-2">
                <button className="flex gap-3 items-center">
                  <FaPlus className="icons" />

                  <p className="font-medium text-blue">{likes}</p>

                  <FaMinus className="icons" />
                </button>
              </aside>
              <Button click={showReplyBox} id={id} />
            </div>
          }
        </main>
      </div>

      {/* this div below holds all the nested replies to each comment */}
      <div className="w-full flex flex-col items-end lg:w-95% xl:-11/12 border-0 border-l-2 border-solid border-l-light-gray gap-y-4">
        <Reply
          content={
            `The sections and pages are organized sequentially, from basic to advanced, so you can follow them step-by-step when building your Next.js application. However, you can read them in any order or skip to the pages that apply to your use case.

          If you're new to Next.js, we recommend starting with the Routing, Rendering, Data Fetching and Styling sections, as they introduce the fundamental Next.js and web concepts to help you get started. Then, you can dive deeper into the other sections such as Optimizing and Configuring. Finally, once you're ready, checkout the Deploying and Upgrading sections.`
          }
          dateCreated="3 seconds ago"
          likes={0}
          username="romancaesar"
          id={"iam him"}
          key={12} />
        {
          reply &&
          reply.id === id &&
          <Replybox reply={reply} />
        }
      </div>
    </div>
  )
}

export default Comment
