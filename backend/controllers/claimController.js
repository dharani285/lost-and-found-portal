import Claim from "../models/claim.js";
import Item from "../models/items.js";
import Notification from "../models/notification.js";


// ======================================================
// CREATE CLAIM
// POST /api/claims
// ======================================================

export const createClaim = async (req, res) => {
    try {
        const { itemId, message } = req.body;

        if (!itemId || !message?.trim()) {
            return res.status(400).json({
                success: false,
                message: "itemId and message are required",
            });
        }


        // ======================================================
        // FIND ITEM
        // ======================================================

        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }


        // ======================================================
        // PREVENT OWNER FROM CLAIMING OWN ITEM
        // ======================================================

        if (
            item.owner.toString() ===
            req.user._id.toString()
        ) {
            return res.status(400).json({
                success: false,
                message: "You cannot claim your own item",
            });
        }


        // ======================================================
        // CHECK EXISTING CLAIM
        // ======================================================

        const existingClaim = await Claim.findOne({
            item: itemId,
            claimer: req.user._id,
        });

        if (existingClaim) {
            return res.status(400).json({
                success: false,
                message: "You have already claimed this item",
            });
        }


        // ======================================================
        // CREATE CLAIM
        // ======================================================

        const claim = await Claim.create({
            item: itemId,
            claimer: req.user._id,
            owner: item.owner,
            message: message.trim(),
        });


        // ======================================================
        // CREATE NOTIFICATION FOR ITEM OWNER
        // ======================================================

        await Notification.create({
            recipient: item.owner,
            sender: req.user._id,
            item: item._id,
            claim: claim._id,
            type: "CLAIM_SUBMITTED",
            message:
                `${req.user.name} submitted a claim for "${item.title}".`,
        });


        return res.status(201).json({
            success: true,
            message: "Claim created successfully",
            claim,
        });

    } catch (error) {
        console.error("CREATE CLAIM ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ======================================================
// CHECK EXISTING CLAIM
// GET /api/claims/check/:itemId
// ======================================================

export const checkExistingClaim = async (req, res) => {
    try {
        const { itemId } = req.params;

        const existingClaim = await Claim.findOne({
            item: itemId,
            claimer: req.user._id,
        });

        if (!existingClaim) {
            return res.status(200).json({
                success: true,
                hasClaimed: false,
                claim: null,
            });
        }

        return res.status(200).json({
            success: true,
            hasClaimed: true,
            claim: existingClaim,
        });

    } catch (error) {
        console.error("CHECK EXISTING CLAIM ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ======================================================
// GET MY CLAIMS
// GET /api/claims/my-claims
// ======================================================

export const getMyClaims = async (req, res) => {
    try {
        const claims = await Claim.find({
            claimer: req.user._id,
        })
            .populate(
                "item",
                "title description category type location image status"
            )
            .populate(
                "owner",
                "name email"
            )
            .sort({
                createdAt: -1,
            });


        console.log(
            "MY CLAIM STATUSES:",
            claims.map((claim) => ({
                id: claim._id,
                status: claim.status,
            }))
        );

        return res.status(200).json({
            success: true,
            claims,
        });

    } catch (error) {
        console.error("GET MY CLAIMS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// ======================================================
// GET RECEIVED CLAIMS
// GET /api/claims/received
// ======================================================

export const getReceivedClaims = async (req, res) => {
    try {
        const claims = await Claim.find({
            owner: req.user._id,
        })
            .populate(
                "item",
                "title description category type location image status"
            )
            .populate(
                "claimer",
                "name email phone"
            )
            .sort({
                createdAt: -1,
            });


        return res.status(200).json({
            success: true,
            claims,
        });

    } catch (error) {
        console.error("GET RECEIVED CLAIMS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// ======================================================
// UPDATE CLAIM STATUS
// PUT /api/claims/:id/status
// ======================================================
export const updateClaimStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        // ======================================================
        // VALIDATE STATUS
        // ======================================================
        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required",
            });
        }


        const allowedStatuses = [
            "Approved",
            "Rejected",
        ];


        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message:
                    "Status must be Approved or Rejected",
            });
        }
        // ======================================================
        // FIND CLAIM
        // ======================================================
        const claim = await Claim.findById(id);


        if (!claim) {
            return res.status(404).json({
                success: false,
                message: "Claim not found",
            });
        }
        // ======================================================
        // CHECK AUTHORIZATION
        // ======================================================
        if (
            claim.owner.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not authorized to update this claim",
            });
        }
        // ======================================================
        // PREVENT MULTIPLE STATUS UPDATES
        // ======================================================
        if (claim.status !== "Pending") {
            return res.status(400).json({
                success: false,
                message:
                    `Claim is already ${claim.status}`,
            });
        }
        // ======================================================
        // UPDATE CLAIM STATUS
        // ======================================================
        claim.status = status;

        await claim.save();
        // ======================================================
        // UPDATE ITEM STATUS WHEN CLAIM APPROVED
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
                    ? "Your claim has been approved."
                    : "Your claim has been rejected.",
        });
        // ======================================================
        // FETCH UPDATED CLAIM FROM DATABASE
        // ======================================================
        const updatedClaim = await Claim.findById(
            claim._id
        )
            .populate(
                "item",
                "title description category type location image status"
            )
            .populate(
                "claimer",
                "name email phone"
            )
            .populate(
                "owner",
                "name email"
            );
        // ======================================================
        // SEND RESPONSE
        // ======================================================

        return res.status(200).json({
            success: true,
            message:
                `Claim ${status.toLowerCase()} successfully`,
            claim: updatedClaim,
        });

    } catch (error) {
        console.error(
            "UPDATE CLAIM STATUS ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to update claim status",
            error: error.message,
        });
    }
};