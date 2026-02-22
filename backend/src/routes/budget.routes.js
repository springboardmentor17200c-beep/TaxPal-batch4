const express = require("express");
const router = express.Router();
const controller = require("../controllers/budget.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, controller.createBudget);
router.get("/", auth, controller.getBudgets);
router.get("/progress", auth, controller.getBudgetProgress);
router.put("/:id", auth, controller.updateBudget);
router.delete("/:id", auth, controller.deleteBudget);

module.exports = router;
