import api from "./api";


// ======================================================
// GET ADMIN DASHBOARD STATISTICS
// GET /api/admin/dashboard
// ======================================================

export const getAdminDashboardStats = async () => {

    const response = await api.get(
        "/admin/dashboard"
    );

    return response.data;

};


// ======================================================
// GET ALL USERS
// GET /api/admin/users
// ======================================================

export const getAllUsersAdmin = async () => {

    const response = await api.get(
        "/admin/users"
    );

    return response.data;

};


// ======================================================
// DELETE USER
// DELETE /api/admin/users/:id
// ======================================================

export const deleteUserAdmin = async (id) => {

    const response = await api.delete(
        `/admin/users/${id}`
    );

    return response.data;

};


// ======================================================
// GET ALL ITEMS
// GET /api/admin/items
// ======================================================

export const getAllItemsAdmin = async () => {

    const response = await api.get(
        "/admin/items"
    );

    return response.data;

};


// ======================================================
// DELETE ITEM
// DELETE /api/admin/items/:id
// ======================================================

export const deleteItemAdmin = async (id) => {

    const response = await api.delete(
        `/admin/items/${id}`
    );

    return response.data;

};


// ======================================================
// GET ALL CLAIMS
// GET /api/admin/claims
// ======================================================

export const getAllClaimsAdmin = async () => {

    const response = await api.get(
        "/admin/claims"
    );

    return response.data;

};


// ======================================================
// UPDATE CLAIM STATUS
// PUT /api/admin/claims/:id
// ======================================================

export const updateClaimStatusAdmin = async (
    id,
    status
) => {

    const response = await api.put(

        `/admin/claims/${id}`,

        {
            status,
        }

    );

    return response.data;

};


// ======================================================
// EXPORT USERS TO EXCEL
// GET /api/admin/export/users
// ======================================================

export const exportUsersExcel = async () => {

    const response = await api.get(

        "/admin/export/users",

        {
            responseType: "blob",
        }

    );


    // Create file URL

    const url = window.URL.createObjectURL(

        new Blob([response.data])

    );


    // Create temporary download link

    const link = document.createElement("a");


    link.href = url;


    link.setAttribute(
        "download",
        "users.xlsx"
    );


    // Add link to document

    document.body.appendChild(link);


    // Download file

    link.click();


    // Remove temporary link

    link.remove();


    // Free memory

    window.URL.revokeObjectURL(url);

};