import Identifier from "./Identifier";
import Button from "./Button";
import Contents from "./Contents";
import Replybox from "./Replybox";
import { useContext } from "react";
import posts from "@/store/store";
import LikeButton from "./LikeButton";
import { useSession } from "next-auth/react";
import EditBox from "./EditBox";

const Reply = ({ likes, content, username, dateCreated, id, commentId, replyingTo, usersThatLiked }) => {
  const { data: session } = useSession();
  const { reply, setReply } = useContext(posts);
  const { edit, setEdit } = useContext(posts);
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

  return (
    <>
      {
        edit &&
          edit.show ?

          edit.id === id && <EditBox contentsToEdit={content} /> :
          
          <div className="bg-white w-95% p-5 rounded-md flex gap-4 items-start min-h-fit">

            {/* this aside tag below is meant for desktop view and tablet view */}
            {
              session?.user &&
              <aside className="bg-background px-3 rounded-md py-3 hidden sm:block">
                <LikeButton desktop={true} likes={likes} id={id} reply={true} usersThatLiked={usersThatLiked} />
              </aside>
            }

            <main className="flex flex-col w-full gap-y-3">
              <div className="flex justify-between w-full">
                <Identifier date={dateCreated} username={username} />
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
                    session?.user &&
                    <aside className="bg-background px-4 rounded-lg py-2">
                      <LikeButton likes={likes} id={id} reply={true} usersThatLiked={usersThatLiked} />
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
          </div>}
      {
        reply &&
        reply.id === id &&
        <Replybox reply={reply} />
      }
    </>
  )
}

export default Reply
