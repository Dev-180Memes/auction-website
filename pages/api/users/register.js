import bcrypt from 'bcryptjs';
import dbConnect from '@/utils/dbConnect';
import jwt from 'jsonwebtoken';
import User from '@/models/User';

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    if (method === 'POST') {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please fill all fields' });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            userName: username,
            email,
            password: hashedPassword
        });

        // Create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        return res.status(201).json({ success: true, token });

    } else {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}