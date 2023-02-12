const express = require("express");
const dotenv = require("dotenv").config();
const {
  errorHandler,
  invalidPathHandler,
} = require("./middleware/errorMiddleware.js");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to the 'Unsplash' API!",
  });
});

app.use("/api/photos", require("./routes/photoRoutes.js"));
app.use("/api/photos/:id", require("./routes/photoRoutes.js"));

app.use(errorHandler);
app.use(invalidPathHandler);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
