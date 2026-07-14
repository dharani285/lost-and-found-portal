import Item from "../models/items.js";
import cloudinary from "../config/cloudinary.js";

// ======================================================
// CREATE ITEM
// ======================================================

export const createItem = async (req, res, next) => {
    try {
        const {
            title,
            description,
            category,
            type,
            location,
            date,
        } = req.body;

        const image = req.file
            ? {
                  public_id: req.file.filename,
                  url: req.file.path,
              }
            : {};

        const item = await Item.create({
            title,
            description,
            category,
            type,
            location,
            date,
            image,
            owner: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Item created successfully",
            item,
        });
    } catch (error) {
        next(error);
    }
};

// ======================================================
// GET ALL ITEMS
// ======================================================

export const getAllItems = async (req, res, next) => {
    try {
        const {
            keyword,
            category,
            type,
            location,
            status,
            sort,
            page = 1,
            limit = 5,
        } = req.query;

        const query = {};

        if (keyword) {
            query.$or = [
                {
                    title: {
                        $regex: keyword,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: keyword,
                        $options: "i",
                    },
                },
            ];
        }

        if (category) {
            query.category = category;
        }

        if (type) {
            query.type = type;
        }

        if (location) {
            query.location = {
                $regex: location,
                $options: "i",
            };
        }

        if (status) {
            query.status = status;
        }

        const currentPage = Number(page);
        const itemsPerPage = Number(limit);
        const skip = (currentPage - 1) * itemsPerPage;

        const sortOption = {};

        if (sort === "latest") {
            sortOption.createdAt = -1;
        } else if (sort === "oldest") {
            sortOption.createdAt = 1;
        } else if (sort === "title") {
            sortOption.title = 1;
        } else if (sort === "location") {
            sortOption.location = 1;
        }

        const totalItems = await Item.countDocuments(query);

        const items = await Item.find(query)
            .populate("owner", "name email")
            .sort(sortOption)
            .skip(skip)
            .limit(itemsPerPage);

        res.status(200).json({
            success: true,
            currentPage,
            itemsPerPage,
            totalItems,
            totalPages: Math.ceil(totalItems / itemsPerPage),
            count: items.length,
            items,
        });
    } catch (error) {
        next(error);
    }
};

// ======================================================
// GET SINGLE ITEM
// ======================================================

export const getSingleItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id).populate(
            "owner",
            "name email"
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        res.status(200).json({
            success: true,
            item,
        });
    } catch (error) {
        next(error);
    }
};

// ======================================================
// UPDATE ITEM
// ======================================================

export const updateItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        if (item.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this item.",
            });
        }

        if (req.file) {
            if (item.image?.public_id) {
                await cloudinary.uploader.destroy(item.image.public_id);
            }

            item.image = {
                public_id: req.file.filename,
                url: req.file.path,
            };
        }

        item.title = req.body.title || item.title;
        item.description = req.body.description || item.description;
        item.category = req.body.category || item.category;
        item.type = req.body.type || item.type;
        item.location = req.body.location || item.location;
        item.date = req.body.date || item.date;
        item.status = req.body.status || item.status;

        await item.save();

        res.status(200).json({
            success: true,
            message: "Item updated successfully",
            item,
        });
    } catch (error) {
        next(error);
    }
};

// ======================================================
// DELETE ITEM
// ======================================================

export const deleteItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        if (item.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this item.",
            });
        }

        if (item.image?.public_id) {
            await cloudinary.uploader.destroy(item.image.public_id);
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
// GET MY ITEMS
// ======================================================

export const getMyItems = async (req, res, next) => {
    try {
        const items = await Item.find({
            owner: req.user._id,
        }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: items.length,
            items,
        });
    } catch (error) {
        next(error);
    }
};
