import express from "express";

import {
    createClaim,
    getMyClaims,
    getReceivedClaims,
    updateClaimStatus,
    checkExistingClaim,
} from "../controllers/claimController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
// ======================================================
// CREATE CLAIM
// POST /api/claims
// ======================================================

/**
 * @swagger
 * /api/claims:
 *   post:
 *     summary: Create a new claim
 *     description: Allows an authenticated user to submit a claim for an item.
 *     tags:
 *       - Claims
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *               - message
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: ID of the item being claimed
 *                 example: 686abc1234567890abcdef12
 *               message:
 *                 type: string
 *                 description: Message or proof provided by the claimant
 *                 example: This item belongs to me. I can provide additional details.
 *     responses:
 *       201:
 *         description: Claim created successfully
 *       400:
 *         description: Invalid request, own item claim, or duplicate claim
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */

router.post(
    "/",
    authMiddleware,
    createClaim
);
router.get(
    "/check/:itemId",
    authMiddleware,
    checkExistingClaim
);

// ======================================================
// GET MY CLAIMS
// GET /api/claims/my-claims
// ======================================================

/**
 * @swagger
 * /api/claims/my-claims:
 *   get:
 *     summary: Get claims submitted by the logged-in user
 *     description: Returns all claims created by the authenticated user.
 *     tags:
 *       - Claims
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Claims fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   item:
 *                     type: object
 *                   claimer:
 *                     type: object
 *                   owner:
 *                     type: string
 *                   message:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum:
 *                       - Pending
 *                       - Approved
 *                       - Rejected
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.get(
    "/my-claims",
    authMiddleware,
    getMyClaims
);


// ======================================================
// GET RECEIVED CLAIMS
// GET /api/claims/received
// ======================================================

/**
 * @swagger
 * /api/claims/received:
 *   get:
 *     summary: Get claims received for the logged-in user's items
 *     description: Returns all claims submitted by other users for items owned by the authenticated user.
 *     tags:
 *       - Claims
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Received claims fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Claim ID
 *                   item:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       category:
 *                         type: string
 *                       type:
 *                         type: string
 *                       location:
 *                         type: string
 *                       image:
 *                         type: object
 *                       status:
 *                         type: string
 *                   claimer:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                   owner:
 *                     type: string
 *                   message:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum:
 *                       - Pending
 *                       - Approved
 *                       - Rejected
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.get(
    "/received",
    authMiddleware,
    getReceivedClaims
);


// ======================================================
// UPDATE CLAIM STATUS
// PUT /api/claims/:id/status
// ======================================================

/**
 * @swagger
 * /api/claims/{id}/status:
 *   put:
 *     summary: Approve or reject a claim
 *     description: Allows the owner of the claimed item to approve or reject a pending claim.
 *     tags:
 *       - Claims
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the claim to update
 *         schema:
 *           type: string
 *         example: 686abc1234567890abcdef12
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 description: New status of the claim
 *                 enum:
 *                   - Approved
 *                   - Rejected
 *                 example: Approved
 *     responses:
 *       200:
 *         description: Claim status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Claim Approved successfully
 *                 claim:
 *                   type: object
 *       400:
 *         description: Invalid status or claim already processed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: User is not authorized to update this claim
 *       404:
 *         description: Claim not found
 *       500:
 *         description: Internal server error
 */

router.put(
    "/:id/status",
    authMiddleware,
    updateClaimStatus
);


export default router;