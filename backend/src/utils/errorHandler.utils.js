export const ErrorHandler = (res, statusCode = 400, message) => {
  res.status(statusCode).json({
    success: false,
    statusCode,
    ...(message && { message }),
  });
};
