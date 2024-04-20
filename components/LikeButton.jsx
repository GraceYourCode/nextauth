import posts from "@/store/store";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const LikeButton = ({ desktop, likes, id, reply, usersThatLiked }) => {
  const { data: session } = useSession();
  const { liked, setLiked } = useContext(posts);
  const { likeAndUnlike } = useContext(posts)

  useEffect(() => {
    usersThatLiked &&
      usersThatLiked.map(each => {
        each === session?.user.id ? setLiked(true) : setLiked(false)
      })
  }, [])

  return (
    <button className={`flex gap-3 items-center ${desktop && "flex-col"}`}>
      <FaPlus className={`${liked && "hidden"} icons`} onClick={() => likeAndUnlike("like", id, reply)} />

      <p className="font-medium text-blue">{likes}</p>

      <FaMinus className={`${!liked && "hidden"} icons`} onClick={() => likeAndUnlike("unlike", id, reply)} />
    </button>
  )
}

export default LikeButton
