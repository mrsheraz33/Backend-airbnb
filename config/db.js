import mongoose from "mongoose";

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) return; // already connected
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ MongoDB Connected:", conn.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default dbConnect;


// try {
//     await mongoose.connect(process.env.MONGODB_URL)
//     console.log("MongoDB is connected!");
// } catch (error) {
//     console.error("MongoDB is not connected!", error.message)
// }