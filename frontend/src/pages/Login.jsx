import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(formData.email, formData.password);

            alert("Login Successful");
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white w-[420px] rounded-2xl shadow-2xl py-10">
                <br />
                <h1 className="text-5xl font-bold text-center mb-10">
                    Lost & Found
                </h1>
                <br />
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-8"
                >

                    <input
                        type="email"
                        name="email"
                        placeholder=" Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-[80%] h-12 px-4 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder=" Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-[80%] h-12 px-4 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-[80%] h-12 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl transition-all duration-300"
                    >
                        Login
                    </button>
                    <br />
                </form>

                <p className="text-center mt-8 text-gray-600">
                    Don't have an account?
                    <span
                        className="ml-2 text-blue-600 font-semibold cursor-pointer hover:underline"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>

            </div>

        </div>
    );
}

export default Login;