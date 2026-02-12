import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [incomeForm, setIncomeForm] = useState({ amount: "", category: "" });
  const [expenseForm, setExpenseForm] = useState({ amount: "", category: "" });
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      const response = await fetch("http://localhost:5000/api/transactions", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }
    } catch (err) {
      console.error("Failed to fetch transactions");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleIncomeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/transactions/income", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incomeForm),
      });

      if (response.ok) {
        setIncomeForm({ amount: "", category: "" });
        setShowIncomeModal(false);
        fetchTransactions();
      }
    } catch (err) {
      console.error("Failed to add income");
    } finally {
      setLoading(false);
    }
  };

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/transactions/expense", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseForm),
      });

      if (response.ok) {
        setExpenseForm({ amount: "", category: "" });
        setShowExpenseModal(false);
        fetchTransactions();
      }
    } catch (err) {
      console.error("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card income">
          <h3>Total Income</h3>
          <span className="stat-amount">${totalIncome.toFixed(2)}</span>
        </div>
        <div className="stat-card expense">
          <h3>Total Expense</h3>
          <span className="stat-amount">${totalExpense.toFixed(2)}</span>
        </div>
        <div className="stat-card balance">
          <h3>Balance</h3>
          <span className="stat-amount balance-amount">
            {balance >= 0 ? `$${balance.toFixed(2)}` : `-$${Math.abs(balance).toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button 
          className="action-btn income-btn"
          onClick={() => setShowIncomeModal(true)}
        >
          + Add Income
        </button>
        <button 
          className="action-btn expense-btn"
          onClick={() => setShowExpenseModal(true)}
        >
          + Add Expense
        </button>
      </div>

      {/* Transactions List */}
      <div className="transactions-section">
        <h2>List of Transactions</h2>
        {transactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions yet. Add your first income or expense!</p>
          </div>
        ) : (
          <div className="transactions-list">
            {transactions.map((transaction) => (
              <div key={transaction._id} className={`transaction-item ${transaction.type}`}>
                <div className="transaction-info">
                  <span className="category">{transaction.category}</span>
                  <span className="date">{new Date(transaction.createdAt).toLocaleDateString()}</span>
                </div>
                <span className="amount">${parseFloat(transaction.amount).toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Income Modal */}
      {showIncomeModal && (
        <div className="modal-overlay" onClick={() => setShowIncomeModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add Income</h3>
            <form onSubmit={handleIncomeSubmit}>
              <input
                type="number"
                placeholder="Amount"
                value={incomeForm.amount}
                onChange={(e) => setIncomeForm({...incomeForm, amount: e.target.value})}
                step="0.01"
                min="0"
                required
                disabled={loading}
              />
              <input
                type="text"
                placeholder="Category (e.g., Salary, Bonus)"
                value={incomeForm.category}
                onChange={(e) => setIncomeForm({...incomeForm, category: e.target.value})}
                required
                disabled={loading}
              />
              <div className="modal-actions">
                <button 
                  type="button" 
                  onClick={() => setShowIncomeModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Add Income"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Expense Modal */}
      {showExpenseModal && (
        <div className="modal-overlay" onClick={() => setShowExpenseModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add Expense</h3>
            <form onSubmit={handleExpenseSubmit}>
              <input
                type="number"
                placeholder="Amount"
                value={expenseForm.amount}
                onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})}
                step="0.01"
                min="0"
                required
                disabled={loading}
              />
              <input
                type="text"
                placeholder="Category (e.g., Food, Transport)"
                value={expenseForm.category}
                onChange={(e) => setExpenseForm({...expenseForm, category: e.target.value})}
                required
                disabled={loading}
              />
              <div className="modal-actions">
                <button 
                  type="button" 
                  onClick={() => setShowExpenseModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Add Expense"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
