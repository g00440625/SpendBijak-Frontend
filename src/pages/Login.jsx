import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                { email, password }
            );
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userId', response.data.userId)
            navigate("/dashboard");
        } catch (error) {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-sm border border-gray-100">

                <h1 className="text-2xl font-bold text-center text-emerald-600">
                    SpendBijak
                </h1>

                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                    type="text"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-4 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />

                <label className="block text-sm text-gray-600 mb-1">Password</label>
                <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-4 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />

                {error ? <p>{error}</p> : null}

                <button
                    onClick={handleLogin}
                    className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                    Login
                </button>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-emerald-600 font-medium hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );

}

export default Login;