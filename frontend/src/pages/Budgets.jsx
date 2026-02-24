import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import BudgetForm from "../components/budget/BudgetForm";
import SpendingChart from "../components/charts/SpendingChart";

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBudget, setEditingBudget] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );
  const [progressData, setProgressData] = useState([]);

  const fetchBudgets = async () => {
    try {
      setLoading(true);

      // 1️⃣ Get all budgets
      const budgetRes = await apiClient.get("/budgets");
      const allBudgets = budgetRes.data.data || [];

      // 2️⃣ Filter only selected month
      const monthBudgets = allBudgets.filter((b) => b.month === selectedMonth);

      if (monthBudgets.length === 0) {
        setBudgets([]);
        return;
      }

      // 3️⃣ Fetch progress for selected month
      const progressRes = await apiClient.get(
        `/budgets/progress?month=${selectedMonth}`,
      );

      const progressData = progressRes.data.data || [];

      // 4️⃣ Create category lookup
      const progressMap = {};
      progressData.forEach((p) => {
        progressMap[p.category] = p;
      });

      // 5️⃣ Merge
      const merged = monthBudgets.map((b) => ({
        ...b,
        spent: progressMap[b.category]?.spent || 0,
        status: progressMap[b.category]?.status || "safe",
      }));

      setBudgets(merged);
    } catch (err) {
      console.error("Fetch failed:", err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, [selectedMonth]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this budget?")) {
      try {
        await apiClient.delete(`/budgets/${id}`);
        fetchBudgets();
      } catch (err) {
        alert("Delete failed.");
      }
    }
  };

  const getStatusStyle = (status) => {
    if (status === "exceeded") {
      return { color: "#dc2626", bg: "#fef2f2", label: "Exceeded" };
    }
    if (status === "warning") {
      return { color: "#d97706", bg: "#fffbeb", label: "Warning" };
    }
    return { color: "#059669", bg: "#ecfdf5", label: "Safe" };
  };

  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Budgets</h1>

      {/* 🔥 Month Selector */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "600", marginRight: "10px" }}>
          Select Month:
        </label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>

      {/* 🔥 Spending Chart */}
      <SpendingChart progress={progressData} month={selectedMonth} />

      {/* 🔥 Budget Form */}
      <BudgetForm
        onBudgetAdded={fetchBudgets}
        onBudgetUpdated={fetchBudgets}
        editData={editingBudget}
        clearEdit={() => setEditingBudget(null)}
      />

      {/* 🔥 Table */}
      <div
        style={{
          marginTop: "32px",
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        <table width="100%" style={{ borderCollapse: "collapse" }}>
          <thead style={{ background: "#f9fafb", fontSize: "12px" }}>
            <tr>
              <th align="left" style={{ padding: "16px" }}>
                Category
              </th>
              <th align="left" style={{ padding: "16px" }}>
                Limit
              </th>
              <th align="left" style={{ padding: "16px" }}>
                Spent
              </th>
              <th align="left" style={{ padding: "16px" }}>
                Status
              </th>
              <th align="right" style={{ padding: "16px" }}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  style={{ padding: "20px", textAlign: "center" }}
                >
                  Loading...
                </td>
              </tr>
            ) : budgets.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={{ padding: "20px", textAlign: "center" }}
                >
                  No budgets found for this month.
                </td>
              </tr>
            ) : (
              budgets.map((b) => {
                const style = getStatusStyle(b.status);

                return (
                  <tr key={b._id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "16px", fontWeight: "600" }}>
                      {b.category}
                    </td>
                    <td style={{ padding: "16px" }}>₹{b.limit}</td>
                    <td style={{ padding: "16px" }}>₹{b.spent}</td>
                    <td style={{ padding: "16px" }}>
                      <span
                        style={{
                          background: style.bg,
                          color: style.color,
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {style.label}
                      </span>
                    </td>
                    <td align="right" style={{ padding: "16px" }}>
                      <button
                        onClick={() => setEditingBudget(b)}
                        style={{
                          color: "#2563eb",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          marginRight: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(b._id)}
                        style={{
                          color: "#dc2626",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
