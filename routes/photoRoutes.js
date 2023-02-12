const express = require("express");
const router = express.Router();
const {
  getAllPhotos,
  getPhotoById,
} = require("../controllers/photoController");

//GET all Photos from the API
router.get("/", getAllPhotos);

//GET Photos by Id
router.get("/:id", getPhotoById);

module.exports = router;
