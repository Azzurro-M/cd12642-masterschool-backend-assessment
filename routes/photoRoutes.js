const express = require("express");
const router = express.Router();
const {
  getAllPhotos,
  getPhotoById,
  getPhotoByUsername,
} = require("../controllers/photoController.js");

//GET all Photos from the API
router.get("/", getAllPhotos);

//GET Photos by Id
router.get("/:id", getPhotoById);

//GET Photo by Username
router.get("/user/:username", getPhotoByUsername);

module.exports = router;
