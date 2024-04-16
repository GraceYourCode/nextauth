import Reply from "@/models/reply";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
  const { userId, content, likes, dateCreated, commentId, replyingTo } = req.json();

  try {
    await connectToDB();

    const newReply = await Reply({
      creator: userId,
      content,
      likes,
      dateCreated,
      commentId,
      replyingTo,
    }).populate("creator");

    await newReply.save();

    return new Response(JSON.stringify(newReply), {
      status: 201,
    })

  } catch (error) {
    return new Response(JSON.stringify(newReply), {
      status: 500,
    })
  }
}
