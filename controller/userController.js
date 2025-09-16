import genToken from "../config/token.js"
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"


export const signUp = async (req, res) => {
    try {
        let { userName, email, password } = req.body
        let existUser = await User.findOne({ email }).select("-password").populate("listing",
            "title image1 image2 image3 rent city category landMark")
        if (existUser) {
            return res.status(400).json({ message: "User is Already exist" })
        }

        let hassedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            userName,
            email,
            password: hassedPassword
        })

        let token = genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({ message: error?.message || `Internal server error ${error}` })
    }
}

export const logIn = async (req, res) => {
    try {
        let { email, password } = req.body;
        let existUser = await User.findOne({ email })

        if (!existUser) {
            return res.status(400).json({ message: "User does not found!" })
        }

        let match = await bcrypt.compare(password, existUser.password)
        if (!match) {
            return res.status(400).json({ message: "Incorrect password!" })
        }

        let token = genToken(existUser._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
       sameSite:  "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json(existUser)
    } catch (error) {
        return res.status(500).json({ message: error?.message || `Internal server error ${error}`})
    }
}

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "logout successfully!" })
    } catch (error) {
        return res.status(500).json({ message: error?.message || `Internal server error ${error}` })
    }
}

export const getCurrentUser = async (req,res)=>{
    try {
        let currentUser = await User.findById(req.userId).select("-password").populate("listing",
            "title image1 image2 image3 rent city description category landMark isBooked host ratings")
            .populate("booking",
            "title image1 image2 image3 rent description city category landMark isBooked host ratings")


        if(!currentUser){
            return res.status(400).json({message:"User does not found!"})
        }
            return res.status(201).json(currentUser)

      
    } catch (error) {
         return res.status(400).json({message:`Current User error ${error}`})
    }
}
