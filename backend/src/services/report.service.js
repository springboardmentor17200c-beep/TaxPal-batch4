const Transaction = require("../models/transaction.model");
const getMonthlyReport = async (month) => {
  const start = new Date(`${month}-01`);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);
  const transactions = await Transaction.find({
    date: { $gte: start, $lt: end }
  });
  let totalIncome = 0;
  let totalExpense = 0;
  let categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "income") totalIncome += t.amount;
    else totalExpense += t.amount;

    if (!categoryMap[t.category]) {
      categoryMap[t.category] = 0;
    }
    categoryMap[t.category] += t.amount;
  });
  const categories = Object.keys(categoryMap).map((cat) => ({
    category: cat,
    amount: categoryMap[cat]
  }));
  return {
    month,
    totalIncome,
    totalExpense,
    net: totalIncome - totalExpense,
    categories
  };
};
const getQuarterlyReport = async (quarter, year) => {
  const quarters = {
    Q1: ["01", "02", "03"],
    Q2: ["04", "05", "06"],
    Q3: ["07", "08", "09"],
    Q4: ["10", "11", "12"]
  };
  let allTransactions = [];
  for (let m of quarters[quarter]) {
    const start = new Date(`${year}-${m}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const data = await Transaction.find({
      date: { $gte: start, $lt: end }
    });
    allTransactions.push(...data);
  }
  let totalIncome = 0;
  let totalExpense = 0;
  let categoryMap = {};

  allTransactions.forEach((t) => {
    if (t.type === "income") totalIncome += t.amount;
    else totalExpense += t.amount;

    if (!categoryMap[t.category]) {
      categoryMap[t.category] = 0;
    }
    categoryMap[t.category] += t.amount;
  });
  const categories = Object.keys(categoryMap).map((cat) => ({
    category: cat,
    amount: categoryMap[cat]
  }));
  return {
    quarter,
    year,
    totalIncome,
    totalExpense,
    net: totalIncome - totalExpense,
    categories
  };
};

module.exports = {
  getMonthlyReport,
  getQuarterlyReport
};
