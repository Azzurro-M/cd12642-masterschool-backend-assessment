const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware.protect, getUser);

module.exports = router;
