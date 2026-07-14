import { useEffect, useState } from "react";
import {
    Users,
    Package,
    FileCheck,
    Search,
    CircleCheckBig,
    Clock3,
    RotateCcw,
} from "lucide-react";

import { getAdminDashboardStats } from "../../services/adminService";


const AdminDashboard = () => {

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalItems: 0,
        totalClaims: 0,
        lostItems: 0,
        foundItems: 0,
        openItems: 0,
        returnedItems: 0,
    });

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ======================================================
    // FETCH DASHBOARD STATISTICS
    // ======================================================

    useEffect(() => {

        const fetchDashboardStats = async () => {

            try {

                setLoading(true);

                const response = await getAdminDashboardStats();

                setStats(response.data);

            } catch (error) {

                console.error(
                    "Failed to load admin dashboard:",
                    error
                );

                setError(
                    "Unable to load admin dashboard data"
                );

            } finally {

                setLoading(false);

            }

        };


        fetchDashboardStats();

    }, []);


    // ======================================================
    // DASHBOARD CARDS
    // ======================================================

    const dashboardCards = [

        {
            title: "Total Users",
            value: stats.totalUsers,
            description: "Registered users",
            icon: Users,
            iconBg: "bg-violet-100",
            iconColor: "text-violet-600",
        },

        {
            title: "Total Items",
            value: stats.totalItems,
            description: "All reported items",
            icon: Package,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
        },

        {
            title: "Total Claims",
            value: stats.totalClaims,
            description: "Submitted claims",
            icon: FileCheck,
            iconBg: "bg-orange-100",
            iconColor: "text-orange-600",
        },

        {
            title: "Lost Items",
            value: stats.lostItems,
            description: "Reported lost items",
            icon: Search,
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
        },

        {
            title: "Found Items",
            value: stats.foundItems,
            description: "Reported found items",
            icon: CircleCheckBig,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
        },

        {
            title: "Open Items",
            value: stats.openItems,
            description: "Currently active items",
            icon: Clock3,
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-600",
        },

        {
            title: "Returned Items",
            value: stats.returnedItems,
            description: "Successfully returned",
            icon: RotateCcw,
            iconBg: "bg-cyan-100",
            iconColor: "text-cyan-600",
        },

    ];


    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {

        return (

            <div className="min-h-[70vh] flex items-center justify-center">

                <div className="text-center">

                    <div
                        className="
                            w-10
                            h-10
                            border-4
                            border-gray-200
                            border-t-purple-600
                            rounded-full
                            animate-spin
                            mx-auto
                        "
                    >
                    </div>


                    <p className="mt-4 text-gray-500">

                        Loading admin dashboard...

                    </p>

                </div>

            </div>

        );

    }


    // ======================================================
    // ERROR
    // ======================================================

    if (error) {

        return (

            <div className="min-h-[70vh] flex items-center justify-center">

                <p className="text-red-500 font-medium">

                    {error}

                </p>

            </div>

        );

    }


    return (

        <main className="min-h-screen bg-gray-50">

            <div className="max-w-7xl mx-auto px-6 py-10">


                {/* ======================================================
                    PAGE HEADER
                ====================================================== */}

                <div className="mb-10">

                    <p
                        className="
                            text-2xl
                            font-semibold
                            text-purple-600
                            uppercase
                            tracking-wider
                            mb-2
                            text-center
                        "
                    >

                        Administration

                    </p>


                    <h1
                        className="
                            text-3xl
                            md:text-4xl
                            font-bold
                            text-gray-900
                            text-center
                        "
                    >

                        Admin Dashboard

                    </h1>


                    <p className="mt-3 text-gray-500 text-center">

                        Monitor and manage your Lost & Found Portal

                    </p>

                </div>



                {/* ======================================================
                    OVERVIEW HEADER
                ====================================================== */}

                <div className="mb-5">

                    <h2 className="text-xl font-semibold text-gray-900">

                        Overview

                    </h2>


                    <p className="text-sm text-gray-500 mt-1">

                        Current portal statistics and activity

                    </p>

                </div>
                <br/>


                {/* ======================================================
                    DASHBOARD CARDS
                ====================================================== */}

                <div
                    className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-4
                        gap-6
                    "
                >

                    {dashboardCards.map((card) => {

                        const Icon = card.icon;

                        return (

                            <div
                                key={card.title}
                                className="
                                    bg-white
                                    border
                                    border-gray-100
                                    rounded-2xl
                                    p-6
                                    shadow-sm
                                    hover:shadow-md
                                    hover:-translate-y-1
                                    transition-all
                                    duration-200
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-start
                                        justify-between
                                    "
                                >

                                    <div>

                                        <p
                                            className="
                                                text-sm
                                                font-medium
                                                text-gray-500
                                            "
                                        >

                                            {card.title}

                                        </p>


                                        <h2
                                            className="
                                                mt-2
                                                text-4xl
                                                font-bold
                                                text-gray-900
                                            "
                                        >

                                            {card.value}

                                        </h2>

                                    </div>


                                    <div
                                        className={`
                                            ${card.iconBg}
                                            ${card.iconColor}
                                            w-12
                                            h-12
                                            rounded-xl
                                            flex
                                            items-center
                                            justify-center
                                        `}
                                    >

                                        <Icon size={23} />

                                    </div>

                                </div>


                                <p
                                    className="
                                        mt-5
                                        pt-4
                                        border-t
                                        border-gray-100
                                        text-sm
                                        text-gray-400
                                    "
                                >

                                    {card.description}

                                </p>

                            </div>

                        );

                    })}

                </div>


            </div>

        </main>

    );
};

export default AdminDashboard;