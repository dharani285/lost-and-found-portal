import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user on page refresh
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await api.get("/auth/profile");
                setUser(res.data.user);
            } catch (error) {
                console.error(error);
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    // Login
    const login = async (email, password) => {
        const res = await api.post("/auth/login", {
            email,
            password,
        });

        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);

        return res.data;
    };

    // Register
    const register = async (formData) => {
        const res = await api.post("/auth/register", formData);

        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);

        return res.data;
    };

    // Logout
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                isAuthenticated: !!user,
                isAdmin: user?.role === "admin",
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};