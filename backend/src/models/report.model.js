const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    period: {
      type: String,
      required: true,
      trim: true
    },
    reportType: {
      type: String,
      enum: ["monthly", "quarterly"],
      required: true
    },
    filePath: {
      type: String,
      required: true
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

// Optional but smart: avoid duplicate reports for same period
reportSchema.index(
  { userId: 1, period: 1, reportType: 1 },
  { unique: true }
);

module.exports = mongoose.model("Report", reportSchema);