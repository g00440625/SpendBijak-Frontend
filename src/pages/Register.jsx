import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [savings, setSavings] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        { name, email, password, monthlySalary, savings, monthlyBudget }
      );
      navigate("/login");
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-sm border border-gray-100">

        <h1 className="text-2xl font-bold text-center text-emerald-600">
          SpendBijak
        </h1>

        <label className="block text-sm text-gray-600 mb-1">Name</label>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-4 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />

        <label className="block text-sm text-gray-600 mb-1">Email</label>
        <input
          type="email"
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

        <p className="text-sm text-gray-400 mt-6 mb-4 text-center">
          ── Financial Details ──
        </p>

        <label className="block text-sm text-gray-600 mb-1">Monthly Salary</label>
        <input
          type="number"
          placeholder="0.00"
          value={monthlySalary}
          onChange={(e) => setMonthlySalary(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-4 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />

        <label className="block text-sm text-gray-600 mb-1">Savings</label>
        <input
          type="number"
          placeholder="0.00"
          value={savings}
          onChange={(e) => setSavings(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-4 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />

        <label className="block text-sm text-gray-600 mb-1">Monthly Budget</label>
        <input
          type="number"
          placeholder="0.00"
          value={monthlyBudget}
          onChange={(e) => setMonthlyBudget(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-4 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />

        {error ? <p>{error}</p> : null}

        <button
          onClick={handleRegister}
          className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );

}

export default Register;