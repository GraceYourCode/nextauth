"use client"

import Comment from "@/components/Comment";
import Textbox from "@/components/Textbox";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [allComments, setAllComments] = useState(undefined);

  useEffect(() => {
    const fectchComments = async () => {
      const response = await fetch("/api/comments/all");
      const data = await response.json();
      console.log(data);
      setAllComments(data);
    }

    fectchComments();
  }, []);

//   const getTimeDifference = (recordedDateString) => {
//     // Convert the recorded date string to a Date object
//     const recordedDate = new Date(recordedDateString);

//     // Get the current date and time
//     const currentDate = new Date();

//     // Calculate the time difference in milliseconds
//     const timeDifference = currentDate.getTime() - recordedDate.getTime();

//     // Convert milliseconds to hours, minutes, and seconds
//     const hours = Math.floor(timeDifference / (1000 * 60 * 60));
//     const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

//     // Return the formatted time difference
//     return `${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
// }

  return (
    <div className="flex justify-center w-screen">
      {/* <main className=" w-1/2 flex flex-col gap-y-4 items-center py-5">
        {allComments &&
          allComments.map(comment => (
            <Comment 
            content={comment.content}
            dateCreated={comment.dateCreated}
            likes={comment.likes}
            username={comment.creator.username}
            key={comment._id} />
          ))
        }
        {session?.user && <Textbox />}
      </main> */}
    </div>
  );
}
