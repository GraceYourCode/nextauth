import Reply from "@/models/reply";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
    const { content, likes, dateCreated, commentId, replyingTo} = req.json();

    try {
      await connectToDB();

      const newReply = await Reply({
        creator: userId,
        content,
        likes,
        dateCreated,
        commentId,
        replyingTo,
      });

      await newReply.save();
      console.log(Response(JSON.stringify(newReply)))

      return new Response(JSON.stringify(newReply), {
        status: 201,
      })

    } catch (error) {
      return new Response(JSON.stringify(error), {
        status: 500,
      })
    }
}