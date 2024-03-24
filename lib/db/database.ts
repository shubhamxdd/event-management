import mongoose from "mongoose";

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  cached.promise =
    cached.promise ||
    mongoose.connect(process.env.MONGODB_URL!, {
      dbName: "eventmgmt",
      bufferCommands: false,
    });
  cached.conn = await cached.promise;

  return cached.conn;
};
