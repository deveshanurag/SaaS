const express = require("express");
const { analyseText } = require("../controllers/textController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Text analysis route
router.post("/analyse", authenticate, analyseText);

module.exports = router;
