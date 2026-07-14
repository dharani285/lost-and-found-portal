import axios from "axios";

const API = "http://localhost:5000/api/users";

export const getProfile = async (token) => {
    const response = await axios.get(`${API}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const updateProfile = async (data, token) => {
    const response = await axios.put(`${API}/profile`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const changePassword = async (data, token) => {
    const response = await axios.put(
        `${API}/change-password`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};