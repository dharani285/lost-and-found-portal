import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            enum: ["Lost", "Found"],
            required: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        date: {
            type: Date,
            default: Date.now,
        },

        image: {
            public_id: {
                type: String,
                default: "",
            },

            url: {
                type: String,
                default: "",
            },
        },

        status: {
            type: String,
            enum: ["Open", "Claimed", "Returned"],
            default: "Open",
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;