import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDb is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI), {
      dbName: "you-dey-work",
      useNewUrlParser: true,
      useUnifiedTopology: true
    }

    isConnected = true;

    console.log("Database is connected");
} catch (error) {
    console.log(err);
  }
}