export const ApiResponse = (
  res,
  statusCode = 200,
  message = null,
  data = null
) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    ...(message && { message }),
    ...(data && { data }),
  });
};
