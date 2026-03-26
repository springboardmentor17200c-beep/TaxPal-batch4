const express = require("express");
const router = express.Router();

const reportController = require("../controllers/report.controller");

router.get("/monthly", reportController.getMonthlyReport);
router.get("/quarterly", reportController.getQuarterlyReport);

module.exports = router;
