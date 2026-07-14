import api from "./api";

// Get all items
export const getAllItems = async (
    search = "",
    category = "",
    type = "",
    sort = "",
    page = 1,
    limit = 5
) => {
    const response = await api.get("/items", {
        params: {
            keyword: search,
            category,
            type,
            sort,
            page,
            limit,
        },
    });

    return response.data;
};

// Get one item
export const getItemById = async (id) => {

    const response = await api.get(`/items/${id}`);

    return response.data;
};

// Create Item
export const createItem = async (formData) => {

    const response = await api.post(
        "/items/create",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};
// Get My Items
export const getMyItems = async () => {

    const response = await api.get("/items/my-items");

    return response.data;

};
// Delete Item
export const deleteItem = async (id) => {

    const response = await api.delete(`/items/${id}`);

    return response.data;

};
export const updateItem = async (id, formData) => {
    const response = await api.put(
        `/items/${id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};