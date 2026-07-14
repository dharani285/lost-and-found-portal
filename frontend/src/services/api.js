import axios from "axios";

const api = axios.create({
    baseURL:"https://lost-and-found-portal-gksz.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});


// Automatically attach JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;