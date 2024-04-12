import Comment from "@/models/comments";
import { connectToDB } from "@/utils/database"

export const GET = async () => {
  try {
    const dataBase = await connectToDB();

    //     const db = await connectToMongoDB();
    // const collection = db.collection('your-collection-name');
    // const data = await collection.find({}).toArray();
    const collection = new dataBase.Collection("comments").find({}).toArray();
    // const data = await collection
console.log(data, "i wan see wetin dey sup")
    // const comments = await Comment.find({}).populate("creator");
    const comments = [
      {
        "serious": "more serious",
        "abi": "kila ma tun se",
        "works?": "if this doesn't work?..."
      },
      {
        "serious": "more serious",
        "abi": "kila ma tun se",
        "works?": "if this doesn't work?..."
      },
      {
        "serious": "more serious",
        "abi": "kila ma tun se",
        "works?": "if this doesn't work?..."
      },
    ]

    console.log(comments)
    console.log(collection)

    return new Response(JSON.stringify(comments), {
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch comments"), {
      status: 500,
    })
  }
}