import Comment from "@/models/comment";
import Reply from "@/models/reply";
import { connectToDB } from "@/utils/database";

export const POST = async (req, { params }) => {
  const { userId, like } = await req.json();

  try {
    await connectToDB();
    const existingComment = await Comment.findById(params.id).populate("creator") || await Reply.findById(params.id).populate("creator");

    if (!existingComment) return new Response(JSON.stringify("Couldn't find post"), {
      status: 404,
    })

    existingComment.likes = like === "like" ? existingComment.likes + 1 : existingComment.likes - 1;
    existingComment.usersThatLiked = like === "like" ? 
    existingComment.usersThatLiked.push(userId) : 
    existingComment.usersThatLiked.filter(id => id !== userId)


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

export const DELETE = async ({ params }) => {
  try {
    await connectToDB();

    const commentToDelete = await Comment.findByIdAndDelete(params.id) || await Reply.findByIdAndDelete(params.id);

    if (!commentToDelete) return new Response(JSON.stringify("Comment not found!!"), {
      status: 404,
    })

    return new Response(JSON.stringify(commentToDelete), {
      status: 201,
    })
  } catch (error) {
    return new Response(JSON.stringify(error.message), {
      status: 500,
    })
  }
}

export const PATCH = async (req, { params }) => {
  const content = await req.json();

  try {
    await connectToDB();

    const commentToUpdate = await Comment.findById(params.id) || await Reply.findById(params.id);

    if (!commentToUpdate) return new Response(JSON.stringify("Post not found!!"), {
      status: 404,
    })

    commentToUpdate.content = content;

    await commentToUpdate.save();

    return new Response(JSON.stringify(commentToUpdate), {
      status: 201,
    })

  } catch (error) {
    return new Response(JSON.stringify(error.message), {
      status: 500,
    })
  }
}