const reportService = require("../services/report.service");

const getMonthlyReport = async (req, res, next) => {
  try {
    const { month } = req.query;

    const report = await reportService.getMonthlyReport(month);

    res.status(200).json(report);
  } catch (error) {
    next(error);
  }
};

const getQuarterlyReport = async (req, res, next) => {
  try {
    const { quarter, year } = req.query;

    const report = await reportService.getQuarterlyReport(quarter, year);

    res.status(200).json(report);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMonthlyReport,
  getQuarterlyReport
};
