const express = require("express");
const router = express.Router();
const {
  registerValidation,
  loginValidation,
} = require("../validators/userValidators");
const { userRegister, userLogin } = require("../controllers/authController");

router.route("/register").post(registerValidation, userRegister);
router.route("/login").post(loginValidation, userLogin);

module.exports = router;
