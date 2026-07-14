import {
    LayoutDashboard,
    Users,
    Package,
    FileCheck,
} from "lucide-react";

import { NavLink } from "react-router-dom";


const AdminSidebar = () => {

    const menuItems = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Manage Users",
            path: "/admin/users",
            icon: Users,
        },
        {
            name: "Manage Items",
            path: "/admin/items",
            icon: Package,
        },
        {
            name: "Manage Claims",
            path: "/admin/claims",
            icon: FileCheck,
        },
    ];


    return (

        <aside
            className="
                w-72
                min-h-screen
                bg-white
                border-r
                border-gray-200
                px-5
                py-6
                flex-shrink-0
            "
        >

            {/* ======================================================
                SIDEBAR HEADER
            ====================================================== */}
            <br/>
            <div className="px-3 mb-8">

                <p
                    className="
                        text-xl
                        font-semibold
                        text-purple-600
                        uppercase
                        tracking-wider
                    "
                >

                    Administration

                </p>


                <h2
                    className="
                        text-2xl
                        font-bold
                        text-gray-900
                        mt-1
                    "
                >

                    Admin Panel

                </h2>

            </div>



            {/* ======================================================
                SIDEBAR NAVIGATION
            ====================================================== */}

            <nav className="space-y-2">

                {menuItems.map((item) => {

                    const Icon = item.icon;


                    return (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>

                                `
                                    flex
                                    items-center
                                    gap-4
                                    px-4
                                    py-3
                                    rounded-xl
                                    text-base
                                    font-semibold
                                    transition

                                    ${
                                        isActive

                                            ? "bg-purple-100 text-purple-700"

                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }
                                `
                            }
                        >

                            <Icon size={22} />


                            <span>

                                {item.name}

                            </span>

                        </NavLink>

                    );

                })}

            </nav>

        </aside>

    );

};

export default AdminSidebar;