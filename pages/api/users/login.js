import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    await dbConnect();
    
    const { method } = req;
    
    if (method === "POST") {
        const { email, password } = req.body;
    
        if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please fill all fields" });
        }
    
        // Check if user exists
        const user = await User.findOne({ email });
    
        if (!user) {
        return res.status(400).json({ success: false, message: "User not found" });
        }
    
        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
    
        // Create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
        });
    
        return res.status(200).json({ success: true, token });
    } else {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}