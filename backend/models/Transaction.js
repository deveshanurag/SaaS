// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    text: { type: String, required: true },
    result: { type: String, required: true },
    cpuUsage: { type: Number, required: true },
    ramUsage: { type: Number, required: true },
    deductedCredits: { type: Number, required: true },
    transactionDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
