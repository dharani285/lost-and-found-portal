import { useEffect, useState } from "react";
import {
    Package,
    Trash2,
    MapPin,
} from "lucide-react";

import {
    getAllItemsAdmin,
    deleteItemAdmin,
} from "../../services/adminService";


const ManageItems = () => {

    // ======================================================
    // STATES
    // ======================================================

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState(null);


    // ======================================================
    // FETCH ALL ITEMS
    // ======================================================

    const fetchItems = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getAllItemsAdmin();

            setItems(response.items);

        } catch (error) {

            console.error(
                "Failed to load items:",
                error
            );

            setError("Unable to load items");

        } finally {

            setLoading(false);

        }

    };


    // ======================================================
    // LOAD ITEMS WHEN PAGE OPENS
    // ======================================================

    useEffect(() => {

        fetchItems();

    }, []);


    // ======================================================
    // DELETE ITEM
    // ======================================================

    const handleDeleteItem = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this item?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            setDeletingId(id);

            await deleteItemAdmin(id);


            // Remove deleted item from frontend

            setItems((previousItems) =>

                previousItems.filter(
                    (item) => item._id !== id
                )

            );

        } catch (error) {

            console.error(
                "Failed to delete item:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Unable to delete item"
            );

        } finally {

            setDeletingId(null);

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

                        Loading items...

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

            <div
                className="
                   w-[calc(100%-2rem)]
                    max-w-7xl
                    mx-auto
                    px-4
                    py-10
                "
            >


                {/* ======================================================
                    PAGE HEADER
                ====================================================== */}

                <div className="w-full mb-10">

                    <div
                        className="
                            w-full
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-center
                        "
                    >

                        <p
                            className="
                                text-xl
                                font-semibold
                                text-purple-600
                                uppercase
                                tracking-wider
                                mb-2
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
                            "
                        >

                            Manage Items

                        </h1>


                        <p className="mt-3 text-gray-500">

                            View and manage all reported items

                        </p>

                    </div>

                </div>



                {/* ======================================================
                    ITEMS SUMMARY
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
                                bg-blue-100
                                text-blue-600
                                flex
                                items-center
                                justify-center
                                flex-shrink-0
                            "
                        >

                            <Package size={23} />

                        </div>


                        <div>

                            <p className="text-sm text-gray-500">

                                Total Reported Items

                            </p>


                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                    text-gray-900
                                "
                            >

                                {items.length}

                            </h2>

                        </div>

                    </div>

                </div>



                {/* ======================================================
                    ITEMS TABLE
                ====================================================== */}

                <div
                    className="
                        w-full
                        bg-white
                        border
                        border-gray-100
                        rounded-2xl
                        shadow-sm
                        overflow-hidden
                    "
                >

                    <div className="w-full overflow-x-auto">

                        <table className="w-full min-w-[1000px]">

                            {/* TABLE HEADER */}

                            <thead className="bg-gray-50">

                                <tr>

                                    <th
                                        className="
                                            pl-8
                                            pr-6
                                            py-4
                                            text-left
                                            text-xm
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                            tracking-wider
                                        "
                                    >

                                        <br/>Item

                                    </th>


                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xm
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                            tracking-wider
                                        "
                                    >

                                        <br/>Category

                                    </th>


                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xm
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                            tracking-wider
                                        "
                                    >

                                        <br/>Type

                                    </th>


                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xm
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                            tracking-wider
                                        "
                                    >

                                        <br/>Location

                                    </th>


                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xm
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                            tracking-wider
                                        "
                                    >

                                        <br/>Owner

                                    </th>


                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xm
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                            tracking-wider
                                        "
                                    >

                                        <br/>Status

                                    </th>


                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-center
                                            text-xm
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                            tracking-wider
                                        "
                                    >

                                        <br/>Action

                                    </th>

                                </tr>

                            </thead>


                            {/* TABLE BODY */}

                            <tbody className="divide-y divide-gray-100">

                                {items.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="
                                                px-6
                                                py-12
                                                text-center
                                                text-gray-500
                                            "
                                        >

                                            No items found

                                        </td>

                                    </tr>

                                ) : (

                                    items.map((item) => (

                                        <tr
                                            key={item._id}
                                            className="
                                                hover:bg-gray-50
                                                transition
                                            "
                                        >


                                            {/* ITEM */}

                                            <td
                                                className="
                                                    pl-8
                                                    pr-6
                                                    py-4
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            w-11
                                                            h-11
                                                            rounded-xl
                                                            bg-blue-100
                                                            text-blue-600
                                                            flex
                                                            items-center
                                                            justify-center
                                                            flex-shrink-0
                                                        "
                                                    >

                                                        <Package size={20} />

                                                    </div>


                                                    <p
                                                        className="
                                                            font-medium
                                                            text-gray-900
                                                            whitespace-nowrap
                                                        "
                                                    >

                                                        {item.title}

                                                    </p>

                                                </div>

                                            </td>


                                            {/* CATEGORY */}

                                            <td
                                                className="
                                                    px-6
                                                    py-4
                                                    text-sm
                                                    text-gray-600
                                                "
                                            >

                                                {item.category}

                                            </td>


                                            {/* TYPE */}

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
                                                            item.type === "Lost"

                                                                ? "bg-red-100 text-red-700"

                                                                : "bg-green-100 text-green-700"
                                                        }
                                                    `}
                                                >

                                                    {item.type}

                                                </span>

                                            </td>


                                            {/* LOCATION */}

                                            <td className="px-6 py-4">

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        text-sm
                                                        text-gray-600
                                                        whitespace-nowrap
                                                    "
                                                >

                                                    <MapPin
                                                        size={15}
                                                        className="
                                                            text-gray-400
                                                            flex-shrink-0
                                                        "
                                                    />

                                                    {item.location}

                                                </div>

                                            </td>


                                            {/* OWNER */}

                                            <td className="px-6 py-4">

                                                <div>

                                                    <p
                                                        className="
                                                            text-sm
                                                            font-medium
                                                            text-gray-900
                                                            whitespace-nowrap
                                                        "
                                                    >

                                                        {
                                                            item.owner?.name ||
                                                            "Unknown"
                                                        }

                                                    </p>


                                                    <p
                                                        className="
                                                            text-xs
                                                            text-gray-500
                                                            mt-1
                                                            whitespace-nowrap
                                                        "
                                                    >

                                                        {
                                                            item.owner?.email ||
                                                            "No email"
                                                        }

                                                    </p>

                                                </div>

                                            </td>


                                            {/* STATUS */}

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
                                                            item.status === "Open"

                                                                ? "bg-yellow-100 text-yellow-700"

                                                                : item.status === "Claimed"

                                                                    ? "bg-blue-100 text-blue-700"

                                                                    : "bg-green-100 text-green-700"
                                                        }
                                                    `}
                                                >

                                                    {item.status}

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
                                                        handleDeleteItem(
                                                            item._id
                                                        )
                                                    }
                                                    disabled={
                                                        deletingId === item._id
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

export default ManageItems;