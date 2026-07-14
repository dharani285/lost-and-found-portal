import api from "./api";


// ======================================================
// CREATE CLAIM
// POST /api/claims
// ======================================================

export const createClaim = async (data) => {

    const response = await api.post(
        "/claims",
        data
    );

    return response.data;
};


// ======================================================
// GET MY CLAIMS
// GET /api/claims/my-claims
// ======================================================

export const getMyClaims = async () => {

    const response = await api.get(
        "/claims/my-claims"
    );

    return response.data;
};


// ======================================================
// GET RECEIVED CLAIMS
// GET /api/claims/received
// ======================================================

export const getReceivedClaims = async () => {

    const response = await api.get(
        "/claims/received"
    );

    return response.data;
};


// ======================================================
// UPDATE CLAIM STATUS
// PUT /api/claims/:id/status
// ======================================================

export const updateClaimStatus = async (
    claimId,
    status
) => {

    console.log(
        "CLAIM SERVICE - CLAIM ID:",
        claimId
    );

    console.log(
        "CLAIM SERVICE - STATUS:",
        status
    );


    const response = await api.put(

        `/claims/${claimId}/status`,

        {
            status: status,
        }

    );


    console.log(
        "CLAIM SERVICE - RESPONSE:",
        response.data
    );


    return response.data;
};


// ======================================================
// CHECK EXISTING CLAIM
// GET /api/claims/check/:itemId
// ======================================================

export const checkExistingClaim = async (
    itemId
) => {

    const response = await api.get(
        `/claims/check/${itemId}`
    );

    return response.data;
};