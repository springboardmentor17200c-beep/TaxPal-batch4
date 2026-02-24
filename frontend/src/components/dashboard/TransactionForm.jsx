import { useState } from "react";
import apiClient from "../../api/apiClient";


const TransactionForm = ({ type = "income", onSuccess, useMock = false }) => {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    date: new Date().toISOString().slice(0, 10), 
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isIncome = type === "income";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (!form.amount || !form.category || !form.date) {
        setError("All fields are required.");
        return;
      }

      const payload = {
        type,
        amount: Number(form.amount),
        category: form.category.trim(),
        date: form.date, 
      };

      let created;

      if (useMock) {
        created = {
          _id: Date.now().toString(),
          ...payload,
          createdAt: new Date(payload.date).toISOString(),
        };
        await new Promise((res) => setTimeout(res, 300));
      } else {

        const res = await apiClient.post("/transactions", payload);
        created = res?.data?.data ?? null;
      }

      setForm({
        amount: "",
        category: "",
        date: new Date().toISOString().slice(0, 10),
      });

      if (typeof onSuccess === "function" && created) {
        onSuccess(created);
      }
    } catch (err) {
      console.error("Failed to submit transaction", err);
      setError(
        err?.response?.data?.message ||
          "Failed to submit transaction. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h3 className="transaction-form__title">
        {isIncome ? "Add Income" : "Add Expense"}
      </h3>

      {error && <p className="transaction-form__error">{error}</p>}

      <div className="transaction-form__field">
        <label htmlFor={`${type}-amount`}>Amount</label>
        <input
          id={`${type}-amount`}
          name="amount"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={form.amount}
          onChange={handleChange}
          disabled={submitting}
          required
        />
      </div>

      <div className="transaction-form__field">
        <label htmlFor={`${type}-category`}>Category</label>
        <input
          id={`${type}-category`}
          name="category"
          type="text"
          placeholder={
            isIncome ? "e.g. Salary, Bonus" : "e.g. Food, Transport"
          }
          value={form.category}
          onChange={handleChange}
          disabled={submitting}
          required
        />
      </div>

      <div className="transaction-form__field">
        <label htmlFor={`${type}-date`}>Date</label>
        <input
          id={`${type}-date`}
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          disabled={submitting}
          required
        />
      </div>

      <button
        className={`transaction-form__submit ${
          isIncome ? "income-btn" : "expense-btn"
        }`}
        type="submit"
        disabled={submitting}
      >
        {submitting
          ? isIncome
            ? "Adding Income..."
            : "Adding Expense..."
          : isIncome
            ? "+ Add Income"
            : "+ Add Expense"}
      </button>
    </form>
  );
};

export default TransactionForm;
