import jwt from "jsonwebtoken";
import { getEnvVariable } from "../utils/envHelpers.utils.js";
import { HttpCodes } from "../constants/httpCodes.constants.js";
export const verifyToken = (token, secretKey) => {
  try {
    if (!token || !secretKey) {
      return !token
        ? { success: false, code: HttpCodes.MISSING_TOKEN }
        : { success: false, code: HttpCodes.MISSING_SECRET_KEY };
    }

    const decoded = jwt.verify(token, secretKey);
    return { success: true, data: decoded };
  } catch (err) {
    return {
      success: false,
      code: HttpCodes[err.name] || HttpCodes.VERIFY_TOKEN_ERROR,
    };
  }
};

export const generateToken = (payload, secretKey, expiresIn) => {
  try {
    if (!payload || !secretKey) {
      return !payload
        ? { success: false, code: HttpCodes.MISSING_PAYLOAD }
        : { success: false, code: HttpCodes.MISSING_SECRET_KEY };
    }

    const decodedToken = jwt.sign(payload, secretKey, { expiresIn });
    return { success: true, data: decodedToken };
  } catch (err) {
    return {
      success: false,
      code: HttpCodes[err.name] || HttpCodes.TOKEN_GENERATING_ERROR,
    };
  }
};

export const generateAccessToken = (payload) => {
  const secret = getEnvVariable("ACCESS_TOKEN_SECRET");
  const expiresIn = getEnvVariable("ACCESS_TOKEN_EXPIRE");
  return generateToken(payload, secret, expiresIn);
};

export const generateRefreshToken = (payload) => {
  const secret = getEnvVariable("REFRESH_TOKEN_SECRET");
  const expiresIn = getEnvVariable("REFRESH_TOKEN_EXPIRE");
  return generateToken(payload, secret, expiresIn);
};
