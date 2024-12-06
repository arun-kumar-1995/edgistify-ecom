import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    if (!password || typeof password !== "string") {
      throw new Error("Invalid password provided for hashing.");
    }
    return bcrypt.hash(password, 12);
  } catch (err) {
    console.error("Error hashing password:", err.message);
    throw new Error("Could not hash password.");
  }
};

export const comparePassword = async (password, userHashPassword) => {
  try {
    if (!password || !userHashPassword)
      throw new Error("Provide Password and hash password");

    return await bcrypt.compare(password, userHashPassword);
  } catch (err) {
    console.error("Error comparing passwords:", err.message);
    throw new Error("Could not compare passwords.");
  }
};
