import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    FileText,
    Activity,
    ShieldCheck,
    Bell,
    ArrowRight,
} from "lucide-react";

import { getMyItems } from "../services/itemService";
import { getMyClaims } from "../services/claimService";
import { getNotifications } from "../services/notificationService";

import { useAuth } from "../Context/AuthContext";
import { useNotifications } from "../Context/NotificationContext";


function Dashboard() {

    const { user } = useAuth();
    const { unreadCount } = useNotifications();


    // ======================================================
    // STATE
    // ======================================================

    const [items, setItems] = useState([]);
    const [claims, setClaims] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ======================================================
    // FETCH DASHBOARD DATA
    // ======================================================

    useEffect(() => {

        const fetchDashboardData = async () => {

            try {

                setLoading(true);
                setError("");

                const [
                    itemsResponse,
                    claimsResponse,
                    notificationsResponse,
                ] = await Promise.all([
                    getMyItems(),
                    getMyClaims(),
                    getNotifications(),
                ]);

                setItems(
                    itemsResponse.items ||
                    itemsResponse.data ||
                    []
                );

                setClaims(
                    claimsResponse.claims ||
                    claimsResponse.data ||
                    []
                );

                setNotifications(
                    notificationsResponse.notifications ||
                    notificationsResponse.data ||
                    []
                );

            } catch (error) {

                console.error(
                    "Dashboard fetch error:",
                    error
                );

                setError(
                    "Unable to load dashboard data."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchDashboardData();

    }, []);


    // ======================================================
    // DASHBOARD DATA
    // ======================================================

    const totalReports = items.length;

    const activeReports = items.filter(
        (item) =>
            item.status?.toLowerCase() === "open" ||
            item.status?.toLowerCase() === "active"
    ).length;

    const totalClaims = claims.length;

    const recentReports = items.slice(0, 4);

    const recentActivity = notifications.slice(0, 4);


    // ======================================================
    // FORMAT DATE
    // ======================================================

    const formatDate = (date) => {

        if (!date) {
            return "N/A";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );

    };


    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {

        return (

            <div
                className="
                    min-h-[70vh]
                    flex
                    items-center
                    justify-center
                "
            >

                <p
                    className="
                        gabarito
                        text-2xl
                        font-semibold
                        text-purple-600
                    "
                >
                    Loading dashboard...
                </p>

            </div>

        );

    }


    // ======================================================
    // DASHBOARD
    // ======================================================

    return (

        <main
            className="
                w-full
                bg-gray-50/40
                min-h-screen
            "
        >

            <div
                className="
                    max-w-7xl
                    mx-auto
                    px-8
                    pt-16
                    pb-24
                "
            >


                {/* ======================================================
                    WELCOME SECTION
                ====================================================== */}

                <br />

                <section className="mb-14">

                    <h1
                        className="
                            gabarito
                            text-4xl
                            md:text-5xl
                            font-bold
                            text-gray-900
                            text-center
                        "
                    >
                        Welcome back, {user?.name || "User"} 👋
                    </h1>


                    <p
                        className="
                            mt-4
                            text-xl
                            text-gray-500
                            text-center
                        "
                    >
                        Here’s an overview of your lost and found activity.
                    </p>

                </section>

                <br />


                {/* ======================================================
                    ERROR
                ====================================================== */}

                {error && (

                    <div
                        className="
                            mb-12
                            px-6
                            py-5
                            bg-red-50
                            border
                            border-red-200
                            rounded-2xl
                            text-red-600
                        "
                    >
                        {error}
                    </div>

                )}


                {/* ======================================================
                    STATISTIC CARDS
                ====================================================== */}

                <section
                    className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        xl:grid-cols-4
                        gap-8
                        mb-16
                    "
                >

                    <StatCard
                        title="My Reports"
                        value={totalReports}
                        icon={<FileText size={30} />}
                        iconStyle="
                            bg-purple-100
                            text-purple-600
                        "
                    />


                    <StatCard
                        title="Active Reports"
                        value={activeReports}
                        icon={<Activity size={30} />}
                        iconStyle="
                            bg-blue-100
                            text-blue-600
                        "
                    />


                    <StatCard
                        title="My Claims"
                        value={totalClaims}
                        icon={<ShieldCheck size={30} />}
                        iconStyle="
                            bg-green-100
                            text-green-600
                        "
                    />


                    <StatCard
                        title="Unread Notifications"
                        value={unreadCount}
                        icon={<Bell size={30} />}
                        iconStyle="
                            bg-orange-100
                            text-orange-600
                        "
                    />

                </section>


                {/* ======================================================
                    RECENT REPORTS
                ====================================================== */}

                <section
                    className="
                        bg-white
                        border
                        border-gray-200
                        rounded-3xl
                        shadow-sm
                        px-8
                        py-8
                        mb-12
                    "
                >


                    {/* HEADER */}

                    <br />

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            mb-8
                        "
                    >

                        <div>

                            <h2
                                className="
                                    gabarito
                                    text-3xl
                                    font-bold
                                    text-gray-900
                                "
                            >
                                Recent Reports
                            </h2>


                            <p
                                className="
                                    mt-2
                                    text-base
                                    text-gray-500
                                "
                            >
                                Your latest reported items
                            </p>

                        </div>


                        <Link
                            to="/my-items"
                            className="
                                flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-xl
                                text-purple-600
                                font-semibold
                                hover:bg-purple-50
                                transition
                            "
                        >
                            View All

                            <ArrowRight size={19} />

                        </Link>

                    </div>


                    {/* REPORTS */}

                    {recentReports.length === 0 ? (

                        <div
                            className="
                                min-h-[170px]
                                flex
                                items-center
                                justify-center
                                text-lg
                                text-gray-400
                            "
                        >
                            You haven't reported any items yet.
                        </div>

                    ) : (

                        <div className="space-y-2">

                            {recentReports.map((item) => (

                                <div
                                    key={item._id}
                                    className="
                                        flex
                                        items-center
                                        gap-8
                                        
                                        px-5
                                        py-4
                                        rounded-2xl
                                        hover:bg-gray-50
                                        transition-all
                                        duration-200
                                    "
                                >


                                    {/* ITEM INFORMATION */}

                                    <div
                                        className="
                                            flex-1
                                            min-w-0
                                        "
                                    >

                                        <h3
                                            className="
                                                text-lg
                                                font-semibold
                                                text-gray-900
                                                truncate
                                            "
                                        >
                                            {
                                                item.title ||
                                                item.itemName ||
                                                item.name ||
                                                "Reported Item"
                                            }
                                        </h3>


                                        <p
                                            className="
                                                mt-2
                                                text-sm
                                                text-gray-500
                                            "
                                        >
                                            {
                                                item.category ||
                                                "General"
                                            }
                                        </p>

                                    </div>


                                    {/* ITEM TYPE */}

                                    <span
                                        className={`
                                            min-w-[90px]
                                            text-center
                                            px-4
                                            py-2
                                            rounded-full
                                            text-sm
                                            font-semibold

                                            ${
                                                item.type?.toLowerCase() === "lost"
                                                    ? "bg-red-50 text-red-600"
                                                    : "bg-green-50 text-green-600"
                                            }
                                        `}
                                    >
                                        {item.type || "Item"}
                                    </span>


                                    {/* STATUS */}

                                    <span
                                        className="
                                            min-w-[100px]
                                            text-center
                                            px-4
                                            py-2
                                            rounded-full
                                            bg-purple-50
                                            text-purple-600
                                            text-sm
                                            font-semibold
                                        "
                                    >
                                        {item.status || "Open"}
                                    </span>


                                    {/* DATE */}

                                    <p
                                        className="
                                            hidden
                                            md:block
                                            min-w-[130px]
                                            text-right
                                            text-sm
                                            text-gray-500
                                        "
                                    >
                                        {
                                            formatDate(
                                                item.createdAt
                                            )
                                        }
                                    </p>

                                </div>

                            ))}

                        </div>

                    )}

                </section>


                {/* ======================================================
                    RECENT ACTIVITY
                ====================================================== */}

                <section
                    className="
                        bg-white
                        border
                        border-gray-200
                        rounded-3xl
                        shadow-sm
                        px-8
                        py-8
                    "
                >


                    {/* HEADER */}

                    <br />

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            mb-8
                        "
                    >

                        <div>

                            <h2
                                className="
                                    gabarito
                                    text-3xl
                                    font-bold
                                    text-gray-900
                                "
                            >
                                Recent Activity
                            </h2>


                            <p
                                className="
                                    mt-2
                                    text-base
                                    text-gray-500
                                "
                            >
                                Your latest notifications and updates
                            </p>

                        </div>


                        <Link
                            to="/notifications"
                            className="
                                flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-xl
                                text-purple-600
                                font-semibold
                                hover:bg-purple-50
                                transition
                            "
                        >
                            View All

                            <ArrowRight size={19} />

                        </Link>

                    </div>


                    {/* ACTIVITY */}

                    {recentActivity.length === 0 ? (

                        <div
                            className="
                                min-h-[170px]
                                flex
                                items-center
                                justify-center
                                text-lg
                                text-gray-400
                            "
                        >
                            No recent activity.
                        </div>

                    ) : (

                        <div className="space-y-4">

                            {recentActivity.map(
                                (notification) => (

                                    <div
                                        key={notification._id}
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-6
                                            px-5
                                            py-5
                                            rounded-2xl
                                            hover:bg-gray-50
                                            transition-all
                                            duration-200
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-5
                                                min-w-0
                                            "
                                        >


                                            {/* ICON */}

                                            <div
                                                className="
                                                    w-14
                                                    h-14
                                                    flex
                                                    items-center
                                                    justify-center
                                                    rounded-2xl
                                                    bg-purple-100
                                                    text-purple-600
                                                    shrink-0
                                                "
                                            >
                                                <Bell size={23} />
                                            </div>


                                            {/* MESSAGE */}

                                            <div className="min-w-0">

                                                <p
                                                    className="
                                                        text-base
                                                        font-semibold
                                                        text-gray-900
                                                        truncate
                                                    "
                                                >
                                                    {
                                                        notification.message ||
                                                        notification.title ||
                                                        "New activity"
                                                    }
                                                </p>


                                                <p
                                                    className="
                                                        mt-2
                                                        text-sm
                                                        text-gray-500
                                                    "
                                                >
                                                    {
                                                        formatDate(
                                                            notification.createdAt
                                                        )
                                                    }
                                                </p>

                                            </div>

                                        </div>


                                        {/* UNREAD INDICATOR */}

                                        {!notification.isRead && (

                                            <div
                                                className="
                                                    w-3
                                                    h-3
                                                    rounded-full
                                                    bg-purple-600
                                                    shrink-0
                                                "
                                            />

                                        )}

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>

            </div>

        </main>

    );

}


// ======================================================
// STATISTIC CARD COMPONENT
// ======================================================

function StatCard({
    title,
    value,
    icon,
    iconStyle,
}) {

    return (

        <div
            className="
                min-h-[165px]
                bg-white
                border
                border-gray-200
                rounded-3xl
                shadow-sm
                px-7
                py-7
                flex
                items-center
                justify-between
                hover:-translate-y-1
                hover:shadow-lg
                transition-all
                duration-300
            "
        >

            <div>

                <p
                    className="
                        text-base
                        font-medium
                        text-gray-500
                    "
                >
                    {title}
                </p>


                <h3
                    className="
                        gabarito
                        mt-4
                        text-4xl
                        font-bold
                        text-gray-900
                    "
                >
                    {value}
                </h3>

            </div>


            <div
                className={`
                    w-16
                    h-16
                    flex
                    items-center
                    justify-center
                    rounded-2xl
                    shrink-0
                    ${iconStyle}
                `}
            >
                {icon}
            </div>

        </div>

    );

}


export default Dashboard;