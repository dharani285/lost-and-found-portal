import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getItemById } from "../services/itemService";

import {
    createClaim,
    checkExistingClaim,
} from "../services/claimService";

import { useAuth } from "../Context/AuthContext";

import {
    ShieldCheckIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";


function ItemDetails() {
    const { id } = useParams();
    const { user } = useAuth();

    const [item, setItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [claimLoading, setClaimLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const [hasClaimed, setHasClaimed] = useState(false);
    const [existingClaim, setExistingClaim] = useState(null);


    // =====================================================
    // FETCH ITEM + CHECK EXISTING CLAIM
    // =====================================================

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                setPageLoading(true);

                // Get item
                const itemData = await getItemById(id);

                setItem(itemData.item);


                // Check claim only when user is logged in
                if (user) {
                    try {
                        const token = localStorage.getItem("token");

                        const claimData = await checkExistingClaim(
                            id,
                            token
                        );

                        console.log(
                            "CHECK EXISTING CLAIM:",
                            claimData
                        );


                        if (
                            claimData.hasClaimed &&
                            claimData.claim
                        ) {
                            setHasClaimed(true);

                            setExistingClaim(
                                claimData.claim
                            );
                        } else {
                            setHasClaimed(false);

                            setExistingClaim(null);
                        }

                    } catch (error) {
                        console.error(
                            "CHECK CLAIM ERROR:",
                            error
                        );

                        setHasClaimed(false);
                        setExistingClaim(null);
                    }
                } else {
                    setHasClaimed(false);
                    setExistingClaim(null);
                }

            } catch (error) {
                console.error(
                    "GET ITEM ERROR:",
                    error
                );

            } finally {
                setPageLoading(false);
            }
        };


        fetchPageData();

    }, [id, user]);


    // =====================================================
    // SUBMIT CLAIM
    // =====================================================

    const handleClaim = async () => {
        if (!message.trim()) {
            alert("Please enter your claim message.");
            return;
        }

        if (claimLoading) {
            return;
        }

        try {
            setClaimLoading(true);

            const token = localStorage.getItem("token");

            const data = await createClaim(
                {
                    itemId: item._id,
                    message: message.trim(),
                },
                token
            );


            console.log(
                "CREATED CLAIM:",
                data
            );


            // Update UI immediately after claim
            setHasClaimed(true);

            setExistingClaim(
                data.claim
            );


            // Close modal
            setShowModal(false);

            setMessage("");


            alert(
                "Claim submitted successfully."
            );

        } catch (error) {
            console.error(
                "CREATE CLAIM ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to submit claim."
            );

        } finally {
            setClaimLoading(false);
        }
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (pageLoading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">

                <div className="text-center">

                    <div
                        className="
                            w-12
                            h-12
                            mx-auto
                            border-4
                            border-purple-100
                            border-t-purple-600
                            rounded-full
                            animate-spin
                        "
                    />

                    <p className="mt-4 text-lg font-semibold text-gray-500">
                        Loading item...
                    </p>

                </div>

            </div>
        );
    }


    // =====================================================
    // ITEM NOT FOUND
    // =====================================================

    if (!item) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">

                <h1 className="text-3xl font-bold text-gray-700">
                    Item Not Found
                </h1>

            </div>
        );
    }


    // =====================================================
    // CHECK OWNER
    // =====================================================

    const loggedInUserId =
        user?._id || user?.id;

    const itemOwnerId =
        item.owner?._id || item.owner;


    const isOwner =
        loggedInUserId &&
        itemOwnerId &&
        loggedInUserId.toString() ===
            itemOwnerId.toString();


    // =====================================================
    // CLAIM STATUS
    // =====================================================

    const claimStatus =
        existingClaim?.status || "Pending";


    // =====================================================
    // JSX
    // =====================================================

    return (
        <main className="max-w-6xl mx-auto px-6 py-10">

            <div className="grid md:grid-cols-2 gap-10">


                {/* ITEM IMAGE */}

                <div>
                    <br />

                    <img
                        src={item.image?.url}
                        alt={item.title}
                        className="
                            w-full
                            h-[500px]
                            object-cover
                            rounded-xl
                            shadow-lg
                        "
                    />

                </div>


                {/* ITEM DETAILS */}

                <div>
                    <br />


                    <h1 className="text-4xl font-bold">
                        {item.title}
                    </h1>


                    <br />


                    {/* TYPE BADGE */}

                    <span
                        className={`
                            inline-flex
                            items-center
                            justify-center
                            text-[20px]
                            mt-4
                            px-7
                            rounded-full
                            text-white
                            font-bold
                            w-[90px]
                            h-[35px]
                            ${
                                item.type === "Found"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                            }
                        `}
                    >
                        {item.type}
                    </span>
                    <br />
                    <br />


                    {/* DESCRIPTION */}

                    <p className="mt-6 text-gray-700 text-lg">
                        {item.description}
                    </p>


                    <hr className="my-6" />


                    {/* CATEGORY */}

                    <p className="text-lg">
                        <strong>Category:</strong>{" "}
                        {item.category}
                    </p>


                    {/* LOCATION */}

                    <p className="text-lg mt-3">
                        <strong>Location:</strong>{" "}
                        {item.location}
                    </p>


                    {/* ITEM STATUS */}

                    <p className="text-lg mt-3">
                        <strong>Item Status:</strong>{" "}
                        {item.status}
                    </p>


                    {/* OWNER */}

                    <p className="text-lg mt-3">
                        <strong>Owner:</strong>{" "}
                        {item.owner?.name}
                    </p>


                    {/* EMAIL */}

                    <p className="text-lg mt-3">
                        <strong>Email:</strong>{" "}
                        {item.owner?.email}
                    </p>

                    <br/>
                    {/* ================================================= */}
                    {/* ACTION SECTION */}
                    {/* ================================================= */}

                    <div className="mt-8">


                        {/* FOUND ITEM */}

                       {item.type === "Found" && !isOwner && (
                        <div
                            className="
                                inline-flex
                                items-center
                                px-6
                                py-3
                                rounded-xl
                                bg-green-100
                                text-green-700
                                font-semibold
                            "
                        >
                            ✓ This item has been found
                        </div>
                    )}

                        {/* OWNER VIEW */}

                        {item.status !== "Claimed" &&
                            isOwner && (

                            <div
                                className="
                                    inline-flex
                                    items-center
                                    px-6
                                    py-3
                                    rounded-xl
                                    bg-purple-100
                                    text-purple-700
                                    font-semibold
                                "
                            >
                                This is your reported item
                            </div>

                        )}


                        {/* ============================================= */}
                        {/* CURRENT USER CLAIM STATUS */}
                        {/* ============================================= */}

                        {item.type === "Lost" &&
                            !isOwner &&
                            hasClaimed && (

                            <div
                                className={`
                                    max-w-md
                                    rounded-xl
                                    border
                                    px-6
                                    py-4

                                    ${
                                        claimStatus === "Approved"

                                            ? "bg-green-50 border-green-200"

                                            : claimStatus === "Rejected"

                                            ? "bg-red-50 border-red-200"

                                            : "bg-yellow-50 border-yellow-200"
                                    }
                                `}
                            >


                                {/* APPROVED */}

                                {claimStatus === "Approved" && (
                                    <>
                                        <p className="font-bold text-green-700 text-lg">
                                            ✓ Claim Approved
                                        </p>

                                        <p className="mt-2 text-gray-700">
                                            Status:{" "}

                                            <span className="font-bold text-green-700">
                                                Approved
                                            </span>
                                        </p>
                                    </>
                                )}


                                {/* REJECTED */}

                                {claimStatus === "Rejected" && (
                                    <>
                                        <p className="font-bold text-red-700 text-lg">
                                            ✕ Claim Rejected
                                        </p>

                                        <p className="mt-2 text-gray-700">
                                            Status:{" "}

                                            <span className="font-bold text-red-700">
                                                Rejected
                                            </span>
                                        </p>
                                    </>
                                )}


                                {/* PENDING */}

                                {claimStatus === "Pending" && (
                                    <>
                                        <p className="font-bold text-yellow-700 text-lg">
                                            Claim Submitted
                                        </p>

                                        <p className="mt-2 text-gray-700">
                                            Status:{" "}

                                            <span className="font-bold text-yellow-700">
                                                Pending
                                            </span>
                                        </p>
                                    </>
                                )}


                            </div>

                        )}


                        {/* ============================================= */}
                        {/* ITEM ALREADY CLAIMED BY ANOTHER USER */}
                        {/* ============================================= */}

                        {item.status === "Claimed" &&
                            !isOwner &&
                            !hasClaimed &&
                            item.status === "Claimed" && (

                            <div
                                className="
                                    inline-flex
                                    items-center
                                    px-6
                                    py-3
                                    rounded-xl
                                    bg-green-100
                                    text-green-700
                                    font-semibold
                                "
                            >
                                 ✓ This item has already been found
                            </div>

                        )}

                        
                        {/* ============================================= */}
                        {/* CLAIM BUTTON */}
                        {/* ============================================= */}
                        <br/>
                        {
                            item.status !== "Claimed" &&
                            !isOwner &&
                            !hasClaimed && (
                
                            <div className="mt-4">
                                <button
                                    onClick={() => {

                                        if (!user) {
                                            alert("Please login first.");
                                            return;
                                        }

                                        setShowModal(true);
                                    }}

                                    className="
                                        px-7
                                        py-3
                                        rounded-xl
                                        bg-violet-600
                                        hover:bg-violet-700
                                        text-white
                                        font-bold
                                        shadow-md
                                        transition
                                        min-w-[150px]
                                        h-[30px]
                                    "
                                >
                                    {item.type === "Lost"
                                        ? "Claim Item"
                                        : "This Is My Item"}
                                </button>
                            </div>
                        )}

                    </div>

                </div>

            </div>


            {/* ===================================================== */}
            {/* CLAIM MODAL */}
            {/* ===================================================== */}

            {showModal && (

                <div
                    className="
                        fixed
                        inset-0
                        bg-black/50
                        backdrop-blur-sm
                        flex
                        items-center
                        justify-center
                        z-50
                        px-5
                    "
                >

                    <div
                        className="
                            bg-white
                            w-full
                            max-w-[820px]
                            rounded-3xl
                            shadow-2xl
                            p-8
                        "
                    >


                        {/* MODAL HEADER */}

                        <div
                            className="
                                flex
                                justify-between
                                items-center
                                px-8
                                py-6
                            "
                        >

                            <div className="flex items-center gap-4">

                                <div
                                    className="
                                        w-14
                                        h-14
                                        rounded-full
                                        bg-violet-100
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >

                                    <ShieldCheckIcon
                                        className="
                                            w-8
                                            h-8
                                            text-violet-600
                                        "
                                    />

                                </div>

                                
                                <div>
                                    
                                    <h2 className="text-3xl font-bold text-gray-800">
                                        Claim Item
                                    </h2>

                                    <p className="text-gray-500 mt-1">
                                        Tell us why this item belongs to you.
                                    </p>

                                </div>

                            </div>


                            <button
                                onClick={() => {

                                    if (!claimLoading) {
                                        setShowModal(false);
                                    }

                                }}

                                disabled={claimLoading}

                                className="
                                    w-11
                                    h-11
                                    rounded-full
                                    bg-gray-100
                                    hover:bg-gray-200
                                    flex
                                    items-center
                                    justify-center
                                    transition
                                "
                            >

                                <XMarkIcon className="w-6 h-6 text-gray-600" />

                            </button>

                        </div>
                        <br/>
                        {/* MODAL BODY */}

                        <div className="px-10 py-6">

                            <label
                                className="
                                    block
                                    text-2xl
                                    font-semibold
                                    text-gray-700
                                    mb-4
                                    text-center
                                "
                            >
                                Claim Message
                            </label>
                                <textarea
                                    rows={8}
                                    maxLength={500}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Example: This wallet belongs to me. It contains my college ID, ATM card and other personal documents."
                                    className="
                                        w-full
                                        box-border
                                        rounded-2xl
                                        border
                                        border-gray-300
                                        pt-6
                                        px-5
                                        pb-5
                                        resize-none
                                        outline-none
                                        focus:ring-2
                                        focus:ring-violet-500
                                        focus:border-violet-200
                                        transition
                                    "
                                />
                            
                            <div className="flex justify-end mt-3">
                                <span className="text-sm text-gray-400">
                                    {message.length}/500
                                </span>
                            </div>

                        </div>


                        {/* MODAL FOOTER */}

                        <div
                            className="
                                px-8
                                py-5
                                flex
                                justify-end
                                items-center
                                gap-4
                            "
                        >

                            <button
                                onClick={() => {

                                    if (!claimLoading) {
                                        setShowModal(false);
                                    }

                                }}

                                disabled={claimLoading}

                                className="
                                    px-7
                                    py-3
                                    rounded-xl
                                    border
                                    border-gray-300
                                    text-gray-700
                                    hover:bg-gray-100
                                    font-medium
                                    transition
                                "
                            >
                                Cancel
                            </button>


                            <button
                                onClick={handleClaim}

                                disabled={
                                    claimLoading ||
                                    !message.trim()
                                }

                                className="
                                    min-w-[150px]
                                    h-[25px]
                                    px-7
                                    py-3
                                    rounded-xl
                                    bg-violet-600
                                    hover:bg-violet-700
                                    text-white
                                    font-semibold
                                    transition
                                    disabled:bg-violet-300
                                    disabled:cursor-not-allowed
                                "
                            >

                                {claimLoading
                                    ? "Submitting..."
                                    : "Submit Claim"
                                }

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </main>
    );
}


export default ItemDetails;