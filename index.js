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
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/user" ,authRouter)
app.use("/api/listing",listingRouter)
app.use("/api/booking", bookingRouter)
const port = process.env.PORT || 2000

app.listen(port, ()=>{
    dbConnect()
    console.log(`server is started at ${port} port`);
})