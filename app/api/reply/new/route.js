import Comment from "@/models/comment";
import Reply from "@/models/reply";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
  const { userId, content, likes, dateCreated, commentId, replyingTo } = await req.json();

  const newReply = await Reply({
    creator: userId,
    content,
    likes,
    dateCreated,
    commentId,
    replyingTo,
  }).populate("creator");

  try {
    await connectToDB();
    await newReply.save();

    const comment = await Comment.findById(commentId);
    comment.replies.push(newReply._id);
    await comment.save();

    return new Response(JSON.stringify(newReply), {
      status: 201,
    })

  } catch (error) {
    return new Response(JSON.stringify(error.message), {
      status: 500,
    })
  }
}
