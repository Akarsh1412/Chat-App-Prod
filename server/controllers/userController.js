import { User } from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async(req,res)=>{
    try {
        const {fullName, userName, password, confirmPassword, gender} = req.body;
        if(!fullName || !userName || !password || !confirmPassword || !gender) {
            return res.status(400).json({message: "All fields are required"});
        }
        if (password !== confirmPassword) {
            return res.status(400).json({message: "Passwords do not match"});
        }

        const user = await User.findOne({userName});

        if (user) {
            return res.status(400).json({message: "Username already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // Profile Pic
        const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        await User.create({
            fullName,
            userName,
            password: hashedPassword,
            profilePic: (gender === "male" ? maleProfilePic : femaleProfilePic),
            gender
        })
        return res.status(201).json({
            message: "User registered successfully",
            success: true
        });
    } catch(err) {
        console.log("Error ", err);
    }
};

export const login = async(req,res)=>{
    try {
        const {userName, password} = req.body;
        if(!userName || !password) {
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await User.findOne({userName});

        if (!user) {
            return res.status(400).json({
                message: "Incorrect Username or Password",
                success: false
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Incorrect Password",
                success: false
            });
        }
    
        const tokenData = {
            userId: user._id  
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: "1d"});

        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly:true, sameSite:'strict'}).json({
            _id:user._id,
            userName:user.userName,
            fullName:user.fullName,
            profilePic:user.profilePic
        });
    } catch(err) {
        console.log("Error ", err);
    }
};

export const logout = async(req,res)=>{
    try {
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "Logged out Successfully"
        });
    } catch(err) {
        console.log("Error ", err);
    }
};

export const getUsers = async(req,res)=>{
    try {
        const loggedInUser = req.id;
        const otherUsers = await User.find({_id:{$ne:loggedInUser}}).select("-password");
        return res.status(200).json(otherUsers);
    } catch(err) {
        console.log("Error ", err);
    }
}