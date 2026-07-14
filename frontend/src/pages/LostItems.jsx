import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAllItems } from "../services/itemService";

function LostItems() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLostItems = async () => {
            try {
                setLoading(true);

                const data = await getAllItems(
                    "",
                    "",
                    "Lost",
                    "",
                    1,
                    100
                );

                console.log("LOST ITEMS DATA:", data);

                setItems(data.items || []);
            } catch (error) {
                console.error(
                    "GET LOST ITEMS ERROR:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchLostItems();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center">

                    <div className="w-11 h-11 mx-auto border-4 border-purple-100 border-t-purple-600 rounded-full animate-spin" />

                    <p className="mt-4 text-base font-semibold text-gray-500">
                        Loading lost items...
                    </p>

                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-5">

                <div className="text-center">

                    <div className="text-6xl">
                        🔍
                    </div>

                    <h1 className="mt-5 text-3xl font-bold text-gray-900">
                        No Lost Items
                    </h1>

                    <p className="mt-3 text-gray-500">
                        No lost items have been reported yet.
                    </p>

                </div>

            </div>
        );
    }

    return (
        <main className="w-full px-4 sm:px-6 lg:px-8 py-7">

            {/* PAGE HEADER */}

            <div className="mb-8 text-center">
                <br/>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    Lost Items
                </h1>

                <p className="mt-2 text-base sm:text-lg text-gray-500">
                    Browse items that have been reported as lost.
                </p>

                <p className="mt-2 text-lm font-semibold text-purple-600">
                    {items.length} lost items reported
                </p>
                <br/>
            </div>


            {/* ITEMS GRID */}

            <div
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                    gap-6
                "
            >

                {items.map((item) => (

                    <Link
                        key={item._id}
                        to={`/item/${item._id}`}
                        className="
                            group
                            bg-white
                            border
                            border-gray-200
                            rounded-2xl
                            overflow-hidden
                            shadow-sm
                            hover:shadow-lg
                            hover:-translate-y-1
                            transition-all
                            duration-300
                        "
                    >

                        {/* ITEM IMAGE */}

                        <div className="relative w-full h-[230px] overflow-hidden bg-gray-100">

                            <img
                                src={item.image?.url}
                                alt={item.title}
                                className="
                                    w-full
                                    h-full
                                    object-cover
                                    group-hover:scale-105
                                    transition-transform
                                    duration-300
                                "
                            />

                            {/* LOST BADGE */}

                            <span
                                className="
                                    absolute
                                    top-4
                                    left-4
                                    px-4
                                    py-1.5
                                    bg-red-200
                                    text-red-600
                                    border
                                    border-red-200
                                    rounded-full
                                    text-xm
                                    font-bold
                                    w-[70px]
                                    h-[25px]
                                    text-center
                                "
                            >
                                Lost
                            </span>

                        </div>


                        {/* ITEM CONTENT */}

                        <div className="p-5">

                            <h2
                                className="
                                    text-xl
                                    font-bold
                                    text-gray-900
                                    group-hover:text-purple-600
                                    transition
                                "
                            >
                                {item.title}
                            </h2>


                            <div className="mt-3 flex items-center justify-between gap-3">

                                <span className="text-xm font-semibold text-purple-600">
                                    {item.category}
                                </span>

                                <span className="text-sm text-gray-500">
                                    📍 {item.location}
                                </span>

                            </div>


                            {item.description && (
                                <p className="mt-4 text-sm text-gray-500 leading-6 line-clamp-2">
                                    {item.description}
                                </p>
                            )}


                            <div className="mt-5 pt-4 border-t border-gray-100">

                                <p className="text-xm font-semibold text-purple-600">
                                    View Details →
                                </p>

                            </div>

                        </div>

                    </Link>

                ))}

            </div>

        </main>
    );
}

export default LostItems;