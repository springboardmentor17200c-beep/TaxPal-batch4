const Budget = require("../models/budget.model");
const Transaction = require("../models/transaction.model");

exports.createBudget = async (userId, data) => {
  return await Budget.create({
    userId,
    category: data.category,
    limit: data.limit,
    month: data.month,
  });
};

exports.getBudgets = async (userId) => {
  return await Budget.find({ userId });
};

exports.getBudgetProgress = async (userId, month) => {
  const budgets = await Budget.find({ userId, month });

  const results = [];

  for (let budget of budgets) {
    const transactions = await Transaction.find({
      userId,
      category: budget.category,
      month,
      type: "expense",
    });

    const spent = transactions.reduce((sum, t) => sum + t.amount, 0);
    const remaining = budget.limit - spent;
    const percentage =
      budget.limit > 0
        ? Math.round((spent / budget.limit) * 100)
        : 0;

    let status;
    if (percentage < 70) status = "safe";
    else if (percentage <= 100) status = "warning";
    else status = "exceeded";

    results.push({
      category: budget.category,
      limit: budget.limit,
      spent,
      remaining,
      percentage,
      status,
    });
  }

  return results;
};
