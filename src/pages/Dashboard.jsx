import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {

  // AUTHENTICATION
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // SUMMARY 
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalSpent: 0,
    remaining: 0
  });

  // EXPENSES
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseCategory, setExpenseCategory] = useState("");

  // DECISION
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [purchaseCategory, setPurchaseCategory] = useState("");
  const [decision, setDecision] = useState(null);

  // Fetch summary data when the page loads
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/summary/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSummary(response.data);
      } catch (error) {
        console.error("Failed to load summary:", error);
      }
    };
    fetchSummary();
  }, []);

  // Add expense handler
  const handleAddExpense = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/expenses", {
        amount: Number(expenseAmount),
        category: expenseCategory,
        date: new Date().toISOString().slice(0, 10),
        user: { id: Number(userId) }
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert("Expense saved!");
      window.location.reload();
    } catch (error) {
      alert("Failed: " + error);
    }
  };
  // Decision handler
  const handleDecision = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/decision/user/${userId}`, {
        purchaseAmount: Number(purchaseAmount),
        category: purchaseCategory
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDecision(response.data);
    } catch (error) {
      console.error("Failed to get decision:", error);
    }
  };

  // Log out handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  // UI
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-sm border border-gray-100">

        <h1 className="text-2xl font-bold text-emerald-600">
          SpendBijak
        </h1>

        <button className="text-sm text-gray-500 hover:text-red-500" onClick={handleLogout}>
          Log Out
        </button>

        {/* ===== SUMMARY CARDS ===== */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Income</p>
            <p>  €{summary.totalIncome}</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Expenses</p>
            <p> €{summary.totalSpent}</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Remaining</p>
            <p> €{summary.remaining}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
        </div>

        {/* ===== ADD EXPENSE ===== */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <p className="text-sm text-gray-400 mb-4 text-center">
            ── Add Expense ──
          </p>
          <label className="block text-sm text-gray-600 mb-1">Amount</label>
          <input
            type="number"
            placeholder="0.00"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <label className="block text-sm text-gray-600 mb-1">Category</label>
          <input
            type="text"
            placeholder="food, transport, entertainment"
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-4 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={handleAddExpense}
            className="w-full bg-red-500 text-white py-2 rounded-lg text-sm font-medium
                       hover:bg-red-600 transition-colors"
          >
            Add Expense
          </button>
        </div>

        {/* ===== DECISION MAKER ===== */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <p className="text-sm text-gray-400 mb-4 text-center">
            ── Should I Buy This? ──
          </p>
          <label className="block text-sm text-gray-600 mb-1">Purchase Amount</label>
          <input
            type="number"
            placeholder="0.00"
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <label className="block text-sm text-gray-600 mb-1">Category</label>
          <input
            type="text"
            placeholder="electronics, clothing, travel"
            value={purchaseCategory}
            onChange={(e) => setPurchaseCategory(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-4 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={handleDecision}
            className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium
                       hover:bg-emerald-700 transition-colors"
          >
            Check
          </button>
        </div>

        {/* ===== DECISION RESULT ===== */}
        {decision && (
          <div className={`p-4 rounded-lg shadow-sm mb-6 ${decision.verdict === "SAFE" ? "bg-green-50 border border-green-200" :
            decision.verdict === "MODERATE" ? "bg-yellow-50 border border-yellow-200" :
              "bg-red-50 border border-red-200"
            }`}>
            <p className={`text-lg font-bold mb-2 ${decision.verdict === "SAFE" ? "text-green-600" :
              decision.verdict === "MODERATE" ? "text-yellow-600" :
                "text-red-600"
              }`}>
              {decision.verdict === "SAFE" ? "✅" :
                decision.verdict === "MODERATE" ? "⚠️" : "🔴"}{" "}
              {decision.verdict}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Remaining After: €{decision.remainingAfter}
            </p>
            <p className="text-sm text-gray-600">
              {decision.reason}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;