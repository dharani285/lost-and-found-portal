import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();


// ======================================================
// GET MY NOTIFICATIONS
// GET /api/notifications
// ======================================================

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get logged-in user's notifications
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications fetched successfully
 */

router.get(
    "/",
    authMiddleware,
    getNotifications
);


// ======================================================
// MARK ALL NOTIFICATIONS AS READ
// PUT /api/notifications/read-all
// ======================================================

/**
 * @swagger
 * /api/notifications/read-all:
 *   put:
 *     summary: Mark all notifications as read
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read
 */

router.put(
    "/read-all",
    authMiddleware,
    markAllNotificationsAsRead
);


// ======================================================
// MARK SINGLE NOTIFICATION AS READ
// PUT /api/notifications/:id/read
// ======================================================

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   put:
 *     summary: Mark a notification as read
 *     tags:
 *       - Notifications
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
 *         description: Notification marked as read
 */

router.put(
    "/:id/read",
    authMiddleware,
    markNotificationAsRead
);


export default router;