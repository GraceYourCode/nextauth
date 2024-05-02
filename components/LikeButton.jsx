import posts from "@/store/store";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { io } from "socket.io-client";

const LikeButton = ({ desktop, likes, id, usersThatLiked }) => {
  const socket = io("http://localhost:5000")
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  
  const likeAndUnlike = async (like) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          like,
        })
      })
  
      const data = await response.json()
  
      if (response.ok) {
        setLiked(prev => !prev);
        socket.emit("likes", data)
      };
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    usersThatLiked &&
      usersThatLiked.map(each => {
        each === session?.user.id ? setLiked(true) : setLiked(false)
      })

  }, [])

  return (
    <button className={`flex gap-3 items-center ${desktop && "flex-col"}`}>
      {session?.user &&<FaPlus className={`${liked && "hidden"} icons`} onClick={() => likeAndUnlike("like")} />}

      <p className="font-medium text-blue">{likes}</p>

      {session?.user &&<FaMinus className={`${!liked && "hidden"} icons`} onClick={() => likeAndUnlike("unlike")} />}
    </button>
  )
}

export default LikeButton
