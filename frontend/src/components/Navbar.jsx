import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
    Bell,
    Menu,
    X,
    LayoutDashboard,
    FileText,
    ShieldCheck,
    Inbox,
    User,
    Settings,
} from "lucide-react";

import { useNotifications } from "../Context/NotificationContext";
import { useAuth } from "../Context/AuthContext";


function Navbar() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const { unreadCount } = useNotifications();


    // ======================================================
    // STATE
    // ======================================================

    const [showDropdown, setShowDropdown] = useState(false);

    const [showSidebar, setShowSidebar] = useState(false);

    const dropdownRef = useRef(null);


    // ======================================================
    // LOGOUT
    // ======================================================

    const handleLogout = () => {

        logout();

        setShowDropdown(false);

        setShowSidebar(false);

        navigate("/login");

    };


    // ======================================================
    // CLOSE MENUS
    // ======================================================

    useEffect(() => {

        function handleClickOutside(e) {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setShowDropdown(false);
            }

        }


        function handleEscape(e) {

            if (e.key === "Escape") {

                setShowDropdown(false);

                setShowSidebar(false);

            }

        }


        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        document.addEventListener(
            "keydown",
            handleEscape
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

            document.removeEventListener(
                "keydown",
                handleEscape
            );

        };

    }, []);


    // ======================================================
    // NAVIGATION STYLE
    // ======================================================

    const navLinkClass = ({ isActive }) =>

        `gabarito px-5 py-2.5 rounded-xl text-2xl font-semibold transition-all duration-200 ${
            isActive
                ? "bg-white text-purple-700 shadow-lg"
                : "text-white hover:bg-white/20"
        }`;


    const dropdownLinkClass =

        "mx-3 my-1 flex items-center gap-4 rounded-xl px-5 py-4 text-gray-700 hover:bg-purple-200 hover:text-purple-700 transition-all duration-200";


    const sidebarLinkClass = ({ isActive }) =>

        `gabarito flex items-center gap-5 px-6 py-4 rounded-2xl text-xl font-semibold transition-all duration-200 ${
            isActive
                ? "bg-purple-100 text-purple-700"
                : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
        }`;


    return (

        <>

            {/* ======================================================
                NAVBAR
            ====================================================== */}

            <nav
                className="
                    relative
                    z-50
                    bg-gradient-to-r
                    from-indigo-500
                    via-purple-600
                    to-fuchsia-600
                    shadow-xl
                    rounded-xl
                    mx-3
                    md:mx-6
                    mt-6
                "
            >

                <div
                    className="
                        max-w-7xl
                        mx-auto
                        h-24
                        px-4
                        md:px-8
                        flex
                        items-center
                    "
                >

                    {/* ======================================================
                        HAMBURGER ICON
                    ====================================================== */}

                    <button

                        type="button"

                        onClick={() =>
                            setShowSidebar(true)
                        }

                        className="
                            mr-3
                            md:mr-5
                            w-12
                            h-12
                            flex
                            items-center
                            justify-center
                            rounded-xl
                            text-white
                            hover:bg-white/20
                            transition-all
                            duration-200
                            flex-shrink-0
                        "
                    >

                        <Menu size={32} />

                    </button>


                    {/* ======================================================
                        LOGO
                    ====================================================== */}

                    <Link
                        to="/"

                        className="
                            gabarito
                            text-3xl
                            md:text-4xl
                            xl:text-5xl
                            font-bold
                            text-white
                            whitespace-nowrap
                        "
                    >

                        Lost{" "}

                        <span className="text-yellow-300">
                            &
                        </span>

                        {" "}Found

                    </Link>


                    {/* ======================================================
                        DESKTOP NAVIGATION
                    ====================================================== */}

                    <div className="hidden xl:flex flex-1 justify-center">

                        <div className="flex items-center gap-6">

                            <NavLink
                                to="/"
                                className={navLinkClass}
                            >
                                Home
                            </NavLink>


                            <NavLink
                                to="/lost-items"
                                className={navLinkClass}
                            >
                                Lost Items
                            </NavLink>


                            <NavLink
                                to="/found-items"
                                className={navLinkClass}
                            >
                                Found Items
                            </NavLink>


                            {!user && (

                                <>

                                    <NavLink
                                        to="/login"
                                        className={navLinkClass}
                                    >
                                        Login
                                    </NavLink>


                                    <NavLink
                                        to="/register"

                                        className="
                                            gabarito
                                            text-[22px]
                                            px-5
                                            py-2
                                            rounded-xl
                                            bg-orange-400
                                            text-white
                                            font-semibold
                                            hover:bg-orange-500
                                            transition
                                            duration-300
                                        "
                                    >
                                        Register
                                    </NavLink>

                                </>

                            )}

                        </div>

                    </div>


                    {/* ======================================================
                        SPACER FOR SMALL SCREENS
                    ====================================================== */}

                    <div className="flex-1 xl:hidden"></div>


                    {/* ======================================================
                        LOGGED IN USER
                        DESKTOP ONLY
                    ====================================================== */}

                    {user && (

                        <div className="hidden xl:flex items-center gap-5">

                            {/* NOTIFICATION BELL */}

                            <NavLink
                                to="/notifications"

                                className="
                                    relative
                                    w-14
                                    h-14
                                    flex
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-white
                                    bg-white/10
                                    hover:bg-white/20
                                    hover:scale-105
                                    transition-all
                                    duration-300
                                "
                            >

                                <Bell size={30} />


                                {unreadCount > 0 && (

                                    <span
                                        className="
                                            absolute
                                            -top-1
                                            -right-1
                                            min-w-[23px]
                                            h-[23px]
                                            px-1
                                            flex
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-red-500
                                            text-white
                                            text-xs
                                            font-bold
                                            border-2
                                            border-purple-600
                                            shadow-md
                                        "
                                    >

                                        {
                                            unreadCount > 99
                                                ? "99+"
                                                : unreadCount
                                        }

                                    </span>

                                )}

                            </NavLink>


                            {/* ======================================================
                                PROFILE
                            ====================================================== */}

                            <div
                                ref={dropdownRef}
                                className="relative"
                            >

                                <button

                                    onClick={() =>
                                        setShowDropdown(
                                            !showDropdown
                                        )
                                    }

                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        rounded-2xl
                                        px-4
                                        py-3
                                        text-white
                                        hover:bg-white/15
                                        transition-all
                                        duration-300
                                    "
                                >

                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                            user.name
                                        )}&background=7c3aed&color=ffffff&bold=true`}

                                        alt="Profile"

                                        className="
                                            w-12
                                            h-12
                                            rounded-full
                                            border-2
                                            border-white
                                            shadow-md
                                        "
                                    />


                                    <div className="text-left">

                                        <p className="font-semibold text-lg leading-none">

                                            {user.name}

                                        </p>


                                        <p className="text-sm text-purple-100">

                                            Account

                                        </p>

                                    </div>


                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"

                                        viewBox="0 0 20 20"

                                        fill="currentColor"

                                        className={`w-5 h-5 transition-transform duration-300 ${
                                            showDropdown
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                    >

                                        <path
                                            fillRule="evenodd"

                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"

                                            clipRule="evenodd"
                                        />

                                    </svg>

                                </button>


                                {/* ======================================================
                                    PROFILE DROPDOWN
                                ====================================================== */}

                                {showDropdown && (

                                    <div
                                        className="
                                            absolute
                                            right-0
                                            top-[78px]
                                            w-[340px]
                                            bg-white
                                            rounded-3xl
                                            shadow-[0_20px_50px_rgba(0,0,0,0.18)]
                                            border
                                            border-gray-300
                                            overflow-hidden
                                            z-50
                                        "
                                    >

                                        {/* DROPDOWN HEADER */}

                                        <div
                                            className="
                                                bg-gradient-to-r
                                                from-purple-600
                                                via-fuchsia-600
                                                to-pink-500
                                                px-6
                                                py-6
                                            "
                                        >

                                            <div className="flex items-center gap-4">

                                                <img
                                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                        user.name
                                                    )}&background=ffffff&color=7c3aed&bold=true`}

                                                    alt="Profile"

                                                    className="
                                                        w-16
                                                        h-16
                                                        rounded-full
                                                        border-4
                                                        border-white
                                                        shadow-lg
                                                    "
                                                />


                                                <div className="min-w-0">

                                                    <h2 className="text-xl font-bold text-white truncate">

                                                        {user.name}

                                                    </h2>


                                                    <p className="text-sm text-purple-100 truncate">

                                                        {user.email}

                                                    </p>

                                                </div>

                                            </div>

                                        </div>


                                        {/* DROPDOWN MENU */}

                                        <div className="py-3">

                                            <NavLink
                                                to="/profile"

                                                onClick={() =>
                                                    setShowDropdown(false)
                                                }

                                                className={dropdownLinkClass}
                                            >

                                                <span className="text-2xl">
                                                    👤
                                                </span>

                                                <div>

                                                    <p className="font-semibold text-lg">
                                                        Profile
                                                    </p>

                                                    <p className="text-xs text-gray-500">
                                                        Manage your account
                                                    </p>

                                                </div>

                                            </NavLink>


                                            <NavLink
                                                to="/my-items"

                                                onClick={() =>
                                                    setShowDropdown(false)
                                                }

                                                className={dropdownLinkClass}
                                            >

                                                <span className="text-2xl">
                                                    📋
                                                </span>

                                                <div>

                                                    <p className="font-semibold text-lg">
                                                        My Reports
                                                    </p>

                                                    <p className="text-xs text-gray-500">
                                                        View all reported items
                                                    </p>

                                                </div>

                                            </NavLink>


                                            <NavLink
                                                to="/my-claims"

                                                onClick={() =>
                                                    setShowDropdown(false)
                                                }

                                                className={dropdownLinkClass}
                                            >

                                                <span className="text-2xl">
                                                    🛡️
                                                </span>

                                                <div>

                                                    <p className="font-semibold text-lg">
                                                        My Claims
                                                    </p>

                                                    <p className="text-xs text-gray-500">
                                                        Track submitted claims
                                                    </p>

                                                </div>

                                            </NavLink>


                                            <NavLink
                                                to="/received-claims"

                                                onClick={() =>
                                                    setShowDropdown(false)
                                                }

                                                className={dropdownLinkClass}
                                            >

                                                <span className="text-2xl">
                                                    📥
                                                </span>

                                                <div>

                                                    <p className="font-semibold text-lg">
                                                        Received Claims
                                                    </p>

                                                    <p className="text-xs text-gray-500">
                                                        Review incoming requests
                                                    </p>

                                                </div>

                                            </NavLink>


                                            {user?.role === "admin" && (

                                                <NavLink
                                                    to="/admin/dashboard"

                                                    onClick={() =>
                                                        setShowDropdown(false)
                                                    }

                                                    className={dropdownLinkClass}
                                                >

                                                    <span className="text-2xl">
                                                        ⚙️
                                                    </span>

                                                    <div>

                                                        <p className="font-semibold text-lg">
                                                            Admin Dashboard
                                                        </p>

                                                        <p className="text-xs text-gray-500">
                                                            Manage portal administration
                                                        </p>

                                                    </div>

                                                </NavLink>

                                            )}

                                        </div>


                                        {/* LOGOUT */}

                                        <div className="border-t border-gray-100 p-3">

                                            <button

                                                onClick={handleLogout}

                                                className="
                                                    w-full
                                                    flex
                                                    items-center
                                                    gap-4
                                                    rounded-2xl
                                                    px-5
                                                    py-4
                                                    bg-red-50
                                                    text-red-600
                                                    hover:bg-red-100
                                                    transition-all
                                                    duration-200
                                                "
                                            >

                                                <span className="text-2xl">
                                                    🚪
                                                </span>


                                                <div className="text-left">

                                                    <p className="font-semibold text-lg">
                                                        Logout
                                                    </p>

                                                    <p className="text-xs text-red-400">
                                                        Sign out securely
                                                    </p>

                                                </div>

                                            </button>

                                        </div>

                                    </div>

                                )}

                            </div>

                        </div>

                    )}

                </div>

            </nav>


            {/* ======================================================
                SIDEBAR OVERLAY
            ====================================================== */}

            {showSidebar && (

                <div
                    onClick={() =>
                        setShowSidebar(false)
                    }

                    className="
                        fixed
                        inset-0
                        z-[60]
                        bg-black/40
                        backdrop-blur-[2px]
                    "
                />

            )}


            {/* ======================================================
                SIDEBAR
            ====================================================== */}

            <aside
                className={`
                    fixed
                    top-0
                    left-0
                    z-[70]
                    w-[380px]
                    max-w-[90vw]
                    h-screen
                    bg-white
                    shadow-2xl
                    transition-transform
                    duration-300
                    ease-in-out
                    overflow-y-auto

                    ${
                        showSidebar
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                `}
            >

                {/* ======================================================
                    SIDEBAR HEADER
                ====================================================== */}

                <div
                    className="
                        h-28
                        flex
                        items-center
                        justify-between
                        px-8
                        bg-gradient-to-r
                        from-indigo-500
                        via-purple-600
                        to-fuchsia-600
                    "
                >

                    <div>

                        <h2
                            className="
                                gabarito
                                text-3xl
                                font-bold
                                text-white
                            "
                        >
                            Menu
                        </h2>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-purple-100
                            "
                        >
                            Navigate your account
                        </p>

                    </div>


                    <button
                        onClick={() =>
                            setShowSidebar(false)
                        }

                        className="
                            w-12
                            h-12
                            flex
                            items-center
                            justify-center
                            rounded-xl
                            text-white
                            hover:bg-white/20
                            transition
                        "
                    >

                        <X size={30} />

                    </button>

                </div>


                {/* ======================================================
                    SIDEBAR USER
                ====================================================== */}

                {user && (

                    <div
                        className="
                            flex
                            items-center
                            gap-4
                            mx-6
                            mt-6
                            p-4
                            rounded-2xl
                            bg-purple-50
                        "
                    >

                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                user.name
                            )}&background=7c3aed&color=ffffff&bold=true`}

                            alt="Profile"

                            className="
                                w-14
                                h-14
                                rounded-full
                                border-2
                                border-white
                                shadow-md
                            "
                        />


                        <div className="min-w-0">

                            <p
                                className="
                                    gabarito
                                    text-lg
                                    font-bold
                                    text-gray-900
                                    truncate
                                "
                            >
                                {user.name}
                            </p>


                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-gray-500
                                    truncate
                                "
                            >
                                {user.email}
                            </p>

                        </div>

                    </div>

                )}


                {/* ======================================================
                    SIDEBAR LINKS
                ====================================================== */}

                <div className="p-6 space-y-3">


                    {/* LOST ITEMS */}

                    <NavLink
                        to="/lost-items"

                        onClick={() =>
                            setShowSidebar(false)
                        }

                        className={sidebarLinkClass}
                    >

                        <FileText size={26} />

                        Lost Items

                    </NavLink>


                    {/* FOUND ITEMS */}

                    <NavLink
                        to="/found-items"

                        onClick={() =>
                            setShowSidebar(false)
                        }

                        className={sidebarLinkClass}
                    >

                        <FileText size={26} />

                        Found Items

                    </NavLink>


                    {/* DASHBOARD */}

                    <NavLink
                        to="/dashboard"

                        onClick={() =>
                            setShowSidebar(false)
                        }

                        className={sidebarLinkClass}
                    >

                        <LayoutDashboard size={26} />

                        Dashboard

                    </NavLink>


                    {/* MY REPORTS */}

                    <NavLink
                        to="/my-items"

                        onClick={() =>
                            setShowSidebar(false)
                        }

                        className={sidebarLinkClass}
                    >

                        <FileText size={26} />

                        My Reports

                    </NavLink>


                    {/* MY CLAIMS */}

                    <NavLink
                        to="/my-claims"

                        onClick={() =>
                            setShowSidebar(false)
                        }

                        className={sidebarLinkClass}
                    >

                        <ShieldCheck size={26} />

                        My Claims

                    </NavLink>


                    {/* RECEIVED CLAIMS */}

                    <NavLink
                        to="/received-claims"

                        onClick={() =>
                            setShowSidebar(false)
                        }

                        className={sidebarLinkClass}
                    >

                        <Inbox size={26} />

                        Received Claims

                    </NavLink>


                    {/* NOTIFICATIONS */}

                    <NavLink
                        to="/notifications"

                        onClick={() =>
                            setShowSidebar(false)
                        }

                        className={sidebarLinkClass}
                    >

                        <Bell size={26} />

                        <span className="flex-1">
                            Notifications
                        </span>


                        {unreadCount > 0 && (

                            <span
                                className="
                                    min-w-[26px]
                                    h-7
                                    px-2
                                    flex
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-red-500
                                    text-white
                                    text-xs
                                    font-bold
                                "
                            >

                                {
                                    unreadCount > 99
                                        ? "99+"
                                        : unreadCount
                                }

                            </span>

                        )}

                    </NavLink>


                    {/* PROFILE */}

                    <NavLink
                        to="/profile"

                        onClick={() =>
                            setShowSidebar(false)
                        }

                        className={sidebarLinkClass}
                    >

                        <User size={26} />

                        Profile

                    </NavLink>


                    {/* ADMIN DASHBOARD */}

                    {user?.role === "admin" && (

                        <NavLink
                            to="/admin/dashboard"

                            onClick={() =>
                                setShowSidebar(false)
                            }

                            className={sidebarLinkClass}
                        >

                            <Settings size={26} />

                            Admin Dashboard

                        </NavLink>

                    )}


                    {/* LOGOUT */}

                    {user && (

                        <button

                            onClick={handleLogout}

                            className="
                                gabarito
                                w-full
                                flex
                                items-center
                                gap-5
                                px-6
                                py-4
                                rounded-2xl
                                text-xl
                                font-semibold
                                text-red-600
                                bg-red-50
                                hover:bg-red-100
                                transition-all
                                duration-200
                            "
                        >

                            <span className="text-2xl">
                                🚪
                            </span>

                            Logout

                        </button>

                    )}

                </div>

            </aside>

        </>

    );

}


export default Navbar;