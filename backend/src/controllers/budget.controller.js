const budgetService = require("../services/budget.service");

exports.createBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const budget = await budgetService.createBudget(userId, req.body);
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBudgets = async (req, res) => {
  try {
    const userId = req.user.id;
    const budgets = await budgetService.getBudgets(userId);
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBudgetProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const month = req.query.month;
    const result = await budgetService.getBudgetProgress(userId, month);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
