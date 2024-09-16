import mongoose from "mongoose";

let isConnected: Boolean = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    return console.log("Database is already connected !");
  }
  if (!process.env.MONGODB_URL) {
    return console.log("Check mongoDB URL");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "tuniFlow",
    });
    isConnected = true;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Something happened with DB", error);
  }
};
