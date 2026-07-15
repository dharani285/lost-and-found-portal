import { useEffect, useState } from "react";

import ItemCard from "./ItemCard";
import { getAllItems } from "../services/itemService";

function ItemsGrid({
    search,
    category,
    type,
    sort,
    page,
    setPage,
}) {
    const [items, setItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getAllItems(
                    search,
                    category,
                    type,
                    sort,
                    page
                );

                setItems(data.items || []);
                setTotalPages(data.totalPages || 0);
            } catch (error) {
                console.log(error);
            }
        };

        fetchItems();
    }, [search, category, type, sort, page]);

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            <br/>
            <h2
                className="
                    text-5xl
                    font-bold
                    text-center
                    bg-gradient-to-r
                    from-purple-600
                    to-pink-500
                    bg-clip-text
                    text-transparent
                    mb-12
                "
            >
                Recent Items
            </h2>
            <br/>
            {items.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-2xl font-semibold text-gray-700">
                        No recent items yet
                    </p>

                    <p className="mt-2 text-gray-500">
                        Lost and found reports will appear here.
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((item) => (
                            <ItemCard
                                key={item._id}
                                item={item}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-6 mt-12">
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                                className="bg-gray-400 w-25 h-8 hover:bg-gray-500 px-5 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            <span className="text-lg font-semibold">
                                Page {page} of {totalPages}
                            </span>

                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={page === totalPages}
                                className="w-25 h-8 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

export default ItemsGrid;