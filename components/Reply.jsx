import Identifier from "./Identifier";
import Button from "./Button";
import Contents from "./Contents";
import Replybox from "./Replybox";
import { useContext, useState } from "react";
import posts from "@/store/store";
import LikeButton from "./LikeButton";
import { useSession } from "next-auth/react";
import EditBox from "./EditBox";

const Reply = ({ likes, content, username, image, dateCreated, id, userId, commentId, replyingTo, usersThatLiked }) => {
  const { data: session } = useSession();
  const { reply, setReply } = useContext(posts);
  const {edit, setEdit} = useContext(posts);
  const { popUpDelete } = useContext(posts);

  const showReplyBox = (id) => {
    setReply({
      id: id,
      commentId: commentId,
      username: username,
      show: true,
    })
  }

  const showEditBox = (id) => {
    setEdit({
      id: id,
      show: true,
    })
  }

  const cancelEditBox = () => setEdit(null);
  
  const handleOutsideClick = (event, form) => {
    const parentElement = form.current;
    if (parentElement && !parentElement.contains(event.target)) {
      // If this checks through it means the userClicked outside the parent element
      setEdit(null);
    }
  };

  return (
    <>
      {
        edit !== null &&
        edit.id === id && <EditBox contentsToEdit={content} id={id}
        cancel={cancelEditBox} handleOutsideClick={handleOutsideClick} />
      }

      <div className={`${edit === null ? "flex" : edit.id === id ? "hidden" : "flex"} bg-white w-95% p-5 rounded-md flex gap-4 items-start min-h-fit`}>

        {/* this aside tag below is meant for desktop view and tablet view */}
        {
          <aside className="bg-background px-3 rounded-md py-3 hidden sm:block">
            <LikeButton desktop={true} likes={likes} id={id} usersThatLiked={usersThatLiked} />
          </aside>
        }

        <main className="flex flex-col w-full gap-y-3">
          <div className="flex justify-between w-full">
            <Identifier date={dateCreated} username={username} image={image} id={userId} />
            {session?.user &&
              (session?.user.name.replace(" ", "").toLocaleLowerCase() === username ? (
                <div className="flex gap-3 items-center">
                  <Button hide={true} click={popUpDelete} id={id} type="Delete" />
                  <Button hide={true} type="Edit" click={showEditBox} id={id} />
                </div>
              ) :
                <Button hide={true} click={showReplyBox} id={id} type="Reply" />)
            }
          </div>
          <Contents content={content} replyingTo={replyingTo} />
          {
            // for sreens with smaller width
            <div className="flex sm:hidden justify-between">
              {
                <aside className="bg-background px-4 rounded-lg py-2">
                  <LikeButton likes={likes} id={id} usersThatLiked={usersThatLiked} />
                </aside>
              }

              {session?.user &&
                (session?.user.name.replace(" ", "").toLocaleLowerCase() === username ? (
                  <div className="flex gap-3 items-center">
                    <Button type="Delete" click={popUpDelete} id={id} />
                    <Button type="Edit" click={showEditBox} id={id} />
                  </div>
                ) :
                  <Button click={showReplyBox} id={id} type="Reply" />)
              }
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
