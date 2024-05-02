import Comment from "@/models/comment";
import Like from "@/models/like";
import Reply from "@/models/reply";
import { connectToDB } from "@/utils/database"

export const POST = async () => {
  try {
    await connectToDB();

    const myComments = await Comment.find({}).populate("creator").populate("replies").sort({likes: -1})

    console.log(myComments)

    return new Response(JSON.stringify(myComments), {
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify(error.message, "Failed to fetch comments"), {
      status: 500,
    })
  }
}