import {
    BellIcon,
    CheckCircleIcon,
    XCircleIcon,
    InboxIcon,
} from "@heroicons/react/24/outline";

import { useNotifications } from "../Context/NotificationContext";

function Notifications() {
    const {
        notifications,
        unreadCount,
        loading,
        readNotification,
        readAllNotifications,
    } = useNotifications();

    const handleMarkAsRead = async (notification) => {
        if (notification.isRead) {
            return;
        }

        await readNotification(notification._id);
    };

    const handleMarkAllAsRead = async () => {
        await readAllNotifications();
    };

    const getNotificationIcon = (type) => {
        if (type === "CLAIM_APPROVED") {
            return (
                <CheckCircleIcon className="w-7 h-7 text-green-600" />
            );
        }

        if (type === "CLAIM_REJECTED") {
            return (
                <XCircleIcon className="w-7 h-7 text-red-600" />
            );
        }

        return <BellIcon className="w-7 h-7 text-purple-600" />;
    };

    const getNotificationTitle = (type) => {
        if (type === "CLAIM_SUBMITTED") {
            return "New Claim Received";
        }

        if (type === "CLAIM_APPROVED") {
            return "Claim Approved";
        }

        if (type === "CLAIM_REJECTED") {
            return "Claim Rejected";
        }

        return "Notification";
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString();
    };

    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center">
                    <div
                        className="
                            w-12
                            h-12
                            mx-auto
                            border-4
                            border-purple-100
                            border-t-purple-600
                            rounded-full
                            animate-spin
                        "
                    />

                    <p className="mt-4 text-lg font-semibold text-gray-500">
                        Loading notifications...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <main
            className="
                max-w-7xl
                mx-auto
                px-6
                pb-8
            "
            style={{
                paddingTop: "25px",
            }}
        >
            <div
                className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-end
                    sm:justify-between
                    gap-4
                "
            >
                <div>
                    <div className="flex items-center gap-3">
                        <BellIcon
                            className="
                                w-10
                                h-10
                                text-purple-600
                            "
                        />

                        <h1
                            className="
                                text-4xl
                                font-bold
                                text-gray-900
                            "
                        >
                            Notifications
                        </h1>
                    </div>

                    <p
                        className="
                            mt-2
                            text-gray-500
                            text-lg
                        "
                    >
                        You have {unreadCount} unread notification
                        {unreadCount !== 1 ? "s" : ""}.
                    </p>
                </div>

                {unreadCount > 0 && (
                    <button
                        onClick={handleMarkAllAsRead}
                        className="
                            px-5
                            py-3
                            bg-purple-600
                            hover:bg-purple-700
                            text-white
                            rounded-xl
                            font-semibold
                            shadow-sm
                            hover:shadow-md
                            transition-all
                            duration-200
                            w-[130px]
                        "
                    >
                        Mark All as Read
                    </button>
                )}
            </div>

            {notifications.length === 0 ? (
                <div
                    className="
                        min-h-[55vh]
                        flex
                        items-center
                        justify-center
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            gap-5
                        "
                    >
                        <div
                            className="
                                w-20
                                h-20
                                shrink-0
                                bg-purple-100
                                rounded-full
                                flex
                                items-center
                                justify-center
                            "
                        >
                            <InboxIcon
                                className="
                                    w-10
                                    h-10
                                    text-purple-600
                                "
                            />
                        </div>

                        <div>
                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                    text-gray-900
                                "
                            >
                                No Notifications
                            </h2>

                            <p className="mt-1 text-gray-500">
                                You don't have any notifications yet.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        lg:grid-cols-3
                        gap-5
                        items-start
                        mt-5
                    "
                >
                    {notifications.map((notification) => (
                        <div
                            key={notification._id}
                            onClick={() =>
                                handleMarkAsRead(notification)
                            }
                            className={`
                                relative
                                p-5
                                rounded-2xl
                                border
                                cursor-pointer
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:shadow-lg

                                ${
                                    notification.isRead
                                        ? `
                                            bg-white
                                            border-gray-200
                                            shadow-sm
                                        `
                                        : `
                                            bg-purple-50
                                            border-purple-300
                                            shadow-md
                                        `
                                }
                            `}
                        >
                            {!notification.isRead && (
                                <span
                                    className="
                                        absolute
                                        top-4
                                        right-4
                                        w-3
                                        h-3
                                        bg-purple-600
                                        rounded-full
                                    "
                                />
                            )}

                            <div className="flex items-start gap-4">
                                <div
                                    className="
                                        w-12
                                        h-12
                                        shrink-0
                                        rounded-full
                                        bg-white
                                        flex
                                        items-center
                                        justify-center
                                        shadow-sm
                                        border
                                        border-gray-100
                                    "
                                >
                                    {getNotificationIcon(notification.type)}
                                </div>

                                <div className="flex-1 min-w-0 pr-3">
                                    <h2
                                        className={`
                                            text-lg
                                            leading-tight

                                            ${
                                                notification.isRead
                                                    ? "font-semibold text-gray-700"
                                                    : "font-bold text-gray-900"
                                            }
                                        `}
                                    >
                                        {getNotificationTitle(
                                            notification.type
                                        )}
                                    </h2>

                                    <p
                                        className="
                                            mt-1
                                            text-gray-600
                                            leading-snug
                                        "
                                    >
                                        {notification.message}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-3">
                                {notification.item?.title && (
                                    <p
                                        className="
                                            text-sm
                                            font-semibold
                                            text-purple-600
                                        "
                                    >
                                        Item: {notification.item.title}
                                    </p>
                                )}

                                {notification.sender?.name && (
                                    <p
                                        className="
                                            mt-1
                                            text-sm
                                            text-gray-500
                                        "
                                    >
                                        From: {notification.sender.name}
                                    </p>
                                )}
                            </div>

                            <div
                                className="
                                    mt-3
                                    pt-3
                                    border-t
                                    border-gray-200
                                "
                            >
                                <p className="text-sm text-gray-400">
                                    {formatDate(notification.createdAt)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}

export default Notifications;