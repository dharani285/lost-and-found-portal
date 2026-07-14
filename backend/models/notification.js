import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
            default: null,
        },

        claim: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Claim",
            default: null,
        },

        type: {
            type: String,
            enum: [
                "CLAIM_SUBMITTED",
                "CLAIM_APPROVED",
                "CLAIM_REJECTED",
            ],
            required: true,
        },

        message: {
            type: String,
            required: true,
        },

        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model(
    "Notification",
    notificationSchema
);

export default Notification;