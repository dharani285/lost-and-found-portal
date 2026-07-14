import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function AdminRoute({ children }) {
    const { user, loading } = useAuth();

    // Wait until authentication data is loaded
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl font-semibold">
                    Loading...
                </p>
            </div>
        );
    }

    // If user is not logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If logged-in user is not admin, redirect to home
    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    // User is admin, allow access
    return children;
}

export default AdminRoute;