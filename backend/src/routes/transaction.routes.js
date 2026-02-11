const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transaction.controller");
const authMiddleware = require("../middleware/auth.middleware");

// POST /transactions
// Create new transaction
router.post("/", authMiddleware, transactionController.createTransaction);
// GET /transactions
// Get all user transactions
router.get("/", authMiddleware, transactionController.getTransactions);
module.exports = router;
