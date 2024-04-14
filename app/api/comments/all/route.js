import Comment from "@/models/comment";
import { connectToDB } from "@/utils/database"

export const GET = async () => {
  try {
    await connectToDB();

    // const collection = new dataBase.Collection("comments", dataBase.connection, {});
    // const data = await collection.find({}).toArray();
    const data = await Comment.find({}).populate("creator");

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify("Failed to fetch comments"), {
      status: 500,
    })
  }
}