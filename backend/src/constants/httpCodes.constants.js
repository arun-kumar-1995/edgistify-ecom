export const HttpCodes = {
  MISSING_TOKEN: {
    statusCode: 400,
    message: "Missing token at request",
    name: " MISSING_TOKEN",
  },
  MISSING_SECRET_KEY: {
    statusCode: 400,
    message: "Missing secret key at request",
    name: "MISSING_SECRET_KEY",
  },
  MISSING_PAYLOAD: {
    statusCode: 400,
    message: "Missing payload at request",
    name: "MISSING_PAYLOAD",
  },
  VERIFY_TOKEN_ERROR: {
    statusCode: 403,
    message: "Failed to verify token",
    name: "VERIFY_TOKEN_ERROR",
  },
  TOKEN_GENERATING_ERROR: {
    statusCode: 500,
    message: "Error generating token",
    name: "TOKEN_GENERATING_ERROR",
  },
  TokenExpiredError: {
    statusCode: 401,
    message: "Your session has expired. Please log in again.",
    name: "TokenExpiredError",
  },
  JsonWebTokenError: {
    statusCode: 403,
    message: "You are passing invalid token",
    name: "JsonWebTokenError",
  },
  MISSING_REFRESH_TOKEN: {
    statusCode: 403,
    message: "Refresh token not found",
    name: "MISSING_REFRESH_TOKEN",
  },
  INCORRECT_REFRESH_TOKEN: {
    statusCode: 403,
    message: "Refresh token is incorrect. Try login again",
    name: "INCORRECT_REFRESH_TOKEN",
  },
};
