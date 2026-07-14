import { useEffect, useState } from "react";
import {
    FileCheck,
    User,
    Package,
} from "lucide-react";

import {
    getAllClaimsAdmin,
} from "../../services/adminService";


const ManageClaims = () => {

    // ======================================================
    // STATES
    // ======================================================

    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ======================================================
    // FETCH ALL CLAIMS
    // ======================================================

    const fetchClaims = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getAllClaimsAdmin();

            setClaims(response.claims);

        } catch (error) {

            console.error(
                "Failed to load claims:",
                error
            );

            setError("Unable to load claims");

        } finally {

            setLoading(false);

        }

    };


    // ======================================================
    // LOAD CLAIMS WHEN PAGE OPENS
    // ======================================================

    useEffect(() => {

        fetchClaims();

    }, []);


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

                        Loading claims...

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

            <div className="max-w-7xl mx-auto px-8 py-10">


                {/* ======================================================
                    PAGE HEADER
                ====================================================== */}

                <div className="w-full mb-10">
                    <br/>
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
                                text-2xl
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

                            Manage Claims

                        </h1>


                        <p className="mt-3 text-gray-500">

                            View all submitted claims

                        </p>

                    </div>

                </div>

                <br />


                {/* ======================================================
                    CLAIMS SUMMARY
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
                                bg-orange-100
                                text-orange-600
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <FileCheck size={23} />

                        </div>


                        <div>

                            <p className="text-sm text-gray-500">

                                Total Submitted Claims

                            </p>


                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                    text-gray-900
                                "
                            >

                                {claims.length}

                            </h2>

                        </div>

                    </div>

                </div>


                {/* ======================================================
                    CLAIMS TABLE
                ====================================================== */}

                <div
                    className="
                        bg-white
                        border
                        border-gray-100
                        rounded-2xl
                        shadow-xs
                        overflow-hidden
                    "
                >

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[900px]">


                            {/* ======================================================
                                TABLE HEADER
                            ====================================================== */}

                            <thead className="bg-gray-50">

                                <tr>

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

                                        <br />Item

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

                                        <br />Claimer

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

                                        <br />Owner

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

                                        <br />Message

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

                                        <br />Status

                                    </th>

                                </tr>

                            </thead>


                            {/* ======================================================
                                TABLE BODY
                            ====================================================== */}

                            <tbody className="divide-y divide-gray-100">

                                {claims.length === 0 ? (

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

                                            No claims found

                                        </td>

                                    </tr>

                                ) : (

                                    claims.map((claim) => (

                                        <tr
                                            key={claim._id}
                                            className="
                                                hover:bg-gray-50
                                                transition
                                            "
                                        >


                                            {/* ======================================================
                                                ITEM
                                            ====================================================== */}

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
                                                            rounded-xl
                                                            bg-blue-100
                                                            text-blue-600
                                                            flex
                                                            items-center
                                                            justify-center
                                                            flex-shrink-0
                                                        "
                                                    >

                                                        <Package size={19} />

                                                    </div>


                                                    <p
                                                        className="
                                                            text-sm
                                                            font-medium
                                                            text-gray-900
                                                        "
                                                    >

                                                        {
                                                            claim.item?.title ||
                                                            "Item unavailable"
                                                        }

                                                    </p>

                                                </div>

                                            </td>


                                            {/* ======================================================
                                                CLAIMER
                                            ====================================================== */}

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
                                                            w-9
                                                            h-9
                                                            rounded-full
                                                            bg-purple-100
                                                            text-purple-600
                                                            flex
                                                            items-center
                                                            justify-center
                                                            flex-shrink-0
                                                        "
                                                    >

                                                        <User size={17} />

                                                    </div>


                                                    <div>

                                                        <p
                                                            className="
                                                                text-sm
                                                                font-medium
                                                                text-gray-900
                                                            "
                                                        >

                                                            {
                                                                claim.claimer?.name ||
                                                                "Unknown"
                                                            }

                                                        </p>


                                                        <p
                                                            className="
                                                                text-xs
                                                                text-gray-500
                                                                mt-1
                                                            "
                                                        >

                                                            {
                                                                claim.claimer?.email ||
                                                                "No email"
                                                            }

                                                        </p>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* ======================================================
                                                OWNER
                                            ====================================================== */}

                                            <td className="px-6 py-4">

                                                <div>

                                                    <p
                                                        className="
                                                            text-sm
                                                            font-medium
                                                            text-gray-900
                                                        "
                                                    >

                                                        {
                                                            claim.owner?.name ||
                                                            "Unknown"
                                                        }

                                                    </p>


                                                    <p
                                                        className="
                                                            text-xs
                                                            text-gray-500
                                                            mt-1
                                                        "
                                                    >

                                                        {
                                                            claim.owner?.email ||
                                                            "No email"
                                                        }

                                                    </p>

                                                </div>

                                            </td>


                                            {/* ======================================================
                                                MESSAGE
                                            ====================================================== */}

                                            <td
                                                className="
                                                    px-6
                                                    py-4
                                                    text-sm
                                                    text-gray-600
                                                    max-w-[250px]
                                                "
                                            >

                                                <p className="line-clamp-2">

                                                    {
                                                        claim.message ||
                                                        "No message"
                                                    }

                                                </p>

                                            </td>


                                            {/* ======================================================
                                                STATUS
                                            ====================================================== */}

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
                                                            claim.status === "Pending"

                                                                ? "bg-yellow-100 text-yellow-700"

                                                                : claim.status === "Approved"

                                                                    ? "bg-green-100 text-green-700"

                                                                    : "bg-red-100 text-red-700"
                                                        }
                                                    `}
                                                >

                                                    {claim.status}

                                                </span>

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

export default ManageClaims;