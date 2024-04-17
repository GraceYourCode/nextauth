import { FaPlus, FaMinus } from "react-icons/fa";
import Identifier from "./Identifier";
import Button from "./Button";
import Contents from "./Contents";
import Reply from "./Reply";
import Replybox from "./Replybox";
import { useContext, useState } from "react";
import posts from "@/store/store";

const Comment = ({ likes, content, username, dateCreated, id, image, replies }) => {

  const { reply, setReply } = useContext(posts)

  const getTimeDifference = (recordedDateString) => {
    // Convert the recorded date string to a Date object
    const recordedDate = new Date(recordedDateString);

    // Get the current date and time
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate.getTime() - recordedDate.getTime();

    // Convert milliseconds to hours, minutes, and seconds
    const years = Math.floor(timeDifference / (1000* 60 * 60 * 24 * 365));
    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const seconds = Math.floor(timeDifference / 1000);

    // Return the formatted time difference
    if (years > 0) return `${years} ${years < 2 ? "year" : "years"} ago`;
    else if (months > 0) return `${months} ${months < 2 ? "month" : "months"} ago`;
    else if (weeks > 0) return `${weeks} ${weeks < 2 ? "week" : "weeks"} ago`;
    else if (days > 0) return `${days} ${days < 2 ? "day" : "days"} ago`;
    else if (hours > 0) return `${hours} ${hours < 2 ? "hour" : "hours"} ago`;
    else if (minutes > 0) return `${minutes} ${minutes < 2 ? "minute" : "minutes"} ago`;
    else return `${seconds} ${seconds < 2 ? "second" : "seconds"} ago`;
  }


  const showReplyBox = (id) => {
    setReply({
      id: id,
      commentId: id,
      username: username,
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
            <Button hide={true} click={showReplyBox} id={id} type="Reply" />
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
              <Button click={showReplyBox} id={id} type="Reply" />
            </div>
          }
        </main>
      </div>

      {/* this div below holds all the nested replies to each comment */}
      <div className="w-full flex flex-col items-end lg:w-95% xl:-11/12 border-0 border-l-2 border-solid border-l-light-gray gap-y-4">
        {
          reply &&
          reply.id === id &&
          <Replybox reply={reply} />
        }
        {replies &&
          replies.map(reply => (
            <Reply
              content={reply.content}
              dateCreated={getTimeDifference(reply.dateCreated)}
              id={reply._id}
              likes={reply.likes}
              username={reply.creator.username}
              commentId={id}
              replyingTo={reply.replyingTo}
              key={reply._id} />
          ))
        }
      </div>
    </div>
  )
}

export default Comment
