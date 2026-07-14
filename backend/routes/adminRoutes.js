import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
    getAllUsers,
    deleteUser,
    exportUsersExcel,
    getAllItemsAdmin,
    deleteItemAdmin,
    getAllClaimsAdmin,
    updateClaimStatus,
    getDashboardStats,
} from "../controllers/adminController.js";

const router = express.Router();

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics fetched successfully
 */

// Dashboard
router.get(
    "/dashboard",
    authMiddleware,
    adminMiddleware,
    getDashboardStats
);
// Export Users to Excel
router.get(
    "/export/users",
    authMiddleware,
    adminMiddleware,
    exportUsersExcel
);
// Users
/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

// Items
/**
 * @swagger
 * /api/admin/items:
 *   get:
 *     summary: Get all items (Admin)
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all items
 */
router.get("/items", authMiddleware, adminMiddleware, getAllItemsAdmin);

/**
 * @swagger
 * /api/admin/items/{id}:
 *   delete:
 *     summary: Delete an item
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted successfully
 */
router.delete("/items/:id", authMiddleware, adminMiddleware, deleteItemAdmin);

// Claims
/**
 * @swagger
 * /api/admin/claims:
 *   get:
 *     summary: Get all claims
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all claims
 */
router.get("/claims", authMiddleware, adminMiddleware, getAllClaimsAdmin);

export default router;