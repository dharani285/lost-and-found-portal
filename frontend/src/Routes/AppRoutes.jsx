import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ItemDetails from "../pages/ItemDetails";
import CreateItem from "../pages/CreateItem";
import MyItems from "../pages/MyItems";
import EditItem from "../pages/EditItem";
import Profile from "../pages/Profile";
import MyClaims from "../pages/MyClaims";
import ReceivedClaims from "../pages/ReceivedClaims";
import LostItems from "../pages/LostItems";
import FoundItems from "../pages/FoundItems";
import Notifications from "../pages/Notifications";
import Dashboard from "../pages/Dashboard";


// ======================================================
// ADMIN IMPORTS
// ======================================================

import AdminDashboard from "../pages/admin/AdminDashboard";

import ManageUsers from "../pages/admin/ManageUsers";

import ManageItems from "../pages/admin/ManageItems";

import ManageClaims from "../pages/admin/ManageClaims";

import AdminRoute from "../components/AdminRoute";

import AdminLayout from "../components/AdminLayout";


function AppRoutes() {

    return (

        <Routes>


            {/* ======================================================
                NORMAL ROUTES
            ====================================================== */}

            <Route
                path="/"
                element={<Home />}
            />


            <Route
                path="/login"
                element={<Login />}
            />


            <Route
                path="/register"
                element={<Register />}
            />


            <Route
                path="/item/:id"
                element={<ItemDetails />}
            />


            <Route
                path="/report-lost"
                element={<CreateItem />}
            />


            <Route
                path="/report-found"
                element={<CreateItem />}
            />


            <Route
                path="/my-items"
                element={<MyItems />}
            />


            <Route
                path="/edit-item/:id"
                element={<EditItem />}
            />


            <Route
                path="/profile"
                element={<Profile />}
            />


            <Route
                path="/my-claims"
                element={<MyClaims />}
            />


            <Route
                path="/received-claims"
                element={<ReceivedClaims />}
            />


            <Route
                path="/lost-items"
                element={<LostItems />}
            />


            <Route
                path="/found-items"
                element={<FoundItems />}
            />


            <Route
                path="/notifications"
                element={<Notifications />}
            />


            <Route
                path="/dashboard"
                element={<Dashboard />}
            />



            {/* ======================================================
                ADMIN ROUTES
            ====================================================== */}

            <Route
                element={
                    <AdminRoute>
                        <AdminLayout />
                    </AdminRoute>
                }
            >


                {/* ADMIN DASHBOARD */}

                <Route
                    path="/admin/dashboard"
                    element={<AdminDashboard />}
                />


                {/* MANAGE USERS */}

                <Route
                    path="/admin/users"
                    element={<ManageUsers />}
                />


                {/* MANAGE ITEMS */}

                <Route
                    path="/admin/items"
                    element={<ManageItems />}
                />


                {/* MANAGE CLAIMS */}

                <Route
                    path="/admin/claims"
                    element={<ManageClaims />}
                />


            </Route>


        </Routes>

    );

}

export default AppRoutes;