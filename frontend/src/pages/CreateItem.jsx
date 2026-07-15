import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createItem } from "../services/itemService";


function CreateItem() {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        type: "Lost",
        location: "",
        date: "",
        image: null,
    });


    const [submitting, setSubmitting] = useState(false);


    // ======================================================
    // HANDLE INPUT CHANGE
    // ======================================================

    const handleChange = (e) => {

        const { name, value } = e.target;


        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));

    };


    // ======================================================
    // HANDLE IMAGE
    // ======================================================

    const handleImage = (e) => {

        const selectedImage =
            e.target.files?.[0] || null;


        setFormData((previousData) => ({
            ...previousData,
            image: selectedImage,
        }));

    };


    // ======================================================
    // HANDLE SUBMIT
    // ======================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (submitting) {
            return;
        }


        // ======================================================
        // VALIDATION
        // ======================================================

        if (
            !formData.title.trim() ||
            !formData.description.trim() ||
            !formData.category ||
            !formData.type ||
            !formData.location.trim() ||
            !formData.date
        ) {

            alert("Please fill in all required fields.");

            return;

        }


        setSubmitting(true);


        try {

            const data = new FormData();


            data.append(
                "title",
                formData.title.trim()
            );


            data.append(
                "description",
                formData.description.trim()
            );


            data.append(
                "category",
                formData.category
            );


            data.append(
                "type",
                formData.type
            );


            data.append(
                "location",
                formData.location.trim()
            );


            data.append(
                "date",
                formData.date
            );


            if (formData.image) {

                data.append(
                    "image",
                    formData.image
                );

            }


            const response =
                await createItem(data);


            console.log(
                "CREATE ITEM RESPONSE:",
                response
            );


            alert("Item Reported Successfully!");


            const createdItemType =
                formData.type;


            // ======================================================
            // RESET FORM
            // ======================================================

            setFormData({
                title: "",
                description: "",
                category: "",
                type: "Lost",
                location: "",
                date: "",
                image: null,
            });


            // ======================================================
            // NAVIGATE
            // ======================================================

            if (createdItemType === "Lost") {

                navigate("/lost-items");

            } else {

                navigate("/found-items");

            }


        } catch (error) {

            console.error(
                "CREATE ITEM ERROR:",
                error
            );


            console.error(
                "BACKEND ERROR:",
                error.response?.data
            );


            alert(
                error.response?.data?.message ||
                "Failed to report item."
            );


        } finally {

            setSubmitting(false);

        }

    };


    return (

        <main
            className="
                w-full
                min-h-screen
                bg-gray-100
            "
        >

            {/* ======================================================
                PAGE WRAPPER
            ====================================================== */}

            <div
                className="
                    w-full
                    min-h-screen
                    flex
                    justify-center
                    items-center
                    px-4
                    sm:px-6
                    py-16
                "
            >


                {/* ======================================================
                    CENTERED FORM CARD
                ====================================================== */}

                <div
                    className="
                        w-full
                        max-w-3xl
                        bg-white
                        rounded-3xl
                        shadow-xl
                        px-8
                        md:px-12
                        py-12
                    "
                >


                    {/* ======================================================
                        PAGE HEADER
                    ====================================================== */}

                    <div className="text-center mb-12">

                        <h1
                            className="
                                text-3xl
                                sm:text-4xl
                                font-bold
                                text-gray-900
                            "
                        >
                            Report Lost / Found Item
                        </h1>


                        <p
                            className="
                                mt-3
                                text-base
                                text-gray-500
                            "
                        >
                            Provide the item details below.
                        </p>

                    </div>


                    {/* ======================================================
                        FORM
                    ====================================================== */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-10  px-8 sm:px-10"
                    >


                        {/* ======================================================
                            ITEM TITLE
                        ====================================================== */}

                        <div>

                            <label
                                className="
                                    block
                                    mb-3
                                    text-base
                                    font-semibold
                                    text-gray-700
                                "
                            >
                                Item Title
                            </label>


                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter item title"
                                required
                                disabled={submitting}
                                className="
                                    w-full
                                    h-14
                                    rounded-xl
                                    border
                                    border-gray-300
                                    px-4
                                    text-base
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-purple-500
                                    focus:border-transparent
                                    disabled:bg-gray-100
                                "
                            />

                        </div>


                        {/* ======================================================
                            DESCRIPTION
                        ====================================================== */}

                        <div>

                            <label
                                className="
                                    block
                                    mb-3
                                    text-base
                                    font-semibold
                                    text-gray-700
                                "
                            >
                                Description
                            </label>


                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the item..."
                                required
                                disabled={submitting}
                                className="
                                    w-full
                                    h-40
                                    rounded-xl
                                    border
                                    border-gray-300
                                    px-4
                                    py-3
                                    text-base
                                    resize-none
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-purple-500
                                    focus:border-transparent
                                    disabled:bg-gray-100
                                "
                            />

                        </div>


                        {/* ======================================================
                            CATEGORY AND TYPE
                        ====================================================== */}

                        <div
                            className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-10
                            "
                        >


                            {/* CATEGORY */}

                            <div>

                                <label
                                    className="
                                        block
                                        mb-3
                                        text-base
                                        font-semibold
                                        text-gray-700
                                    "
                                >
                                    Category
                                </label>


                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    disabled={submitting}
                                    className="
                                        w-full
                                        h-14
                                        rounded-xl
                                        border
                                        border-gray-300
                                        bg-white
                                        px-4
                                        text-base
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-purple-500
                                        focus:border-transparent
                                        disabled:bg-gray-100
                                    "
                                >

                                    <option value="">
                                        Select Category
                                    </option>

                                    <option value="accessories">
                                        Accessories
                                    </option>

                                    <option value="electronics">
                                        Electronics
                                    </option>

                                    <option value="documents">
                                        Documents
                                    </option>

                                    <option value="clothing">
                                        Clothing
                                    </option>

                                    <option value="pets">
                                        Pets
                                    </option>

                                    <option value="others">
                                        Others
                                    </option>

                                </select>

                            </div>


                            {/* TYPE */}

                            <div>

                                <label
                                    className="
                                        block
                                        mb-3
                                        text-base
                                        font-semibold
                                        text-gray-700
                                    "
                                >
                                    Type
                                </label>


                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                    disabled={submitting}
                                    className="
                                        w-full
                                        h-14
                                        rounded-xl
                                        border
                                        border-gray-300
                                        bg-white
                                        px-4
                                        text-base
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-purple-500
                                        focus:border-transparent
                                        disabled:bg-gray-100
                                    "
                                >

                                    <option value="Lost">
                                        Lost
                                    </option>

                                    <option value="Found">
                                        Found
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* ======================================================
                            LOCATION AND DATE
                        ====================================================== */}

                        <div
                            className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-8
                            "
                        >


                            {/* LOCATION */}

                            <div>

                                <label
                                    className="
                                        block
                                        mb-3
                                        text-base
                                        font-semibold
                                        text-gray-700
                                    "
                                >
                                    Location
                                </label>


                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Enter location"
                                    required
                                    disabled={submitting}
                                    className="
                                        w-full
                                        h-14
                                        rounded-xl
                                        border
                                        border-gray-300
                                        px-4
                                        text-base
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-purple-500
                                        focus:border-transparent
                                        disabled:bg-gray-100
                                    "
                                />

                            </div>


                            {/* DATE */}

                            <div>

                                <label
                                    className="
                                        block
                                        mb-3
                                        text-base
                                        font-semibold
                                        text-gray-700
                                    "
                                >
                                    Date
                                </label>


                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    disabled={submitting}
                                    className="
                                        w-full
                                        h-14
                                        rounded-xl
                                        border
                                        border-gray-300
                                        px-4
                                        text-base
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-purple-500
                                        focus:border-transparent
                                        disabled:bg-gray-100
                                    "
                                />

                            </div>

                        </div>


                        {/* ======================================================
                            IMAGE UPLOAD
                        ====================================================== */}

                        <div>

                            <label
                                className="
                                    block
                                    mb-3
                                    text-base
                                    font-semibold
                                    text-gray-700
                                "
                            >
                                Upload Image
                            </label>


                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImage}
                                disabled={submitting}
                                className="
                                    block
                                    w-full
                                    rounded-xl
                                    border
                                    border-gray-300
                                    cursor-pointer
                                    text-base

                                    file:mr-4
                                    file:px-6
                                    file:py-4
                                    file:border-0
                                    file:bg-purple-600
                                    file:text-white
                                    file:font-semibold

                                    hover:file:bg-purple-700

                                    disabled:opacity-60
                                "
                            />

                        </div>


                        {/* ======================================================
                            SUBMIT BUTTON
                        ====================================================== */}
                        <br/>
                        <div className="pt-10">

                            <button
                                type="submit"
                                disabled={submitting}
                                className="
                                    w-full
                                    min-h-[40px]
                                    px-6
                                    py-3
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-purple-600
                                    to-pink-500
                                    text-white
                                    text-lg
                                    font-bold
                                    shadow-md
                                    hover:opacity-90
                                    disabled:opacity-60
                                    disabled:cursor-not-allowed
                                    transition
                                    duration-300
                                    
                                "
                            >

                                {
                                    submitting
                                        ? "Submitting..."
                                        : `Report ${formData.type} Item`
                                }

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </main>

    );

}


export default CreateItem;