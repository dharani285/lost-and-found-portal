import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getItemById, updateItem } from "../services/itemService";

function EditItem() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        type: "Lost",
        location: "",
        date: "",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const data = await getItemById(id);

                const item = data.item;

                setFormData({
                    title: item.title,
                    description: item.description,
                    category: item.category,
                    type: item.type,
                    location: item.location,
                    date: item.date
                        ? item.date.substring(0, 10)
                        : "",
                });

                setPreview(item.image?.url || "");
            } catch (error) {
                console.log(error);
                alert("Unable to load item.");
            }
        };

        fetchItem();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            if (image) {
                data.append("image", image);
            }

            await updateItem(id, data);

            alert("Item updated successfully!");

            navigate("/my-items");
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                "Failed to update item."
            );
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8">

            <h1 className="text-4xl font-bold text-center mb-8">
                Edit Item
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                    required
                />

                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                >
                    <option value="Lost">Lost</option>
                    <option value="Found">Found</option>
                </select>

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                    required
                />

                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                />

                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-xl"
                    />
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="w-full"
                />

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
                >
                    Update Item
                </button>

            </form>

        </div>
    );
}

export default EditItem;
