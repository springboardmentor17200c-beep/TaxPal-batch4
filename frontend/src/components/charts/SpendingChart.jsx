import { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import apiClient from "../../api/apiClient";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#8b5cf6"];

export default function SpendingChart({ month }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedMonth = month || new Date().toISOString().slice(0, 7);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await apiClient.get(
        `/budgets/progress?month=${selectedMonth}`,
      );

      const progress = res.data.data || [];

      // Only include categories with spent > 0
      const chartData = progress
        .filter((item) => item.spent > 0)
        .map((item) => ({
          name: item.category,
          value: item.spent,
        }));

      setData(chartData);
    } catch (err) {
      console.error("Chart fetch failed:", err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading chart...</div>;
  }

  if (data.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        No spending data available.
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        marginTop: "30px",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>
        Spending Breakdown ({selectedMonth})
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
