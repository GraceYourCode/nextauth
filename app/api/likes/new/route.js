import Like from "@/models/like";
import { connectToDB } from "@/utils/database";

export const  POST = async (req) => {
    const postId = await req.json();

    try {
      await connectToDB();

      const newPost = await Like({
        post: postId,
        usersThatLiked: [],
      })

      await newPost.save();

      return new Response(JSON.stringify(newPost), {
        status: 201,
      })
    } catch (error) {
      return new Response(JSON.stringify(error.message), {
        status: 500,
      })
    }
}