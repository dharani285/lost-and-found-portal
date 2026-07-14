
import express from "express";

import {
    createItem,
    getAllItems,
    getSingleItem,
    updateItem,
    deleteItem,
    getMyItems,
} from "../controllers/itemController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { validateItem } from "../middleware/validateMiddleware.js";

const router = express.Router();

// =======================
// Create Item
// =======================
router.post(
    "/create",
    authMiddleware,
    upload.single("image"),
    validateItem,
    createItem
);

// =======================
// Get My Items
// =======================
router.get(
    "/my-items",
    authMiddleware,
    getMyItems
);

// =======================
// Get All Items
// =======================
router.get("/", getAllItems);

// =======================
// Get Single Item
// =======================
router.get("/:id", getSingleItem);

// =======================
// Update Item
// =======================
router.put(
    "edit-item/:id",
    authMiddleware,
    upload.single("image"),
    updateItem
);

// =======================
// Delete Item
// =======================
router.delete(
    "/:id",
    authMiddleware,
    deleteItem
);

export default router;