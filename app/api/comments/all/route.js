import Comment from "@/models/comments";
import { connectToDB } from "@/utils/database"

export const GET = async () => {
    try {
      await connectToDB();

      const comments = await Comment.find({}).populate("creator");

      console.log(comments)

      return new Response(JSON.stringify(comments), {
        status: 200,
      })
    } catch (error) {
      return new Response(JSON.stringify("Failed to fetch comments"), {
        status: 500,
      })
    }
}