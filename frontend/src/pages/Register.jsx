import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await register({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            });

            alert("Registration Successful");

            navigate("/");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-[90%] max-w-md bg-white rounded-2xl shadow-2xl py-10">
                <br />
                <h1 className="text-5xl font-bold text-center mb-10">
                    Register
                </h1>
                <br />
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-5"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder=" Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-[80%] h-12 px-4 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder=" Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-[80%] h-12 px-4 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder=" Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-[80%] h-12 px-4 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder=" Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-[80%] h-12 px-4 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder=" Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-[80%] h-12 px-4 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-[80%] h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition"
                    >
                        Register
                    </button>
                <br />
                </form>

                <p className="text-center mt-8 text-gray-600">
                    Already have an account?
                    <span
                        className="ml-2 text-blue-600 font-bold cursor-pointer hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>

            </div>

        </div>
    );
}

export default Register;