import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

const TransactionList = ({ transactions: externalTransactions, useMock = false }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (Array.isArray(externalTransactions) && externalTransactions.length >= 0) {
      setTransactions(externalTransactions);
    }
  }, [externalTransactions]);

  useEffect(() => {
    if (externalTransactions && Array.isArray(externalTransactions)) {

      return;
    }

    const load = async () => {
      setLoading(true);
      setError("");

      try {
        if (useMock) {
          const mock = [
            {
              _id: "mock-1",
              type: "income",
              amount: 2500,
              category: "Freelance Project",
              date: new Date().toISOString(),
              createdAt: new Date().toISOString(),
            },
            {
              _id: "mock-2",
              type: "expense",
              amount: 120,
              category: "Software Subscription",
              date: new Date().toISOString(),
              createdAt: new Date().toISOString(),
            },
          ];
          setTransactions(mock);
        } else {
          const res = await apiClient.get("/transactions");
          const data = res?.data?.data ?? [];
          setTransactions(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Failed to load transactions", err);
        setError(
          err?.response?.data?.message ||
            "Failed to load transactions. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [externalTransactions, useMock]);

  const renderDate = (tx) => {
    const raw = tx.date || tx.createdAt;
    if (!raw) return "-";
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return "-";
    return d.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="transactions-section">
        <h2>Transactions</h2>
        <p>Loading transactions...</p>
      </div>
    );
  }

  return (
    <div className="transactions-section">
      <h2>List of Transactions</h2>

      {error && <p className="transactions-error">{error}</p>}

      {transactions.length === 0 ? (
        <div className="empty-state">
          <p>No transactions yet. Add your first income or expense!</p>
        </div>
      ) : (
        <div className="transactions-list">
          {transactions.map((transaction) => (
            <div
              key={transaction._id || `${transaction.type}-${transaction.date}-${transaction.category}`}
              className={`transaction-item ${transaction.type}`}
            >
              <div className="transaction-info">
                <span className="category">{transaction.category}</span>
                <span className="date">{renderDate(transaction)}</span>
              </div>
              <span className="amount">
                ₹{Number(transaction.amount || 0).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;

