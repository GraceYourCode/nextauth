import Comment from "@/models/comments";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
  const {userId, content, dateCreated, likes} = await req.json();

  try {
    await connectToDB();
    const newComment = await Comment({
      creator: userId,
      content,
      likes,
      dateCreated
    });

    await newComment.save();

    return new Response(JSON.stringify(newComment), {
      status: 201,
    })
  } catch (error) {
    return new Response(JSON.stringify("Failed to create new comment"), {
      status: 500,
    })
  }
}