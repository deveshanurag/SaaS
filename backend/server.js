const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const textRoutes = require("./routes/textRoutes");
const userRoutes = require("./routes/userRoutes");
// Load environment variables from .env file in backend
dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/text", textRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
