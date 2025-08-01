import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from 'jsonwebtoken'
export async function Signup(req, res) {
    const { email, password, fullName } = req.body

    try {
        if (!email || !fullName || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters" })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const index = Math.floor(Math.random() * 100) + 1
        const randomAvatar = `https://avatar.iran.liara.run/public/${index}.png`

        const newUser = await User.create({
            email, fullName, password, profilePic: randomAvatar
        })


        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || ""
            })
            console.log("Stream user created for", newUser.fullName)
        } catch (error) {
            console.error("Failed creating stream user", error)
        }

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })
        res.status(201).json({ suceess: true, message: "User Created", user: newUser })

    } catch (error) {
        console.log("Error in Signup", error)
        res.status(500).json({ message: "Something went wrong" })
    }
}
export async function Login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }
        const isPasswordCorrect = user.matchPassword(password)
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(200).json({ success: true, user })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })

    }
}
export async function Logout(req, res) {
    res.clearCookie("jwt")
    res.status(200).json({ success: true, message: "Logged Out Successfully" })

}


export async function Onboard(req, res) {
    try {
        const userId = req.user._id;
        const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body
        if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({
                message: "All fields are required", missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLangauge",
                    !learningLanguage && "learningLanguage",
                    !location && "location"
                ].filter(Boolean)
            })
        }
        const updatedUser = await User.findByIdAndUpdate(userId, {
            ...req.body, isOnboarded: true
        }, { new: true })
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" })
        }
        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || ""
            })
            console.log("User updated in Stream", updatedUser.fullName)
        } catch (error) {
            console.error("Error updating user in stream", error)
        }

        return res.status(200).json({ success: true, user: updatedUser })
    } catch (error) {
        console.error("Error Onboarding user", error);
        res.status(500).json({ message: "Error Onboarding User" })
    }
}