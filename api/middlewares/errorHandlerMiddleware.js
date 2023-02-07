const errorHandler = (error, req, res, next) => {
  const errorCode = error.statusCode || 500;
  const errorMessage = error.message || "Something went wrong";

  const errorBody = {
    message: errorMessage,
    status: errorCode,
  };

  res.status(errorCode).json(errorBody);
};

module.exports = errorHandler;
