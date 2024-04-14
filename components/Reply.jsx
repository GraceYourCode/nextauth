import { FaPlus, FaMinus } from "react-icons/fa";
import Identifier from "./Identifier";
import Button from "./Button";
import Contents from "./Contents";
import Replybox from "./Replybox";
import { useContext } from "react";
import posts from "@/store/store";

const Reply = ({ likes, content, username, dateCreated, id }) => {
  const { reply, setReply } = useContext(posts)

  const showReplyBox = (id) => {
    setReply({
      id: id,
      show: true,
    })
  }
  return (
    <>
      <div className="bg-white w-95% p-5 rounded-md flex gap-4 items-start min-h-fit">

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
            <Identifier date={dateCreated} username={username} />
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
      {
        reply &&
        reply.id === id &&
        <Replybox reply={reply} />
      }
    </>
  )
}

export default Reply
