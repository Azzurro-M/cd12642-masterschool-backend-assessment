const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200);
  res.json({
    message: "welcome to the 'Unsplash' API!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
//Add a GET route to / that returns a 200 status and a JSON object with a message key assigned to a string that reads "Welcome to the Unsplash API!"
