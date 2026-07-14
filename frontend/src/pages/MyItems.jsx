import { useEffect, useState } from "react";

import { getMyItems } from "../services/itemService";
import ItemCard from "../components/ItemCard";

function MyItems() {

    const [items, setItems] = useState([]);

    useEffect(() => {

        const fetchItems = async () => {

            try {

                const data = await getMyItems();

                console.log(data);

                setItems(data.items);

            } catch (error) {

                console.log(error);

            }

        };

        fetchItems();

    }, []);

    return (
        
        <section className="max-w-7xl mx-auto px-6 py-12">
            <br/>
            <h1 className="text-4xl font-bold text-center mb-10">
                My Reports
            </h1>
            <br/>
            {items.length === 0 ? (

                <div className="text-center mt-20">

                    <h2 className="text-2xl font-semibold text-gray-600">
                        No Reports Found
                    </h2>
                    <br/>
                    <p className="mt-3 text-gray-500">
                        You haven't reported any lost or found items yet.
                    </p>

                </div>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {items.map((item) => (

                        <ItemCard
                            key={item._id}
                            item={item}
                            showActions={true}
                            onDelete={() =>
                                setItems(items.filter((i) => i._id !== item._id))
                            }
                        />

                    ))}

                </div>

            )}

        </section>

    );
}

export default MyItems;