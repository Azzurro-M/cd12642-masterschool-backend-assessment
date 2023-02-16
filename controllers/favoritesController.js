//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require("express-async-handler");

//add to favourtites
const addIn = (req, res) => {
  res.send("add in to fav");
};

module.exports = { addIn };
