//Require axios to make API calls
const asyncHandler = require("express-async-handler");
const axios = require("axios");
const baseUrl = "https://api.unsplash.com";
const dotenv = require("dotenv");
dotenv.config({ path: "./env" });
const accessKey = process.env.UNSPLASH_ACCESS_KEY;
//"https://api.unsplash.com/";

const getAllPhotos = asyncHandler(async (req, res, next) => {
  try {
    const response = await axios.get(
      `${baseUrl}/photos?client_id=${accessKey}`
    );
    const photos = await response.data.map((photo) => photo.urls.raw);
    res.status(200);
    return res.json(photos);
  } catch (err) {
    res.status(500);
    return res.json({
      message: "Server error. Please try again later.",
    });
  }
});

const getPhotoById = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await axios.get(
      `${baseUrl}/photos/${id}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const photoById = response.data;
    res.status(200);
    return res.json(photoById);
  } catch (err) {
    res.status(500);
    return res.json({
      message: "Server error. Please try again later.",
    });
  }
});

const getPhotoByUsername = asyncHandler(async (req, res, next) => {
  try {
    const username = req.params.username;
    const { data } = await axios.get(
      `${baseUrl}/users/${username}/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
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
});

module.exports = { getAllPhotos, getPhotoById, getPhotoByUsername };
