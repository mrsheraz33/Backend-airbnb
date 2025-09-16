import express from "express" 
import isAuth from "../middleware/isAuthMiddleware.js"
import { cancelBooking, createBooking } from "../controller/Booking.controller.js"

const bookingRouter = express.Router()

bookingRouter.post("/create/:id" , isAuth, createBooking)
bookingRouter.delete("/cancel/:id" , isAuth, cancelBooking)





export default bookingRouter