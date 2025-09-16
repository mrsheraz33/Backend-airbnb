import uploadOncloudinary from "../config/cloudinary.js";
import Listing from "../models/listing.model.js";
import User from "../models/userModel.js";


export const addListing = async (req, res) => {
    try {
        let host = req.userId;
        let { title, description, rent, city, landMark, category } = req.body
        let image1 = await uploadOncloudinary(req.files.image1[0].path)
        let image2 = await uploadOncloudinary(req.files.image2[0].path)
        let image3 = await uploadOncloudinary(req.files.image3[0].path)

        let listing = await Listing.create({
            title,
            description,
            rent,
            city,
            landMark,
            category,
            image1,
            image2,
            image3,
            host
        })

        let user = await User.findByIdAndUpdate(host, { $push: { listing: listing._id } }, { new: true })

        if (!user) {
            return res.status(400).json({ message: `User not found!` })
        }

        return res.status(201).json(listing)


    } catch (error) {
        return res.status(500).json({ message: `Add listing error ${error}` })
    }
}

export const getListing = async (req, res) => {
    try {
        let listing = await Listing.find().sort({ createdAt: -1 })
        return res.status(200).json(listing)
    } catch (error) {
        return res.status(500).json({ message: `Get listing error ${error}` })
    }
}


export const findListing = async (req, res) => {
    try {
        let { id } = req.params
        let listing = await Listing.findById(id)
        if (!listing) {
            return res.status(404).json({ message: "listing not found" })
        }
        return res.status(200).json(listing)
    } catch (error) {
        return res.status(404).json({ message: `findinglisting error ${error}` })
    }
}

export const updateListing = async (req, res) => {
    try {
        let image1;
        let image2;
        let image3;

        let { id } = req.params;

        let { title, description, rent, city, landMark, category } = req.body
        if (req.files.image1) {
            image1 = await uploadOncloudinary(req.files.image1[0].path)
        }
        if (req.files.image2) {
            image2 = await uploadOncloudinary(req.files.image2[0].path)
        }
        if (req.files.image3) {
            image3 = await uploadOncloudinary(req.files.image3[0].path)
        }
        let listing = await Listing.findByIdAndUpdate(id, {
            title,
            description,
            rent,
            city,
            landMark,
            category,
            image1,
            image2,
            image3,
        }, { new: true })

        return res.status(201).json(listing)
    } catch (error) {
        return res.status(500).json({ message: `updatelisting error ${error}` })
    }
}


export const deleteListing = async (req, res) => {
    try {
        let { id } = req.params
        let listing = await Listing.findByIdAndDelete(id)
        let user = await User.findByIdAndUpdate(listing.host, { $pull: { Listing: listing._id } }, { new: true })
        if (!user) {
            return res.status(200).json({ message: "User not found" })
        }
        return res.status(200).json({ message: "deleting listing successfully" })
    } catch (error) {
        return res.status(500).json({ message: `deletinglisting error ${error}` })
    }
}


export const ratingListing = async (req, res) => {
    try {
        let { id } = req.params
        let { ratings } = req.body
        let listing = await Listing.findById(id)
        if (!listing) {
            return res.status(404).json({ message: "listing not found" })
        }

        listing.ratings = Number(ratings)
        await listing.save()

        return res.status(200).json({ ratings: listing.ratings })

    } catch (error) {
        return res.status(500).json({ message: `ratingListing error ${error}` })
    }
}


export const search = async (req, res) => {
    try {
        const { query } = req.query
        if (!query) {
            return res.status(400).json({ message: "search query is required" })
        }

        const listing = await Listing.find({
            $or: [
                { landMark: { $regex: query, $options: "i" } },
                { city: { $regex: query, $options: "i" } },
                { title: { $regex: query, $options: "i" } },
            ],
        }); 

        return res.status(200).json(listing)

    } catch (error) {
        return res.status(500).json({ message: `searching error ${error}` })
    }
}




