import dotenv from "dotenv/config";
import express from "express";
import { dbConnect } from "./configs/db.configs.js";
const app = express();

const { PORT = 800 } = process.env;

export const startServer = async () => {
  try {
    await dbConnect();

    if (!PORT || PORT > 65535) {
      throw new Error("Missing environment variable: [PORT]");
    }
    app.listen(PORT, () => {
      console.log("[Server Listning] : " + PORT);
    });
  } catch (err) {
    console.error("Failed to start the server:", err.message);
    process.exit(1);
  }
};

startServer();
