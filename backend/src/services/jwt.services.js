import jwt from "jsonwebtoken";
import { getEnvVariable } from "../utils/envHelpers.utils.js";

export const verifyToken = (token, secretKey) => {
  try {
    if (!token) throw new Error("Missing token while verifyToken.");
    if (!secret) throw new Error("Missing secret key while verifyToken.");

    return jwt.verify(token, secretKey);
  } catch (err) {
    throw new Error("Failed to verify token");
  }
};

export const generateToken = (payload, secretKey, expiresIn) => {
  try {
    if (!payload) throw new Error("Missing Payload while generate token");
    if (!secretKey) throw new Error("Missing Secret key while generate token");

    return jwt.sign(payload, secretKey, { expiresIn });
  } catch (err) {
    throw new Error("Error generating token", err.message);
  }
};

export const generateAccessToken = (payload) => {
  const secret = getEnvVariable(
    "ACCESS_TOKEN_SECRET",
    "Missing Env variable [ACCESS_TOKEN_SECRET]"
  );
  const expiresIn = getEnvVariable(
    "ACCESS_TOKEN_EXPIRE",
    "Missing Env variable [ACCESS_TOKEN_EXPIRE]"
  );
  return generateToken(payload, secret, expiresIn);
};

export const generateRefreshToken = (payload) => {
  const secret = getEnvVariable(
    "REFRESH_TOKEN_SECRET",
    "Missing Env varible [REFRESH_TOKEN_SECRET]"
  );
  const expiresIn = getEnvVariable(
    "REFRESH_TOKEN_EXPIRE",
    "Missing Env variable [REFRESH_TOKEN_EXPIRE]"
  );
  return generateToken(payload, secret, expiresIn);
};
