import mongoose from "mongoose";
import { getEnvVariable } from "../src/utils/envHelpers.utils.js";

export const dbConnect = async () => {
  const connectionString = getEnvVariable("DB_HOST");

  const dbName = getEnvVariable("DB_NAME");

  try {
    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName,
    });

    console.log(`[Database Connected]: ${conn.connection.host}`);
  } catch (err) {
    console.error("Couldn't connect to database", err);
    process.exit(1);
  }
};
