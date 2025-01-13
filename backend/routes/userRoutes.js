const express = require("express");
const router = express.Router();

const {
  getUser,
  processText,
  getTransactions,
  downloadInvoice,
} = require("../controllers/userController");
router.route("/").post(getUser);
router.post("/process-text", processText);
router.get("/transactions", getTransactions);
router.get("/download-invoice", downloadInvoice);

module.exports = router;
