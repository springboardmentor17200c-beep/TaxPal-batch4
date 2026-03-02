const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true
    }
  },
  { timestamps: true }
);

// Prevent duplicate category per user & type
categorySchema.index(
  { userId: 1, name: 1, type: 1 },
  { unique: true }
);

module.exports = mongoose.model("Category", categorySchema);