import Comment from "@/components/Comment";
import io from "socket.io-client";
import posts from "@/store/store";
import { useContext, useEffect } from "react";

const Comments = () => {
  const socket = io("http://localhost:4000")
  const { allPosts, setAllPosts } = useContext(posts);

  socket.on("chat-comment", msg => {
    setAllPosts([...allPosts, msg]);
  })

  // socket.on("chat-reply", msg => {
  //   const updatedPosts = allPosts && allPosts.map((post) => {
  //     if (post._id === msg.commentId) {
  //       return {
  //         ...post,
  //         rreplies: [...post.replies, msg],
  //       }
  //     }
  //     return post;
  //   })

  //   setAllPosts(updatedPosts);
  // })

  useEffect(() => {
    // socket.connect();
    const fetchData = async () => {
      const response = await fetch("/api/comments/all");
      const data = await response.json();
      console.log(data);
      setAllPosts(data);
    }

    fetchData();
  }, [])

  const getTimeDifference = (recordedDateString) => {
    // Convert the recorded date string to a Date object
    const recordedDate = new Date(recordedDateString);

    // Get the current date and time
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate.getTime() - recordedDate.getTime();

    // Convert milliseconds to hours, minutes, and seconds
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Return the formatted time difference
    if (hours > 0) return `${hours} ${hours < 2 ? "hour" : "hours"} ago`;
    else if (minutes > 0) return `${minutes} ${minutes < 2 ? "minute" : "minutes"} ago`;
    else return `${seconds} ${seconds < 2 ? "second" : "seconds"} ago`;
  }

  return (
    <>
      {allPosts &&
        allPosts.map(comment => (
          <Comment
            content={comment.content}
            dateCreated={getTimeDifference(comment.dateCreated)}
            likes={comment.likes}
            username={comment.creator.username}
            image={comment.creator.image}
            id={comment._id}
            key={comment._id} />
        ))
      }
    </>
  )
}

export default Comments
