import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import BudgetForm from "../components/budget/BudgetForm";

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBudget, setEditingBudget] = useState(null);

  const currentMonth = new Date().toISOString().slice(0, 7);

  const fetchBudgets = async () => {
    try {
      setLoading(true);

      const budgetRes = await apiClient.get("/budgets");
      const budgetData = budgetRes.data.data || [];

      if (budgetData.length === 0) {
        setBudgets([]);
        return;
      }

      // Extract unique months
      const uniqueMonths = [...new Set(budgetData.map((b) => b.month))];

      // Fetch progress for each month
      const progressResponses = await Promise.all(
        uniqueMonths.map((month) =>
          apiClient.get(`/budgets/progress?month=${month}`),
        ),
      );

      // Merge all progress into single array
      const allProgress = progressResponses.flatMap(
        (res) => res.data.data || [],
      );

      // Create lookup map: category + month
      const progressMap = {};
      allProgress.forEach((p) => {
        progressMap[`${p.category}-${p.month}`] = p;
      });

      const merged = budgetData.map((b) => {
        const key = `${b.category}-${b.month}`;
        const progress = progressMap[key];

        return {
          ...b,
          spent: progress?.spent || 0,
          status: progress?.status || "safe",
        };
      });

      setBudgets(merged);
    } catch (err) {
      console.error("Fetch failed:", err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

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

      <BudgetForm
        onBudgetAdded={() => fetchBudgets()}
        onBudgetUpdated={() => fetchBudgets()}
        editData={editingBudget}
        clearEdit={() => setEditingBudget(null)}
      />

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
                  No budgets found.
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
