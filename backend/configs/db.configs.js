import mongoose from "mongoose";

const { MONGO_URI: connectionString, DATABASE_NAME } = process.env;

export const dbConnect = async () => {
  try {
    if (!connectionString)
      throw new Error("Missing environment variable [MONGO_URI]");

    if (!DATABASE_NAME)
      throw new Error("Missing envirnment variable: [DATABASE_NAME]");

    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: DATABASE_NAME,
    });

    console.log(`[Database Connected]: ${conn.connection.host}`);
    
  } catch (err) {
    console.error("Couldn't connect to database", err);
    process.exit(1);
  }
};
