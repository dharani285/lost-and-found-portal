import { useNavigate } from "react-router-dom";
import { deleteItem } from "../services/itemService";

function ItemCard({ item, showActions = false, onDelete }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

            <img
                src={item.image?.url || item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
            />

            <div className="p-5">

                <h2 className="text-2xl font-bold">
                    {item.title}
                </h2>

                <p className="mt-2 text-gray-600">
                    {item.description}
                </p>

                <div className="mt-4 flex justify-between items-center">

                   <span
                        className={`w-24 h-8 flex items-center justify-center rounded-full text-white font-semibold ${
                            item.status === "Claimed"
                                ? "bg-green-500"
                                : "bg-red-500"
                        }`}
                    >
                        {item.status === "Claimed" ? "Found" : "Lost"}
                    </span>
                    <br/>
                    <br/>
                    <span className="text-gray-500">
                        📍 {item.location}
                    </span>

                </div>

                {/* Home Page */}
                {!showActions && (
                    <button
                        onClick={() => navigate(`/item/${item._id}`)}
                        className="mt-6 w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition duration-300"
                    >
                        View Details
                    </button>
                )}

                {/* My Reports */}
                {/* My Reports */}
                    {showActions && (
                        <div className="mt-6 grid grid-cols-3 gap-3">

                            {/* View */}
                            <button
                                onClick={() => navigate(`/item/${item._id}`)}
                                className="flex items-center justify-center gap-2 h-11 rounded-xl border border-blue-200 bg-blue-50 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
                            >
                                👁️
                                <span>View</span>
                            </button>

                            {/* Edit */}
                            <button
                                onClick={() => navigate(`/edit-item/${item._id}`)}
                                className="flex items-center justify-center gap-2 h-11 rounded-xl border border-amber-200 bg-amber-90 text-amber-600 font-medium hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-sm"
                            >
                                ✏️
                                <span>Edit</span>
                            </button>

                            {/* Delete */}
                            <button
                                onClick={async () => {

                                    const confirmDelete = window.confirm(
                                        "Are you sure you want to delete this item?"
                                    );

                                    if (!confirmDelete) return;

                                    try {

                                        await deleteItem(item._id);

                                        alert("Item deleted successfully!");

                                        if (onDelete) {
                                            onDelete();
                                        }

                                    } catch (error) {

                                        alert(
                                            error.response?.data?.message ||
                                            "Failed to delete item."
                                        );

                                    }

                                }}
                                className="flex items-center justify-center gap-2 h-11 rounded-xl border border-red-200 bg-red-50 text-red-600 font-medium hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm"
                            >
                                🗑️
                                <span>Delete</span>
                            </button>

                        </div>
                    )}

            </div>

        </div>
    );
}

export default ItemCard;