import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDb is already connected");
    return mongoose;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI), {
      dbName: "you-dey-work",
      useNewUrlParser: true,
      useUnifiedTopology: true
    }

    isConnected = true;

    console.log("Database is connected");
    return mongoose
} catch (error) {
    console.log(error);
    throw error
  }
}