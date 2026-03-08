const mongoose = require("mongoose");

const taxEstimateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    country: {
      type: String,
      required: true,
      trim: true
    },
    year: {
      type: Number,
      required: true
    },
    quarter: {
      type: String,
      enum: ["Q1", "Q2", "Q3", "Q4"],
      required: true
    },
    estimated_tax: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

// Extra safety: one record per user per year per quarter
taxEstimateSchema.index(
  { userId: 1, year: 1, quarter: 1 },
  { unique: true }
);

module.exports = mongoose.model("TaxEstimate", taxEstimateSchema);