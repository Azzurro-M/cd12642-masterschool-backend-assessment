const mongoose = require("mongoose");

const favoritePhotoSchema = new mongoose.Schema({
  user: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, required: true },
  username: { type: String, required: true },
});

module.exports = mongoose.model("FavoritePhoto", favoritePhotoSchema);
