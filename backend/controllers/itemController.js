import Item from "../models/items.js";
import cloudinary from "../config/cloudinary.js";

// ==================== Create Item ====================

export const createItem = async (req, res,next) => {
   

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

// ==================== Get All Items (Search Supported) ====================

// ==================== Get All Items (Search + Filters + Pagination) ====================

// ==================== Get All Items (Search + Filters + Pagination + Sorting) ====================

export const getAllItems = async (req, res,next) => {
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

        let query = {};

        // Search by Title or Description
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

        // Filter by Category
        if (category) {
            query.category = category;
        }

        // Filter by Type
        if (type) {
            query.type = type;
        }

        // Filter by Location
        if (location) {
            query.location = {
                $regex: location,
                $options: "i",
            };
        }

        // Filter by Status
        if (status) {
            query.status = status;
        }

        // Pagination
        const currentPage = Number(page);
        const itemsPerPage = Number(limit);

        const skip = (currentPage - 1) * itemsPerPage;

        // Sorting
        let sortOption = {};

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

    }catch (error) {

        next(error);

    }
};

// ==================== Get Single Item ====================

export const getSingleItem = async (req, res,next) => {

    
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

// ==================== Update Item ====================

export const updateItem = async (req, res,next) => {
    try {

        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }
         // Only owner can update
        if (item.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this item.",
            });
        }

        // Delete old image if new image uploaded
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

// ==================== Delete Item ====================

export const deleteItem = async (req, res,next) => {
    try {

        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }
         // Only owner can delete
        if (item.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this item.",
            });
        }
        // Delete image from Cloudinary
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
// ==================== Get My Items ====================

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
