import Notification from "../models/notification.js";
// ======================================================
// GET MY NOTIFICATIONS
// GET /api/notifications
// ======================================================
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            recipient: req.user._id,
        })
            .populate("sender", "name")
            .populate("item", "title")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: notifications.length,
            notifications,
        });

    } catch (error) {
        console.error("GET NOTIFICATIONS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// ======================================================
// MARK SINGLE NOTIFICATION AS READ
// PUT /api/notifications/:id/read
// ======================================================

export const markNotificationAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found",
            });
        }

        if (
            notification.recipient.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        notification.isRead = true;

        await notification.save();

        return res.status(200).json({
            success: true,
            notification,
        });

    } catch (error) {
        console.error("MARK READ ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ======================================================
// MARK ALL AS READ
// PUT /api/notifications/read-all
// ======================================================

export const markAllNotificationsAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            {
                recipient: req.user._id,
                isRead: false,
            },
            {
                isRead: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "All notifications marked as read",
        });

    } catch (error) {
        console.error("MARK ALL READ ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};