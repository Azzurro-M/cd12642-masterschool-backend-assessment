//Require axios to make API calls
const asyncHandler = require("express-async-handler");
const axios = require("axios");
const baseUrl = "https://api.unsplash.com";
const accessKey = "?client_id=PhLZKC8LQ8_o5YROA3oCKRq7jcEURMaQRirXXL0S0wc";
//"https://api.unsplash.com/";

const getAllPhotos = asyncHandler(async (req, res, next) => {
  try {
    const response = await axios.get(`${baseUrl}/photos/${accessKey}`);
    const photos = await response.data.map((photo) => photo.urls.raw);
    res.status(200);
    return res.json(photos);
  } catch (err) {
    res.status(500);
    return res.json({
      message: "Server error. Please try again later.",
    });
    next(err);
  }
});

const getPhotoById = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`${baseUrl}/photos/${id}/${accessKey}`);
    const photoById = response.data;
    res.status(200);
    return res.json(photoById);
  } catch (err) {
    res.status(500);
    return res.json({
      message: "Server error. Please try again later.",
    });
    next(err);
  }
});

const getPhotoByUsername = asyncHandler(async (req, res, next) => {
  try {
    const username = req.params.username;
    const { data } = await axios.get(
      `${baseUrl}/users/${username}/photos${accessKey}`
    );
    const photos = data.map((photo) => ({
      id: photo.id,
      username: photo.user.username,
      description: photo.description || "No description provided.",
      url: photo.urls.raw,
    }));
    console.log(username);
    return res.status(200).json({ photos });
    // return res.status(200).json({ data });
  } catch (err) {
    res.status(err.response.status);
    return res.json({ message: err.response.data });
  }
  next(err);
});

module.exports = { getAllPhotos, getPhotoById, getPhotoByUsername };
