import Comment from "@/models/comment";
import Like from "@/models/like";
import Reply from "@/models/reply";
import { connectToDB } from "@/utils/database"

export const GET = async () => {
  try {
    await connectToDB();

    const comments = await Comment.find({}).populate("creator");

    const replies = await Reply.find({}).populate("creator");

    const likes = await Like.find({});

    const allInfo = []

    comments.forEach(comment => {
      let customComment = { ...comment };

      likes.forEach(like => {
        if (like.post.toString() === comment._id.toString()) {
          customComment._doc.usersThatLiked = like.usersThatLiked;
        }
      })

      replies.forEach(reply => {
        let customReply = { ...reply };

        likes.forEach(like => {
          if (like.post.toString() === reply._id.toString()) {
            customReply._doc.usersThatLiked = like.usersThatLiked;
          }
        })

        if (reply.commentId.toString() === comment._id.toString()) {
          if (customComment._doc.replies) customComment._doc.replies.push(customReply._doc);
          else {
            let arrayReply = [customReply._doc];
            customComment._doc.replies = arrayReply;
          }
        }
      })
      allInfo.push(customComment._doc)
    })

    return new Response(JSON.stringify(allInfo), {
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify(error.message, "Failed to fetch comments"), {
      status: 500,
    })
  }
}