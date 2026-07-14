import { useEffect, useState } from "react";

import {
    getReceivedClaims,
    updateClaimStatus,
} from "../services/claimService";


function ReceivedClaims() {

    // ======================================================
    // STATES
    // ======================================================

    const [claims, setClaims] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [updatingClaimId, setUpdatingClaimId] =
        useState(null);



    // ======================================================
    // FETCH RECEIVED CLAIMS
    // ======================================================

    const fetchReceivedClaims = async () => {

        try {

            setLoading(true);

            setError("");


            const token = localStorage.getItem("token");


            const data = await getReceivedClaims(token);


            // Check API response in browser console

            console.log(
                "RECEIVED CLAIMS API DATA:",
                data
            );


            // ======================================================
            // HANDLE BOTH POSSIBLE API RESPONSE FORMATS
            // ======================================================

            /*
                FORMAT 1:

                [
                    claim1,
                    claim2
                ]


                FORMAT 2:

                {
                    success: true,
                    count: 2,
                    claims: [
                        claim1,
                        claim2
                    ]
                }
            */


            const receivedClaims = Array.isArray(data)

                ? data

                : data?.claims || [];


            console.log(
                "RECEIVED CLAIMS ARRAY:",
                receivedClaims
            );


            // ======================================================
            // REMOVE CLAIMS WHOSE ITEMS WERE DELETED
            // ======================================================

            const validClaims = receivedClaims.filter(

                (claim) =>

                    claim.item &&

                    claim.item._id &&

                    claim.item.title

            );


            console.log(
                "VALID CLAIMS AFTER FILTER:",
                validClaims
            );


            setClaims(validClaims);


        } catch (error) {

            console.error(
                "GET RECEIVED CLAIMS ERROR:",
                error
            );


            setError(

                error.response?.data?.message ||

                "Unable to load received claims"

            );


        } finally {

            setLoading(false);

        }

    };



    // ======================================================
    // LOAD CLAIMS WHEN PAGE OPENS
    // ======================================================

    useEffect(() => {

        fetchReceivedClaims();

    }, []);



    // ======================================================
    // UPDATE CLAIM STATUS
    // ======================================================

    const handleStatusUpdate = async (
        claimId,
        status
    ) => {

        try {

            setUpdatingClaimId(claimId);


            const token = localStorage.getItem("token");


            await updateClaimStatus(
                claimId,
                status,
                token
            );


            // ======================================================
            // UPDATE FRONTEND STATE
            // ======================================================

            setClaims((previousClaims) =>

                previousClaims.map((claim) =>

                    claim._id === claimId

                        ? {
                            ...claim,

                            status,
                        }

                        : claim

                )

            );


        } catch (error) {

            console.error(
                "UPDATE CLAIM STATUS ERROR:",
                error
            );


            alert(

                error.response?.data?.message ||

                "Failed to update claim status"

            );


        } finally {

            setUpdatingClaimId(null);

        }

    };



    // ======================================================
    // STATUS STYLES
    // ======================================================

    const getStatusStyle = (status) => {

        if (status === "Approved") {

            return (
                "bg-green-50 " +
                "text-green-700 " +
                "border-green-200"
            );

        }


        if (status === "Rejected") {

            return (
                "bg-red-50 " +
                "text-red-700 " +
                "border-red-200"
            );

        }


        return (
            "bg-yellow-50 " +
            "text-yellow-700 " +
            "border-yellow-200"
        );

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
                            w-11
                            h-11
                            mx-auto
                            border-4
                            border-purple-100
                            border-t-purple-600
                            rounded-full
                            animate-spin
                        "
                    />


                    <p
                        className="
                            mt-4
                            text-base
                            font-semibold
                            text-gray-500
                        "
                    >

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
                    px-5
                "
            >

                <div className="text-center">


                    <h2
                        className="
                            text-2xl
                            font-bold
                            text-red-600
                        "
                    >

                        Unable to Load Claims

                    </h2>


                    <p
                        className="
                            mt-3
                            text-gray-500
                        "
                    >

                        {error}

                    </p>


                    <button
                        onClick={fetchReceivedClaims}
                        className="
                            mt-6
                            px-6
                            py-3
                            bg-purple-600
                            text-white
                            rounded-lg
                            font-semibold
                            hover:bg-purple-700
                            transition
                        "
                    >

                        Try Again

                    </button>


                </div>

            </div>

        );

    }



    // ======================================================
    // NO CLAIMS
    // ======================================================

    if (claims.length === 0) {

        return (

            <div
                className="
                    min-h-[70vh]
                    flex
                    items-center
                    justify-center
                    px-5
                "
            >

                <div className="text-center">


                    <div className="text-6xl">

                        📭

                    </div>


                    <h1
                        className="
                            mt-5
                            text-3xl
                            font-bold
                            text-gray-900
                        "
                    >

                        No Received Claims

                    </h1>


                    <p
                        className="
                            mt-3
                            text-gray-500
                        "
                    >

                        Claims submitted for your reported
                        items will appear here.

                    </p>


                </div>

            </div>

        );

    }



    // ======================================================
    // PAGE
    // ======================================================

    return (

        <main
            className="
                w-full
                px-4
                sm:px-6
                lg:px-8
                py-7
            "
        >


            {/* ======================================================
                PAGE HEADER
            ====================================================== */}
            <br/>
            <div className="mt-8 mb-10">


                <h1
                    className="
                        text-center
                        text-3xl
                        sm:text-4xl
                        font-bold
                        text-gray-900
                    "
                >

                    Received Claims

                </h1>


                <p
                    className="
                        text-center
                        mt-2
                        text-base
                        sm:text-lg
                        text-gray-500
                    "
                >

                    Review claims submitted for your
                    reported items.

                </p>


            </div>
            <br/>



            {/* ======================================================
                CLAIMS LIST
            ====================================================== */}

            <div className="space-y-8">


                {claims.map((claim) => (

                    <article

                        key={claim._id}

                        className="
                            w-full
                            bg-white
                            border
                            border-gray-200
                            rounded-2xl
                            shadow-sm
                            hover:shadow-md
                            transition-shadow
                            duration-300
                            p-5
                            sm:p-6
                            lg:p-7
                        "
                    >


                        <div
                            className="
                                grid
                                grid-cols-1
                                lg:grid-cols-[260px_minmax(260px,0.9fr)_minmax(320px,1.2fr)]
                                gap-7
                                lg:gap-10
                            "
                        >


                            {/* ======================================================
                                ITEM IMAGE
                            ====================================================== */}

                            <div className="w-full">


                                <div
                                    className="
                                        w-full
                                        h-[230px]
                                        lg:h-[250px]
                                        rounded-xl
                                        overflow-hidden
                                        bg-gray-100
                                    "
                                >


                                    {claim.item?.image?.url ? (

                                        <img

                                            src={
                                                claim.item.image.url
                                            }

                                            alt={
                                                claim.item.title ||
                                                "Claimed item"
                                            }

                                            className="
                                                w-full
                                                h-full
                                                object-cover
                                            "
                                        />

                                    ) : (

                                        <div
                                            className="
                                                w-full
                                                h-full
                                                flex
                                                items-center
                                                justify-center
                                                text-gray-400
                                            "
                                        >

                                            No Image

                                        </div>

                                    )}


                                </div>


                            </div>



                            {/* ======================================================
                                ITEM AND CLAIMANT DETAILS
                            ====================================================== */}

                            <div className="flex flex-col">


                                {/* ITEM DETAILS */}

                                <div>


                                    <p
                                        className="
                                            text-sm
                                            font-bold
                                            uppercase
                                            tracking-widest
                                            text-purple-600
                                        "
                                    >

                                        Claimed Item

                                    </p>



                                    <div
                                        className="
                                            mt-2
                                            flex
                                            flex-wrap
                                            items-start
                                            justify-between
                                            gap-3
                                        "
                                    >


                                        <h2
                                            className="
                                                text-2xl
                                                sm:text-3xl
                                                font-bold
                                                text-gray-900
                                            "
                                        >

                                            {claim.item?.title}

                                        </h2>



                                        <span
                                            className={`
                                                px-5
                                                py-2
                                                rounded-full
                                                border
                                                text-sm
                                                font-bold

                                                ${getStatusStyle(
                                                    claim.status
                                                )}
                                            `}
                                        >

                                            {claim.status}

                                        </span>


                                    </div>



                                    <div
                                        className="
                                            mt-4
                                            flex
                                            flex-wrap
                                            items-center
                                            gap-x-5
                                            gap-y-2
                                        "
                                    >


                                        <span
                                            className="
                                                text-sm
                                                font-semibold
                                                text-purple-600
                                            "
                                        >

                                            {claim.item?.category}

                                        </span>


                                        <span className="text-gray-300">

                                            •

                                        </span>


                                        <span
                                            className="
                                                text-sm
                                                font-medium
                                                text-gray-600
                                            "
                                        >

                                            📍 {claim.item?.location}

                                        </span>


                                    </div>


                                </div>



                                {/* ======================================================
                                    CLAIMANT DETAILS
                                ====================================================== */}

                                <div className="mt-8">


                                    <h3
                                        className="
                                            text-lg
                                            font-bold
                                            text-gray-900
                                        "
                                    >

                                        Claimant Details

                                    </h3>



                                    <div className="mt-5 space-y-5">


                                        {/* NAME */}

                                        <div>


                                            <p
                                                className="
                                                    text-xs
                                                    font-semibold
                                                    uppercase
                                                    tracking-wide
                                                    text-gray-400
                                                "
                                            >

                                                Name

                                            </p>


                                            <p
                                                className="
                                                    mt-1
                                                    text-base
                                                    font-semibold
                                                    text-gray-800
                                                "
                                            >

                                                {
                                                    claim.claimer?.name ||
                                                    "Not provided"
                                                }

                                            </p>


                                        </div>



                                        {/* EMAIL */}

                                        <div>


                                            <p
                                                className="
                                                    text-xs
                                                    font-semibold
                                                    uppercase
                                                    tracking-wide
                                                    text-gray-400
                                                "
                                            >

                                                Email

                                            </p>


                                            <p
                                                className="
                                                    mt-1
                                                    text-base
                                                    font-semibold
                                                    text-gray-800
                                                    break-all
                                                "
                                            >

                                                {
                                                    claim.claimer?.email ||
                                                    "Not provided"
                                                }

                                            </p>


                                        </div>



                                        {/* PHONE */}

                                        <div>


                                            <p
                                                className="
                                                    text-xs
                                                    font-semibold
                                                    uppercase
                                                    tracking-wide
                                                    text-gray-400
                                                "
                                            >

                                                Phone

                                            </p>


                                            <p
                                                className="
                                                    mt-1
                                                    text-base
                                                    font-semibold
                                                    text-gray-800
                                                "
                                            >

                                                {
                                                    claim.claimer?.phone ||
                                                    "Not provided"
                                                }

                                            </p>


                                        </div>


                                    </div>


                                </div>


                            </div>



                            {/* ======================================================
                                MESSAGE AND ACTIONS
                            ====================================================== */}

                            <div className="flex flex-col">


                                <h3
                                    className="
                                        text-lg
                                        font-bold
                                        text-gray-900
                                    "
                                >

                                    Claim Message

                                </h3>



                                <div className="mt-4 flex-1">


                                    <p
                                        className="
                                            text-base
                                            text-gray-600
                                            leading-7
                                        "
                                    >

                                        {
                                            claim.message ||
                                            "No message provided."
                                        }

                                    </p>


                                </div>



                                {/* DATE */}

                                <div
                                    className="
                                        mt-8
                                        pt-5
                                        border-t
                                        border-gray-100
                                    "
                                >


                                    <p className="text-sm text-gray-500">


                                        Submitted on{" "}


                                        <span
                                            className="
                                                font-semibold
                                                text-gray-700
                                            "
                                        >

                                            {
                                                new Date(
                                                    claim.createdAt
                                                ).toLocaleDateString()
                                            }

                                        </span>


                                    </p>


                                </div>



                                {/* ======================================================
                                    ACTION BUTTONS
                                ====================================================== */}

                                {claim.status === "Pending" && (

                                    <div
                                        className="
                                            mt-5
                                            flex
                                            flex-wrap
                                            justify-start
                                            lg:justify-end
                                            gap-3
                                        "
                                    >


                                        {/* REJECT */}

                                        <button

                                            onClick={() =>
                                                handleStatusUpdate(
                                                    claim._id,
                                                    "Rejected"
                                                )
                                            }

                                            disabled={
                                                updatingClaimId ===
                                                claim._id
                                            }

                                            className="
                                                min-w-[110px]
                                                px-6
                                                py-2.5
                                                rounded-lg
                                                border
                                                border-red-200
                                                text-red-600
                                                font-semibold
                                                hover:bg-red-50
                                                hover:border-red-300
                                                disabled:opacity-50
                                                disabled:cursor-not-allowed
                                                transition
                                            "
                                        >

                                            Reject

                                        </button>



                                        {/* APPROVE */}

                                        <button

                                            onClick={() =>
                                                handleStatusUpdate(
                                                    claim._id,
                                                    "Approved"
                                                )
                                            }

                                            disabled={
                                                updatingClaimId ===
                                                claim._id
                                            }

                                            className="
                                                min-w-[110px]
                                                px-6
                                                py-2.5
                                                rounded-lg
                                                bg-green-600
                                                text-white
                                                font-semibold
                                                hover:bg-green-700
                                                disabled:opacity-50
                                                disabled:cursor-not-allowed
                                                transition
                                            "
                                        >

                                            {
                                                updatingClaimId ===
                                                claim._id

                                                    ? "Updating..."

                                                    : "Approve"
                                            }

                                        </button>


                                    </div>

                                )}


                            </div>


                        </div>


                    </article>

                ))}


            </div>


        </main>

    );

}


export default ReceivedClaims;