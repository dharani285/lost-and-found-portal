import { useEffect, useState } from "react";

import { getMyClaims } from "../services/claimService";

function MyClaims() {

    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchClaims = async () => {

            try {

                const token = localStorage.getItem("token");

                const data = await getMyClaims(token);

            console.log("MY CLAIMS RESPONSE:", data);

            setClaims(data.claims || data.data || []);
            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchClaims();

    }, []);

    if (loading) {

        return (
            <div className="text-center mt-20 text-3xl font-bold">
                Loading...
            </div>
        );

    }

    if (claims.length === 0) {

        return (
            <div className="text-center mt-20">

                <h1 className="text-4xl font-bold">
                    My Claims
                </h1>

                <p className="mt-8 text-gray-500 text-xl">
                    You haven't claimed any items yet.
                </p>

            </div>
        );

    }

    return (

        <div className="max-w-7xl mx-auto px-6 py-10">
            <br/>
            <h1 className="text-4xl font-bold mb-10">
                My Claims
            </h1>
            <br/>
            <div className="grid md:grid-cols-2 gap-8">
                {claims.map((claim) => (

                    <div
                        key={claim._id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden border"
                    >

                        <img
                            src={claim.item?.image?.url}
                            alt={claim.item?.title}
                            className="w-full h-60 object-cover"
                        />

                        <div className="p-6">

                            <h2 className="text-2xl font-bold">
                                {claim.item?.title}
                            </h2>

                            <p className="text-gray-500 mt-2">
                                <strong>Category:</strong>{" "}
                                {claim.item?.category}
                            </p>

                            <p className="mt-3">
                                <strong>Location:</strong>{" "}
                                {claim.item?.location}
                            </p>

                            <p className="mt-3">
                                <strong>Your Message:</strong>
                            </p>

                            <div className="mt-2 bg-gray-100 rounded-lg p-4 text-gray-700">
                                {claim.message}
                            </div>
                            <div className="mt-5 flex justify-between items-center">

                                <span className="font-semibold">
                                    Status
                                </span>

                                <span
                                    className={`text-center w-[130px] h-[25px] px-6 py-2 rounded-full text-white font-semibold ${
                                        claim.status === "Pending"
                                            ? "bg-yellow-500"
                                            : claim.status === "Approved"
                                            ? "bg-green-600"
                                            : "bg-red-600"
                                    }`}
                                >
                                    {claim.status}
                                </span>

                            </div>

                            <hr className="my-5" />

                            <p className="text-gray-500">

                                <strong>Claimed On:</strong>{" "}

                                {new Date(claim.createdAt).toLocaleDateString()}

                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default MyClaims;