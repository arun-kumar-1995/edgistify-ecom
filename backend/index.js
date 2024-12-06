import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
import { dbConnect } from "./configs/db.configs.js";
import userRoute from "./src/routes/user.routes.js";
import { ErrorMiddleware } from "./src/middlewares/Error.middleware.js";

const app = express();

const { PORT = 800 } = process.env;
const port = parseInt(PORT);

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.use("/app/v1/user", userRoute);

// global erro middleware
app.use(ErrorMiddleware);

// start server only when connected to database

export const startServer = async () => {
  try {
    // validating port
    if (!port || port > 65535) {
      throw new Error("Missing environment variable: [PORT]");
    }

    await dbConnect();

    // listnig to server
    app.listen(PORT, () => {
      console.log("[Server Listning] : " + port);
    });
  } catch (err) {
    console.error("Failed to start the server:", err.message);
    process.exit(1);
  }
};

startServer();
