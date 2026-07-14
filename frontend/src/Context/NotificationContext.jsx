import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";

import { useAuth } from "./AuthContext";

import {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} from "../services/notificationService";


const NotificationContext = createContext();


export const NotificationProvider = ({ children }) => {

    const { user } = useAuth();

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);


    // ======================================================
    // FETCH NOTIFICATIONS
    // ======================================================

    const fetchNotifications = useCallback(async () => {

        if (!user) {
            setNotifications([]);
            return;
        }

        try {

            setLoading(true);

            const data = await getNotifications();

            setNotifications(data.notifications || []);

        } catch (error) {

            console.error(
                "Failed to fetch notifications:",
                error
            );

        } finally {

            setLoading(false);

        }

    }, [user]);


    // ======================================================
    // AUTOMATICALLY FETCH AFTER LOGIN
    // ======================================================

    useEffect(() => {

        if (user) {
            fetchNotifications();
        } else {
            setNotifications([]);
        }

    }, [user, fetchNotifications]);


    // ======================================================
    // MARK ONE AS READ
    // ======================================================

    const readNotification = async (notificationId) => {

        try {

            await markNotificationAsRead(notificationId);

            setNotifications((previousNotifications) =>
                previousNotifications.map((notification) =>
                    notification._id === notificationId
                        ? {
                            ...notification,
                            isRead: true,
                        }
                        : notification
                )
            );

        } catch (error) {

            console.error(
                "Failed to mark notification as read:",
                error
            );

        }

    };


    // ======================================================
    // MARK ALL AS READ
    // ======================================================

    const readAllNotifications = async () => {

        try {

            await markAllNotificationsAsRead();

            setNotifications((previousNotifications) =>
                previousNotifications.map((notification) => ({
                    ...notification,
                    isRead: true,
                }))
            );

        } catch (error) {

            console.error(
                "Failed to mark all notifications as read:",
                error
            );

        }

    };


    // ======================================================
    // UNREAD COUNT
    // ======================================================

    const unreadCount = notifications.filter(
        (notification) => !notification.isRead
    ).length;


    return (

        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                loading,

                fetchNotifications,
                readNotification,
                readAllNotifications,
            }}
        >

            {children}

        </NotificationContext.Provider>

    );
};


export const useNotifications = () => {

    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error(
            "useNotifications must be used inside NotificationProvider"
        );
    }

    return context;
};