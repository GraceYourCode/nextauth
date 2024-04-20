import Comment from "@/models/comment";
import { connectToDB } from "@/utils/database";

export const POST = async (req, { params }) => {
  const like = await req.json();

  try {
    await connectToDB();
    const existingComment = await Comment.findById(params.id).populate("creator");

    if (!existingComment) return new Response(JSON.stringify("Couldn't find comment"), {
      status: 404,
    })

    existingComment.likes = like === "like" ? existingComment.likes + 1 : existingComment.likes - 1;


    await existingComment.save();

    return new Response(JSON.stringify(existingComment), {
      status: 201,
    })
  } catch (error) {
    return new Response(JSON.stringify(error.message), {
      status: 500,
    })
  }
}