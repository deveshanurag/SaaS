const User = require("../models/User");
const Transaction = require("../models/Transaction");
const pdf = require("pdfkit");

exports.getUser = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email, excluding the password field
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Send the user details as response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.processText = async (req, res) => {
  const { email, text } = req.body;

  if (!text || !email) {
    return res.status(400).json({ message: "Email and text are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Measure CPU time
    const startTime = process.hrtime();

    // Calculate word count
    const wordCount = text.trim().split(/\s+/).length;

    // Measure memory usage
    const initialMemory = process.memoryUsage().heapUsed;

    // Simulate text processing (example logic)
    const processedText = text.toUpperCase(); // Example processing

    const finalMemory = process.memoryUsage().heapUsed;
    const memoryUsed = (finalMemory - initialMemory) / 1024; // Convert to KB

    const [seconds, nanoseconds] = process.hrtime(startTime);
    const cpuTimeMs = seconds * 1000 + nanoseconds / 1e6; // Convert to milliseconds

    // Cost calculation
    const costPerWord = 1;
    const costPerCpuMs = 0.05; // Example cost per millisecond of CPU time
    const costPerKbRam = 0.01; // Example cost per KB of RAM

    const totalCost =
      wordCount * costPerWord +
      cpuTimeMs * costPerCpuMs +
      memoryUsed * costPerKbRam;

    if (user.credits < totalCost) {
      return res.status(400).json({ message: "Insufficient credits" });
    }

    const transaction = new Transaction({
      userEmail: email,
      text,
      result: wordCount,
      cpuUsage: cpuTimeMs.toFixed(2),
      ramUsage: memoryUsed.toFixed(2),
      deductedCredits: totalCost,
    });

    await transaction.save();

    // Deduct credits
    user.credits -= totalCost;
    await user.save();

    res.status(200).json({
      message: "Text processed successfully",
      wordCount,
      cpuTimeMs: cpuTimeMs.toFixed(2),
      memoryUsed: memoryUsed.toFixed(2),
      totalCost: totalCost.toFixed(2),
      remainingCredits: user.credits,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTransactions = async (req, res) => {
  const { email } = req.query; // Get user email from query params
  try {
    const transactions = await Transaction.find({ userEmail: email });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions." });
  }
};

exports.downloadInvoice = async (req, res) => {
  const { email } = req.query;

  const transactions = await Transaction.find({ userEmail: email });

  const doc = new pdf();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");

  doc.pipe(res);

  doc.fontSize(18).text("Transaction Invoice", { align: "center" });
  doc.fontSize(12).text("User: " + email, { align: "left" });
  doc.text("\n");

  transactions.forEach((transaction, index) => {
    doc.text(`Transaction ${index + 1}:`);
    doc.text(`Text: ${transaction.text}`);
    doc.text(`Result: ${transaction.result}`);
    doc.text(`CPU Usage: ${transaction.cpuUsage}%`);
    doc.text(`RAM Usage: ${transaction.ramUsage}%`);
    doc.text(`Credits Deducted: ${transaction.deductedCredits}`);
    doc.text(`Transaction Date: ${transaction.transactionDate}`);
    doc.text("\n");
  });

  doc.end();
};
