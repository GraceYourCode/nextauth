import Comment from "@/models/comment";
import { connectToDB } from "@/utils/database"
import { Types } from "mongoose";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const usersPosts = await Comment.find({ "creator._id": new Types.ObjectId(params.id) }).populate("creator");
    const usersPosts2 = (await Comment.find({}).populate("creator")).filter(comment => comment._id !== params.id)

    console.log(usersPosts2)

    return new Response(JSON.stringify(usersPosts2))
  } catch (error) {
    console.log(error.message)
  }
}