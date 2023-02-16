const authMiddleware = require("../middleware/authMiddleware.js");
const express = require("express");
const {
  addIn,
  getAllFavourites,
  deletePhoto,
  editPhoto,
} = require("../controllers/favoritesController.js");
const router = express.Router();

//ADD PHOTO
router.post("/", authMiddleware.protect, addIn);

//GET ALL FAV PHOTOS
router.get("/favouritePhotos", authMiddleware.protect, getAllFavourites);

// DELETE PHOTO BY ID
router.delete("/deletePhoto/:id", authMiddleware.protect, deletePhoto);

//EDIT PHOTO DESCRIPTION
router.patch("/editPhoto/:id", authMiddleware.protect, editPhoto);

module.exports = router;
