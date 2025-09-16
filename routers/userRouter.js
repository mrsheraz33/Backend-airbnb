import express from "express"
import { getCurrentUser, logIn, logOut, signUp } from "../controller/userController.js"
import isAuth from "../middleware/isAuthMiddleware.js"

const authRouter = express.Router()

authRouter.post("/signup" ,signUp)
authRouter.post("/login" ,logIn)
authRouter.post("/logout" ,logOut)
authRouter.get("/currentuser",isAuth ,getCurrentUser)

export default authRouter


