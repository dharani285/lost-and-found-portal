// this is for displaying items
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
    const [totalPages, setTotalPages] = useState(1);

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

                setItems(data.items);
                setTotalPages(data.totalPages);

            } catch (error) {

                console.log(error);

            }

        };

        fetchItems();

    }, [search, category, type, sort, page]);

    return (
    
        <section className="max-w-7xl mx-auto px-6 py-12">
            <br/>
            <h2 className=" text-5xl
                    font-bold
                    text-center
                    bg-gradient-to-r
                    from-purple-600
                    to-pink-500
                    bg-clip-text
                    text-transparent">
                Recent Items
            </h2>
            <br/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {items.map((item) => (

                    <ItemCard
                        key={item._id}
                        item={item}
                    />

                ))}

            </div>
            <br/>
            {/* Pagination */}

            <div className="flex justify-center items-center gap-6 mt-12">

                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="bg-gray-400 w-25 h-8 hover:bg-gray-400 px-5 py-2 rounded-lg disabled:opacity-50"
                >
                    Previous
                </button>

                <span className="text-lg font-semibold">
                    Page {page} of {totalPages}
                </span>

                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="w-25 h-8 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg disabled:opacity-50"
                >
                    Next
                </button>

            </div>
            <br/>
        </section>
    );
}

export default ItemsGrid;