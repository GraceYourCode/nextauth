import Reply from "@/models/reply";
import { connectToDB } from "@/utils/database";

export const POST = async (req, { params }) => {
  const like = await req.json();

  try {
    await connectToDB();
    const existingReply = await Reply.findById(params.id).populate("creator");

    if (!existingReply) return new Response(JSON.stringify("Couldn't find the reply"), {
      status: 404,
    })

    existingReply.likes = like === "like" ? existingReply.likes + 1 : existingReply.likes - 1;

    await existingReply.save();

    return new Response(JSON.stringify(existingReply), {
      status: 201,
    })
  } catch (error) {
    return new Response(JSON.stringify(error.message), {
      status: 500,
    })
  }
}