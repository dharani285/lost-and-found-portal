import User from "../models/user.js";
import bcrypt from "bcryptjs";
// Get Logged-in User
export const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update Profile
export const updateProfile = async (req, res) => {
    try {

        const { name, phone } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        user.name = name || user.name;
        user.phone = phone || user.phone;

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

// Change Password
export const changePassword = async (req, res) => {

    try {

        const {
            currentPassword,
            newPassword,
        } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Current password is incorrect",
            });
        }

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(
            newPassword,
            salt
        );

        await user.save();

        res.status(200).json({
            message: "Password changed successfully",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};