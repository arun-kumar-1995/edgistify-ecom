import dotenv from "dotenv";

import { fileURLToPath } from "url";
import path from "path";

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(() => {
  try {
    const envFilePath = path.resolve(
      __dirname,
      `./.env.${process.env.NODE_ENV}`
    );
    const { error } = dotenv.config({
      path: envFilePath,
      debug: process.env.ENABLE_DEBUG,
    });

    // handle error
    if (error) {
      throw new Error(
        `Failed to load env file for ${process.env.NODE_ENV}\n ${envResponse.error}`
      );
    }
    console.log("Environment variables loaded");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
})();
