export const ErrorHandler = (res, statusCode = 400, message, code = null) => {
  res.status(statusCode).json({
    success: false,
    statusCode,
    ...(message && { message }),
    ...(code && { code }),
  });
};
