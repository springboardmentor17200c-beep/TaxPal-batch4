const transactionService = require("../services/transaction.service");
//Creates Transaction
//POST /transactions
exports.createTransaction = async (req, res) => {
  try {
    const userId = req.user.id; // extracted from JWT middleware

    const { type, amount, category, date } = req.body;

    //Basic validation
    if (!type || !amount || !category || !date) {
      return res.status(400).json({
        success: false,
        message: "All fields (type, amount, category, date) are required",
      });
    }

    const transaction = await transactionService.createTransaction(userId, {
      type,
      amount,
      category,
      date,
    });

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create transaction",
      error: error.message,
    });
  }
};
//Get All Transactions
//GET /transactions
exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await transactionService.getUserTransactions(userId);
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
      error: error.message,
    });
  }
};
