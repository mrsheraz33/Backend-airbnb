import mongoose from "mongoose";

const dbConnect = async ()=>{
try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("MongoDB is connected!");
} catch (error) {
    console.error("MongoDB is not connected!", error.message)
}
}


export default dbConnect



