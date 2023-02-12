const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json(err.message);
};

const invalidPathHandler = (req, res, next) => {
  res.status(404).send("Invalid path");
};

module.exports = { errorHandler, invalidPathHandler };
