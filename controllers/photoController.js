//Require axios to make API calls
const axios = require("axios");
const baseUrl = "https://api.unsplash.com/photos";
const accessKey = "?client_id=PhLZKC8LQ8_o5YROA3oCKRq7jcEURMaQRirXXL0S0wc";
//"https://api.unsplash.com/";

const getAllPhotos = async (req, res, next) => {
  try {
    const response = await axios.get(`${baseUrl + accessKey}`);
    const photos = await response.data;
    res.status(200).json(photos);
  } catch (err) {
    res.status(500);
    res.json({
      message: "Server error. Please try again later.",
    });
    next(err);
  }
};

const getPhotoById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`${baseUrl + "/" + id + accessKey}`);
    const photoById = response.data;
    res.status(200).json(photoById);
    console.log(id);
  } catch (err) {
    res.status(500);
    res.json({
      message: "Server error. Please try again later.",
    });
    next(err);
  }
};

module.exports = { getAllPhotos, getPhotoById };
