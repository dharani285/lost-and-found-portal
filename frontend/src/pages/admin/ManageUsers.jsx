import { useEffect, useState } from "react";
import {
    Users,
    Trash2,
    Download,
} from "lucide-react";

import {
    getAllUsersAdmin,
    deleteUserAdmin,
    exportUsersExcel,
} from "../../services/adminService";


const ManageUsers = () => {

    // ======================================================
    // STATES
    // ======================================================

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState(null);


    // ======================================================
    // FETCH ALL USERS
    // ======================================================

    const fetchUsers = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getAllUsersAdmin();

            setUsers(response.users);

        } catch (error) {

            console.error(
                "Failed to load users:",
                error
            );

            setError("Unable to load users");

        } finally {

            setLoading(false);

        }

    };


    // ======================================================
    // LOAD USERS WHEN PAGE OPENS
    // ======================================================

    useEffect(() => {

        fetchUsers();

    }, []);


    // ======================================================
    // DELETE USER
    // ======================================================

    const handleDeleteUser = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );


        if (!confirmDelete) {

            return;

        }


        try {

            setDeletingId(id);

            await deleteUserAdmin(id);


            // Remove deleted user from frontend

            setUsers((previousUsers) =>

                previousUsers.filter(
                    (user) => user._id !== id
                )

            );

        } catch (error) {

            console.error(
                "Failed to delete user:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Unable to delete user"
            );

        } finally {

            setDeletingId(null);

        }

    };


    // ======================================================
    // EXPORT USERS
    // ======================================================

    const handleExportUsers = async () => {

        try {

            await exportUsersExcel();

        } catch (error) {

            console.error(
                "Failed to export users:",
                error
            );

            alert("Unable to export users");

        }

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

                        Loading users...

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

            <div
                className="
                    min-h-[70vh]
                    flex
                    items-center
                    justify-center
                "
            >

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

                <div className="relative w-full mb-10">


                    {/* ======================================================
                        CENTERED HEADER CONTENT
                    ====================================================== */}
                    <br/>
                    <div
                        className="
                            w-full
                            flex
                            flex-col
                            items-center
                            justify-center
                        "
                    >

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

                            Manage Users

                        </h1>


                        <p
                            className="
                                mt-3
                                text-gray-500
                                text-center
                            "
                        >

                            View and manage registered users

                        </p>

                    </div>
                    <br/>

                    {/* ======================================================
                        EXPORT BUTTON
                    ====================================================== */}

                    <button
                        onClick={handleExportUsers}
                        className="
                            mt-6
                            ml-auto
                            flex
                            items-center
                            justify-center
                            gap-2
                            bg-purple-600
                            text-white
                            px-5
                            py-3
                            rounded-xl
                            font-medium
                            hover:bg-purple-700
                            transition

                            md:mt-0
                            md:absolute
                            md:right-0
                            md:bottom-0
                            w-[130px]
                        "
                    >

                        <Download size={19} />

                        Export Users

                    </button>

                </div>



                {/* ======================================================
                    USERS SUMMARY
                ====================================================== */}

                <div
                    className="
                        bg-white
                        border
                        border-gray-100
                        rounded-2xl
                        shadow-sm
                        p-6
                        mb-6
                    "
                >

                    <div className="flex items-center gap-4">

                        <div
                            className="
                                w-12
                                h-12
                                rounded-xl
                                bg-purple-100
                                text-purple-600
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <Users size={23} />

                        </div>


                        <div>

                            <p className="text-sm text-gray-500">

                                Total Registered Users

                            </p>


                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                    text-gray-900
                                "
                            >

                                {users.length}

                            </h2>

                        </div>
                        
                    </div>

                </div>



                {/* ======================================================
                    USERS TABLE
                ====================================================== */}

                <div
                    className="
                        bg-white
                        border
                        border-gray-100
                        rounded-2xl
                        shadow-sm
                        overflow-hidden
                    "
                >

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                            tracking-wider
                                        "
                                    >

                                        User

                                    </th>


                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                            tracking-wider
                                        "
                                    >

                                        Email

                                    </th>


                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                            tracking-wider
                                        "
                                    >

                                        Phone

                                    </th>


                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                            tracking-wider
                                        "
                                    >

                                        Role

                                    </th>


                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-center
                                            text-xs
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                            tracking-wider
                                        "
                                    >

                                        Action

                                    </th>

                                </tr>

                            </thead>


                            <tbody className="divide-y divide-gray-100">

                                {users.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="
                                                px-6
                                                py-12
                                                text-center
                                                text-gray-500
                                            "
                                        >

                                            No users found

                                        </td>

                                    </tr>

                                ) : (

                                    users.map((user) => (

                                        <tr
                                            key={user._id}
                                            className="
                                                hover:bg-gray-50
                                                transition
                                            "
                                        >

                                            {/* USER */}

                                            <td className="px-6 py-4">

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            w-10
                                                            h-10
                                                            rounded-full
                                                            bg-purple-100
                                                            text-purple-600
                                                            flex
                                                            items-center
                                                            justify-center
                                                            font-semibold
                                                            uppercase
                                                        "
                                                    >

                                                        {user.name
                                                            ?.charAt(0)}

                                                    </div>


                                                    <p
                                                        className="
                                                            font-medium
                                                            text-gray-900
                                                        "
                                                    >

                                                        {user.name}

                                                    </p>

                                                </div>

                                            </td>


                                            {/* EMAIL */}

                                            <td
                                                className="
                                                    px-6
                                                    py-4
                                                    text-sm
                                                    text-gray-600
                                                "
                                            >

                                                {user.email}

                                            </td>


                                            {/* PHONE */}

                                            <td
                                                className="
                                                    px-6
                                                    py-4
                                                    text-sm
                                                    text-gray-600
                                                "
                                            >

                                                {user.phone || "Not provided"}

                                            </td>


                                            {/* ROLE */}

                                            <td className="px-6 py-4">

                                                <span
                                                    className={`
                                                        inline-flex
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        text-xs
                                                        font-semibold

                                                        ${
                                                            user.role === "admin"

                                                                ? "bg-purple-100 text-purple-700"

                                                                : "bg-green-100 text-green-700"
                                                        }
                                                    `}
                                                >

                                                    {user.role}

                                                </span>

                                            </td>


                                            {/* DELETE */}

                                            <td
                                                className="
                                                    px-6
                                                    py-4
                                                    text-center
                                                "
                                            >

                                                <button
                                                    onClick={() =>
                                                        handleDeleteUser(
                                                            user._id
                                                        )
                                                    }
                                                    disabled={
                                                        deletingId === user._id
                                                    }
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        justify-center
                                                        w-9
                                                        h-9
                                                        rounded-lg
                                                        text-red-500
                                                        bg-red-50
                                                        hover:bg-red-100
                                                        transition
                                                        disabled:opacity-50
                                                    "
                                                >

                                                    <Trash2 size={17} />

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>


            </div>

        </main>

    );
};

export default ManageUsers;