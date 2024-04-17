import Comment from "@/models/comment";
import Reply from "@/models/reply";
import { connectToDB } from "@/utils/database"

export const GET = async () => {
  try {
    await connectToDB();

    const comments = await Comment.find({}).populate("creator");

    const replies = await Reply.find({}).populate("creator");

    const allInfo = []

    comments.forEach(comment => {
      let customComment = {...comment}

      replies.forEach(reply => {
        if (reply.commentId.toString() === comment._id.toString()) {
          if (customComment._doc.replies ) customComment._doc.replies.push(reply); 
          else {
            let arrayReply = [reply];
            customComment._doc.replies = arrayReply;
          }
        }
      })
      allInfo.push(customComment._doc)
    })

    console.log(allInfo)
    return new Response(JSON.stringify(allInfo), {
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify(error.message, "Failed to fetch comments"), {
      status: 500,
    })
  }
}