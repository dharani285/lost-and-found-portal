import express from "express";

import {
    registerUser,
    loginUser,
    getProfile,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { loginLimiter } from "../middleware/rateLimiter.js";

import {
    validateRegister,
    validateLogin,
} from "../middleware/validateMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post(
    "/register",
    validateRegister,
    registerUser
);



/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post(
    "/login",
    validateLogin,
    loginUser
);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get logged in user's profile
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 */
router.get(
    "/profile",
    authMiddleware,
    getProfile
);

export default router;