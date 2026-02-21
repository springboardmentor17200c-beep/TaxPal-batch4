import { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";

export default function BudgetForm({ onBudgetAdded, onBudgetUpdated, editData, clearEdit }) {
  const [formData, setFormData] = useState({
    category: "",
    limit: "",
    month: "",
    description: "",
  });

 
  useEffect(() => {
    if (editData) {
      setFormData({
        category: editData.category,
        limit: editData.limit,
        month: editData.month,
        description: editData.description || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleReset = () => {
    setFormData({ category: "", limit: "", month: "", description: "" });
    if (editData) clearEdit();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        // UPDATE logic
        const res = await apiClient.put(`/budgets/${editData._id}`, formData);
        onBudgetUpdated(res.data.data);
      } else {
        // CREATE logic
        const res = await apiClient.post("/budgets", formData);
        onBudgetAdded(res.data.data);
      }
      handleReset();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>{editData ? "Update Budget" : "Create New Budget"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="budget-form-grid">
          <div className="form-group">
            <label className="form-label">Category</label>
            <select name="category" className="form-input" value={formData.category} onChange={handleChange} required>
              <option value="">Select a category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Utilities">Utilities</option>
              <option value="Shopping">Shopping</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Budget Amount</label>
            <input type="number" name="limit" className="form-input" value={formData.limit} onChange={handleChange} required placeholder="$ 0.00" />
          </div>
        </div>

        <div className="form-group" style={{ width: "48.5%" }}>
          <label className="form-label">Month</label>
          <input type="month" name="month" className="form-input" value={formData.month} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="form-label">Description (Optional)</label>
          <textarea name="description" className="form-input" style={{ minHeight: "80px" }} value={formData.description} onChange={handleChange} placeholder="Add any additional details..." />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <button type="button" className="btn-secondary" onClick={handleReset} style={{ padding: "10px 20px", borderRadius: "6px", border: "1px solid #ddd", background: "#fff", cursor: "pointer" }}>Cancel</button>
          <button type="submit" style={{ padding: "10px 40px", borderRadius: "6px", border: "none", background: "#2563eb", color: "#fff", fontWeight: "bold", cursor: "pointer", flexGrow: editData ? 0 : 1 }}>
            {editData ? "Update Budget" : "Create Budget"}
          </button>
        </div>
      </form>
    </div>
  );
}