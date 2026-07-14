import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

function Profile() {
    const { user, loading } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        joined: "",
    });

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // ======================================================
    // LOAD LOGGED-IN USER DATA
    // ======================================================

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                role: user.role || "User",

                joined: user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                      })
                    : "",
            });
        }
    }, [user]);

    // ======================================================
    // GET USER INITIALS
    // ======================================================

    const getInitials = (name) => {
        if (!name) {
            return "U";
        }

        return name
            .trim()
            .split(/\s+/)
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    // ======================================================
    // HANDLE PROFILE INPUT CHANGE
    // ======================================================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ======================================================
    // HANDLE PASSWORD INPUT CHANGE
    // ======================================================

    const handlePasswordChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value,
        });
    };

    // ======================================================
    // HANDLE PROFILE SUBMIT
    // ======================================================

    const handleProfileSubmit = (e) => {
        e.preventDefault();

        const confirmUpdate = window.confirm(
            "Are you sure you want to save these changes?"
        );

        if (!confirmUpdate) {
            return;
        }

        console.log("PROFILE DATA:", formData);
        console.log("PASSWORD DATA:", password);

        alert("Profile Updated Successfully!");
    };

    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f3f4f6",
                }}
            >
                <p className="text-xl font-semibold">
                    Loading Profile...
                </p>
            </div>
        );
    }

    // ======================================================
    // USER NOT FOUND
    // ======================================================

    if (!user) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f3f4f6",
                }}
            >
                <p className="text-xl font-semibold">
                    User not found.
                </p>
            </div>
        );
    }

    // ======================================================
    // PROFILE PAGE
    // ======================================================

    return (
        <div
            style={{
                width: "100%",
                minHeight: "100vh",
                backgroundColor: "#f3f4f6",
                boxSizing: "border-box",
            }}
        >
            {/* ======================================================
                PROFILE CARD CENTER WRAPPER
            ====================================================== */}

            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    boxSizing: "border-box",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                }}
            >
                {/* ======================================================
                    PROFILE CARD
                ====================================================== */}

                <div
                    style={{
                        width: "700px",
                        maxWidth: "100%",
                        backgroundColor: "#ffffff",
                        borderRadius: "24px",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.10)",
                        padding: "48px",
                        boxSizing: "border-box",
                    }}
                >
                    {/* ======================================================
                        PROFILE HEADER
                    ====================================================== */}

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                        }}
                    >
                        {/* AVATAR */}

                        <div
                            style={{
                                width: "140px",
                                height: "140px",
                                borderRadius: "50%",
                                background:
                                    "linear-gradient(to right, #9333ea, #ec4899)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontSize: "36px",
                                fontWeight: "bold",
                                border: "4px solid #e9d5ff",
                                boxShadow:
                                    "0 4px 10px rgba(0, 0, 0, 0.15)",
                            }}
                        >
                            {getInitials(formData.name)}
                        </div>

                        {/* USER NAME */}

                        <h1
                            style={{
                                marginTop: "20px",
                                fontSize: "30px",
                                fontWeight: "bold",
                                color: "#111827",
                            }}
                        >
                            {formData.name}
                        </h1>

                        {/* USER EMAIL */}

                        <p
                            style={{
                                marginTop: "4px",
                                color: "#6b7280",
                            }}
                        >
                            {formData.email}
                        </p>
                    </div>

                    {/* ======================================================
                        PROFILE FORM
                    ====================================================== */}

                    <form
                        onSubmit={handleProfileSubmit}
                        style={{
                            marginTop: "48px",
                        }}
                    >
                        {/* ======================================================
                            ACCOUNT
                        ====================================================== */}

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Account
                            </h2>

                            <div className="space-y-6">
                                {/* NAME */}

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="
                                            w-full
                                            border
                                            border-gray-300
                                            rounded-xl
                                            px-4
                                            py-3
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-purple-500
                                        "
                                    />
                                </div>

                                {/* PHONE */}

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        Phone
                                    </label>

                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="
                                            w-full
                                            border
                                            border-gray-300
                                            rounded-xl
                                            px-4
                                            py-3
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-purple-500
                                        "
                                    />
                                </div>

                                {/* EMAIL */}

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        value={formData.email}
                                        disabled
                                        className="
                                            w-full
                                            bg-gray-100
                                            border
                                            border-gray-300
                                            rounded-xl
                                            px-4
                                            py-3
                                            text-gray-500
                                            cursor-not-allowed
                                        "
                                    />
                                </div>
                            </div>
                        </section>

                        {/* DIVIDER */}

                        <hr className="my-10 border-gray-200" />

                        {/* ======================================================
                            ADDITIONAL INFORMATION
                        ====================================================== */}

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Additional Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* ROLE */}

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        Role
                                    </label>

                                    <input
                                        value={formData.role}
                                        disabled
                                        className="
                                            w-full
                                            bg-gray-100
                                            border
                                            border-gray-300
                                            rounded-xl
                                            px-4
                                            py-3
                                            text-gray-500
                                            cursor-not-allowed
                                        "
                                    />
                                </div>

                                {/* JOINED */}

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        Joined
                                    </label>

                                    <input
                                        value={formData.joined}
                                        disabled
                                        className="
                                            w-full
                                            bg-gray-100
                                            border
                                            border-gray-300
                                            rounded-xl
                                            px-4
                                            py-3
                                            text-gray-500
                                            cursor-not-allowed
                                        "
                                    />
                                </div>
                            </div>
                        </section>

                        {/* DIVIDER */}

                        <hr className="my-10 border-gray-200" />

                        {/* ======================================================
                            SECURITY
                        ====================================================== */}

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Security
                            </h2>

                            <div className="space-y-6">
                                {/* CURRENT PASSWORD */}

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        Current Password
                                    </label>

                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={password.currentPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter current password"
                                        className="
                                            w-full
                                            border
                                            border-gray-300
                                            rounded-xl
                                            px-4
                                            py-3
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-purple-500
                                        "
                                    />
                                </div>

                                {/* NEW PASSWORD */}

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        New Password
                                    </label>

                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={password.newPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter new password"
                                        className="
                                            w-full
                                            border
                                            border-gray-300
                                            rounded-xl
                                            px-4
                                            py-3
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-purple-500
                                        "
                                    />
                                </div>

                                {/* CONFIRM PASSWORD */}

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={password.confirmPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Confirm new password"
                                        className="
                                            w-full
                                            border
                                            border-gray-300
                                            rounded-xl
                                            px-4
                                            py-3
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-purple-500
                                        "
                                    />
                                </div>
                            </div>
                        </section>

                        {/* ======================================================
                            SAVE BUTTON
                        ====================================================== */}
                        <br/>
                        <div className="mt-10">
                            <button
                                type="submit"
                                className="
                                    w-full
                                    min-h-[52px]
                                    bg-gradient-to-r
                                    from-purple-600
                                    to-pink-500
                                    hover:opacity-90
                                    text-white
                                    text-lg
                                    font-semibold
                                    px-6
                                    py-3
                                    rounded-xl
                                    shadow-md
                                    transition
                                    duration-300
                                "
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;