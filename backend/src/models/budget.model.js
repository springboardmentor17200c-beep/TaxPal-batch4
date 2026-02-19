const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
      min: 1,
    },
    month: {
      type: String, // Format: YYYY-MM
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", budgetSchema);
