import Comment from "@/components/Comment";
import posts from "@/store/store";
import { useContext, useEffect, useState } from "react";

const Comments = () => {
  const { allPosts, setAllPosts } = useContext(posts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/comments/all", {
        next: { revalidate: 5 }
      });
      const data = await response.json();

      response.ok ? setLoading(true) : setLoading(false)
      await setAllPosts(data);
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
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
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

  return (
    <>
      {loading ?
        allPosts.map(comment => (
          <Comment
            content={comment.content}
            dateCreated={getTimeDifference(comment.dateCreated)}
            likes={comment.likes}
            username={comment.creator.username}
            image={comment.creator.image}
            id={comment._id}
            replies={comment.replies}
            key={comment._id} />
        )) :
        <p className="min-h-screen bg-background flex items-center justify-center">
          <span className=" border-x-blue border-y-red border-2 border-solid w-12 h-12 rounded-full fixed animate-spin"></span>
        </p>
      }
    </>
  )
}

export default Comments
