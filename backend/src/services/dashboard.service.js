const Transaction = require("../models/transaction.model");

/**
 * Get Dashboard Summary
 */
const getDashboardSummary = async (userId) => {
  const transactions = await Transaction.find({ user_id: userId });

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else if (transaction.type === "expense") {
      totalExpense += transaction.amount;
    }
  });

  const balance = totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    balance,
  };
};

module.exports = {
  getDashboardSummary,
};
