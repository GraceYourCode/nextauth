import Like from "@/models/like";
import { connectToDB } from "@/utils/database";

export const POST = async (req, { params }) => {
  const {userId, like }= await req.json();
  console.log(userId)

  try {
    await connectToDB();

    const updatePost = await Like.findOne({post: params.id});

    if (!updatePost) return new Response(JSON.stringify("Posts not found"), {
      status: 404,
    })

    updatePost.usersThatLiked = like === "like" ? 
    [...updatePost.usersThatLiked, userId] : 
    updatePost.usersThatLiked.filter(item => item !== userId);

    await updatePost.save()

    return new Response(JSON.stringify(updatePost), {
      status: 201,
    })
  } catch (error) {
    return new Response(JSON.stringify(error.message), {
      status: 500,
    })
  }
}