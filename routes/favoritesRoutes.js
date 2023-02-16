const authMiddleware = require("../middleware/authMiddleware.js");
const express = require("express");
const { addIn } = require("../controllers/favoritesController.js");
const router = express.Router();

router.get("/", authMiddleware.protect, addIn);

module.exports = router;
