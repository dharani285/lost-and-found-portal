import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";


const AdminLayout = () => {

    return (

        <div
            className="
                min-h-screen
                bg-gray-50
                flex
            "
        >

            {/* ADMIN SIDEBAR */}

            <AdminSidebar />


            {/* ADMIN PAGE CONTENT */}

            <main
                className="
                    flex-1
                    min-w-0
                    overflow-x-hidden
                "
            >

                <Outlet />

            </main>

        </div>

    );

};

export default AdminLayout;