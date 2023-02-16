//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require("express-async-handler");

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
  await favoritePhoto.save();

  res.status(201).json({ message: "Photo added to favorites" });
});

const getAllFavourites = asyncHandler(async (req, res, next) => {
  const { user } = req.query;

  const favoritePhotos = await FavoritePhoto.find({ user });
  return res.json(favoritePhotos);
});

const deletePhoto = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const favoritePhoto = await FavoritePhoto.findById(id);
  if (!favoritePhoto) {
    res.status(404).json({ message: "Photo not found" });
    return;
  }

  await favoritePhoto.remove();
  res.json({ message: "Photo removed from favorites" });
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
  res.json({ message: "Photo description updated" });
});

module.exports = { addIn, getAllFavourites, deletePhoto, editPhoto };
