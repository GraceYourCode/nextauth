import Comment from "@/models/comments";
import { connectToDB } from "@/utils/database"

export const GET = async () => {
  try {
    const dataBase = await connectToDB();

    const collection = new dataBase.Collection("comments", dataBase.connection, {});
    const data = await collection.find({}).toArray();
    console.log(data, "i wan see wetin dey sup")


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