import express from "express"
import dotenv from "dotenv"
import dbConnect from "./config/db.js"
import authRouter from "./routers/userRouter.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import listingRouter from "./routers/listing.route.js"
import bookingRouter from "./routers/booking.route.js"

let app = express()
app.use(express.json())
app.use(cookieParser())

app.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (error) {
    res.status(500).json({ message: "Database connection error" });
  }
});


app.use(cors({
  origin: [
    "http://localhost:5173",               
    "https://frontent-airbnb-5orv.vercel.app" 
  ],
  credentials: true
}));

app.use("/api/user" ,authRouter)
app.use("/api/listing",listingRouter)
app.use("/api/booking", bookingRouter)

// const port = process.env.PORT || 2000

// app.listen(port, ()=>{
//     dbConnect()
//     console.log(`server is started at ${port} port`);
// })

export default app;



// ✅ For local dev (Railway/Render/localhost)

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 2000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port} ✅`);
  });
}