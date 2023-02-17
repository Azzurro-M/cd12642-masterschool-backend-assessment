const authMiddleware = require("../middleware/authMiddleware.js");
const express = require("express");
const {
  addIn,
  getAllFavourites,
  deletePhoto,
  editPhoto,
} = require("../controllers/favoritesController.js");
const router = express.Router();

router
  .route("/")
  .post(authMiddleware.protect, addIn)
  .get(authMiddleware.protect, getAllFavourites);

router
  .route("/:id")
  .delete(authMiddleware.protect, deletePhoto)
  .patch(authMiddleware.protect, editPhoto);

module.exports = router;
