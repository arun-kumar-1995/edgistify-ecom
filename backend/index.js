// load env variables
import "./configs/loadEnv.config.js";

// imports
// import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
import { dbConnect } from "./configs/db.configs.js";
import { ErrorMiddleware } from "./src/middlewares/Error.middleware.js";
import { getEnvVariable } from "./src/utils/envHelpers.utils.js";
import { ValidateServerPort } from "./src/utils/validatePort.utils.js";
import cookieParser from "cookie-parser";
const app = express();

const APP_PORT = getEnvVariable("APP_PORT", "Missing Env variable APP_PORT");
// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// cors middleware
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes

import authRoutes from "./src/routes/auth.routes.js";
import userRoute from "./src/routes/user.routes.js";
import productRoute from "./src/routes/product.routes.js";

app.use("/app/auth", authRoutes);
app.use("/app/user", userRoute);
app.use("/app/product", productRoute);

// global erro middleware
app.use(ErrorMiddleware);

// start server only when connected to database

export const startServer = async () => {
  try {
    // validating port
    const port = ValidateServerPort(APP_PORT);

    await dbConnect();

    // listnig to server
    app.listen(port, () => {
      console.log(
        `Server Started \n NODE_ENV:${process.env.NODE_ENV} \nPORT: ${port}`
      );
    });
  } catch (err) {
    console.error("Failed to start the server:", err.message);
    process.exit(1);
  }
};

startServer();

// Global process-level error handling
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  console.error(err.stack);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});
