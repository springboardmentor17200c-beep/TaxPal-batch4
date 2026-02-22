const { successResponse } = require("../utils/response");
const budgetService = require("../services/budget.service");

exports.createBudget = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { category, limit, month } = req.body;

    if (!category || !limit || !month) {
      return res.status(400).json({
        success: false,
        message: "Category, limit and month are required",
      });
    }

    const budget = await budgetService.createBudget(userId, {
      category,
      limit,
      month,
    });

    successResponse(res, budget, "Budget created successfully", 201);
  } catch (error) {
    next(error);
  }
};

exports.getBudgets = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const budgets = await budgetService.getBudgets(userId);

    successResponse(res, budgets, "Budgets fetched successfully");
  } catch (error) {
    next(error);
  }
};

exports.getBudgetProgress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({
        success: false,
        message: "Month query parameter is required (YYYY-MM)",
      });
    }

    const result = await budgetService.getBudgetProgress(userId, month);

    successResponse(res, result, "Budget progress fetched successfully");
  } catch (error) {
    next(error);
  }
};
exports.updateBudget = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const updated = await budgetService.updateBudget(userId, id, req.body);

    successResponse(res, updated, "Budget updated");
  } catch (error) {
    next(error);
  }
};

exports.deleteBudget = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await budgetService.deleteBudget(userId, id);

    successResponse(res, null, "Budget deleted");
  } catch (error) {
    next(error);
  }
};
