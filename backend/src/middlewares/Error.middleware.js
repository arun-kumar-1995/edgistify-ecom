export const ErrorMiddleware = (err, req, res, next) => {
  let errCode = err.errCode || 500;
  let errMsg = err.message || "Internal Server Error";

  //reference error
  if (err instanceof ReferenceError) {
    errCode = 400;
  }

  // MongoDB connection errors
  if (err.name === "MongoNetworkError") {
    errCode = 503;
    errMsg = "Unable to connect to the database. Please try again later.";
  }
  // duplicate key error
  if (err.code === 11000) {
    errCode = 400;
    const field = Object.keys(err.keyValue)[0];
    errMsg = `Duplicate value for ${field}. Please use a different value.`;
  }

  // validation error
  if (err.name === "ValidationError") {
    const fieldNames = Object.values(err.errors).map((err) => err.path);
    errMsg = `${fieldNames.join(", ")} is required.`;
  }

  // MongoDB connection errors
  if (err.name === "MongoNetworkError") {
    errCode = 503;
    errMsg = "Unable to connect to the database. Please try again later.";
  }

  // invalid jwt error
  if (err.name === "JsonWebTokenError") {
    errCode = 401;
    errMsg = "Invalid token. Please log in again.";
  }

  // jwt expire
  if (err.name === "TokenExpiredError") {
    errCode = 401;
    errMsg = "Your token has expired. Please log in again.";
  }

  return res.status(errCode).json({
    success: false,
    status: errCode,
    message: errMsg,
  });
};
