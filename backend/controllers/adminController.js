import User from "../models/user.js";
import Item from "../models/items.js";
import Claim from "../models/claim.js";
import ExcelJS from "exceljs";
import Notification from "../models/notification.js";

// ======================================================
// GET ALL USERS
// ======================================================

export const getAllUsers = async (req, res, next) => {
    try {

        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            count: users.length,
            users,
        });

    } catch (error) {

        next(error);

    }
};
// ======================================================
// DELETE USER
// ======================================================
export const deleteUser = async (req, res, next) => {
    try {

        // Prevent admin from deleting their own account
        if (req.user._id.toString() === req.params.id) {

            return res.status(400).json({
                success: false,
                message: "Admin cannot delete their own account",
            });

        }


        // Find user
        const user = await User.findById(req.params.id);


        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found",
            });

        }


        // Delete user
        await user.deleteOne();


        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {

        next(error);

    }
};
// ======================================================
// GET ALL ITEMS
// ======================================================
export const getAllItemsAdmin = async (req, res, next) => {
    try {

        const items = await Item.find()
            .populate("owner", "name email");


        res.status(200).json({
            success: true,
            count: items.length,
            items,
        });

    } catch (error) {

        next(error);

    }
};
// ======================================================
// DELETE ITEM
// ======================================================
export const deleteItemAdmin = async (req, res, next) => {
    try {

        const item = await Item.findById(req.params.id);


        if (!item) {

            return res.status(404).json({
                success: false,
                message: "Item not found",
            });

        }


        await item.deleteOne();


        res.status(200).json({
            success: true,
            message: "Item deleted successfully",
        });

    } catch (error) {

        next(error);

    }
};
// ======================================================
// GET ALL CLAIMS
// ======================================================
export const getAllClaimsAdmin = async (req, res, next) => {
    try {

        const claims = await Claim.find()
            .populate("item")
            .populate("claimer", "name email")
            .populate("owner", "name email");


        res.status(200).json({
            success: true,
            count: claims.length,
            claims,
        });

    } catch (error) {

        next(error);

    }
};
// ======================================================
// UPDATE CLAIM STATUS
// ======================================================
export const updateClaimStatus = async (req, res, next) => {
    try {

        const { status } = req.body;


        // ======================================================
        // VALIDATE STATUS
        // ======================================================

        const allowedStatuses = [
            "Approved",
            "Rejected",
        ];


        if (!allowedStatuses.includes(status)) {

            return res.status(400).json({
                success: false,
                message: "Status must be Approved or Rejected",
            });

        }


        // ======================================================
        // FIND CLAIM
        // ======================================================

        const claim = await Claim.findById(req.params.id);


        if (!claim) {

            return res.status(404).json({
                success: false,
                message: "Claim not found",
            });

        }


        // ======================================================
        // PREVENT MULTIPLE STATUS UPDATES
        // ======================================================

        if (claim.status !== "Pending") {

            return res.status(400).json({
                success: false,
                message: `Claim is already ${claim.status}`,
            });

        }
        // ======================================================
        // UPDATE CLAIM STATUS
        // ======================================================
        claim.status = status;

        await claim.save();
        // ======================================================
        // UPDATE ITEM STATUS WHEN APPROVED
        // ======================================================

        if (status === "Approved") {

            await Item.findByIdAndUpdate(

                claim.item,

                {
                    status: "Claimed",
                },

                {
                    new: true,
                    runValidators: true,
                }

            );

        }
        // ======================================================
        // CREATE NOTIFICATION FOR CLAIMER
        // ======================================================
        await Notification.create({

            recipient: claim.claimer,

            sender: req.user._id,

            item: claim.item,

            claim: claim._id,

            type:
                status === "Approved"
                    ? "CLAIM_APPROVED"
                    : "CLAIM_REJECTED",

            message:
                status === "Approved"
                    ? "Your claim has been approved by an administrator."
                    : "Your claim has been rejected by an administrator.",

        });
        // ======================================================
        // GET UPDATED CLAIM
        // ======================================================
        const updatedClaim = await Claim.findById(claim._id)

            .populate("item")

            .populate("claimer", "name email")

            .populate("owner", "name email");
        // ======================================================
        // SEND RESPONSE
        // ======================================================
        res.status(200).json({

            success: true,

            message:
                `Claim ${status.toLowerCase()} successfully`,

            claim: updatedClaim,

        });


    } catch (error) {

        next(error);

    }
};
// ======================================================
// DASHBOARD STATISTICS
// ======================================================

export const getDashboardStats = async (req, res, next) => {
    try {

        const totalUsers = await User.countDocuments();


        const totalItems = await Item.countDocuments();


        const totalClaims = await Claim.countDocuments();


        const lostItems = await Item.countDocuments({
            type: "Lost",
        });


        const foundItems = await Item.countDocuments({
            type: "Found",
        });


        const openItems = await Item.countDocuments({
            status: "Open",
        });


        const returnedItems = await Item.countDocuments({
            status: "Returned",
        });


        res.status(200).json({

            success: true,

            data: {

                totalUsers,

                totalItems,

                totalClaims,

                lostItems,

                foundItems,

                openItems,

                returnedItems,

            },

        });

    } catch (error) {

        next(error);

    }
};
// ======================================================
// EXPORT USERS TO EXCEL
// ======================================================
export const exportUsersExcel = async (req, res) => {
    try {

        // Get all users
        const users = await User.find().select("-password");


        // Create workbook
        const workbook = new ExcelJS.Workbook();


        // Create worksheet
        const worksheet = workbook.addWorksheet("Users");


        // Define columns
        worksheet.columns = [

            {
                header: "Name",
                key: "name",
                width: 25,
            },

            {
                header: "Email",
                key: "email",
                width: 30,
            },

            {
                header: "Phone",
                key: "phone",
                width: 20,
            },

            {
                header: "Role",
                key: "role",
                width: 15,
            },

        ];


        // Add rows
        users.forEach((user) => {

            worksheet.addRow({

                name: user.name,

                email: user.email,

                phone: user.phone,

                role: user.role,

            });

        });


        // Response headers
        res.setHeader(

            "Content-Type",

            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

        );


        res.setHeader(

            "Content-Disposition",

            'attachment; filename="users.xlsx"'

        );


        // Send workbook
        await workbook.xlsx.write(res);


        res.end();

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};