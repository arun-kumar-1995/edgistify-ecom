import mongoose from "mongoose";

const { MONGO_URI: connectionString, DB_NAME } = process.env;

export const dbConnect = async () => {
  try {
    if (!connectionString)
      throw new Error("Missing environment variable [MONGO_URI]");

    if (!DB_NAME)
      throw new Error("Missing envirnment variable: [DATABASE_NAME]");

    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: DB_NAME,
    });

    console.log(`[Database Connected]: ${conn.connection.host}`);
    
  } catch (err) {
    console.error("Couldn't connect to database", err);
    process.exit(1);
  }
};
