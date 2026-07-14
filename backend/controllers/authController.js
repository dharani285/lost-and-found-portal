import bcrypt from "bcryptjs";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";
// ===============================
// Register User
// ===============================
export const registerUser = async (req, res,next) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
        });

        // Generate JWT
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });

    }catch (error) {

        next(error);

    }
};
// ===============================
// Login User
// ===============================
export const loginUser = async (req, res,next) => {
    try {
        
        const { email, password } = req.body;

        // Check fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter email and password",
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Generate Token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });

    } catch (error) {

        next(error);

    }
};
// ===============================
// Get Profile
// ===============================
export const getProfile = async (req, res,next) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {

        next(error);

    }
};