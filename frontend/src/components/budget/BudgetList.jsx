import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import BudgetCard from "./BudgetCard";


export default function BudgetList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await apiClient.get("/budgets/progress");
        const data = res?.data?.data ?? res?.data ?? [];
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load budget progress", err);
        setError(
          err?.response?.data?.message ??
            "Failed to load budget progress. Please try again."
        );
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="budget-list">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">
          Budget Progress
        </h2>
        <p className="text-slate-500">Loading budget progress...</p>
      </div>
    );
  }

  return (
    <div className="budget-list">
      <h2 className="mb-4 text-xl font-semibold text-slate-800">
        Budget Progress
      </h2>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {items.length === 0 && !error ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600">
          <p>No budgets set yet. Set monthly limits for your categories.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <BudgetCard
              key={item?.id ?? item?.category ?? Math.random()}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}
