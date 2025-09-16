import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import dotenv from "dotenv"
import { log } from 'console';
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_APIKEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECERT
})

const uploadOncloudinary =async (filePath)=>{
    try {
        if(!filePath) return null
        const result = await cloudinary.uploader.upload(filePath)
        fs.unlinkSync(filePath)

        return result.secure_url
    } catch (error) {
          fs.unlinkSync(filePath)
          console.log(error);
          
    }
}


export default uploadOncloudinary