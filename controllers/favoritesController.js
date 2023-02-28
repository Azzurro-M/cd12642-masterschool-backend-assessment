//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require("express-async-handler");
const FavoritePhoto = require("../models/favoritePhotoModel.js");

//add to favourtites
const addIn = asyncHandler(async (req, res, next) => {
  const { user, url, description, username, reason } = req.body;

  const favoritePhoto = new FavoritePhoto({
    user,
    url,
    description,
    username,
    reason,
  });
  await favoritePhoto.create();

  res.status(201).json({ favoritePhoto, message: "Photo added to favorites" });
});

const getAllFavourites = asyncHandler(async (req, res, next) => {
  //it's to check that you are only getting logged in id fav photos
  const favoritePhotos = await FavoritePhoto.find({ user: req.user._id });
  return res.status(200).json(favoritePhotos);
});

const deletePhoto = asyncHandler(async (req, res, next) => {
  const favoritePhoto = await FavoritePhoto.findByIdAndDelete(req.params.id);
  if (!favoritePhoto) {
    res.status(404).json({ message: "Photo not found" });
    return;
  }
  res.status(204).json({ message: "Photo removed from favorites" });
});

const editPhoto = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { description } = req.body;

  const favoritePhoto = await FavoritePhoto.findById(id);
  if (!favoritePhoto) {
    res.status(404).json({ message: "Photo not found" });
    return;
  }

  favoritePhoto.description = description;
  await favoritePhoto.save();
  res.json({ favoritePhoto, message: "Photo description updated" });
});

module.exports = { addIn, getAllFavourites, deletePhoto, editPhoto };
