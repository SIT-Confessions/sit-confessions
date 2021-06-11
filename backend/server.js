import cors from "cors";
import connectDB from "./config/db.js";
import express from "express";
import fs from "fs";
import helmet from "helmet";
import morgan from "morgan";
import cron from "node-cron";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { postToFB } from "./controllers/confessions.js";

import authRoute from "./routes/auth.js";
import confessionRoute from "./routes/confessions.js";
import usersRoute from "./routes/users.js";

const app = express();

// Connect to MongoDB
connectDB();

// Limit to 100 request per 15mins per IP address
const rateLimiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: "Too many request from this IP",
});

// Slow down speed of request after 50 requests in 10mins
const speedLimiter = slowDown({
  windowMs: 10 * 60 * 1000,
  delayAfter: 50,
  delayMs: 500,
});

// Log api requests to log file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);

app.set("trust proxy", 1);

app.use(rateLimiter);
app.use(speedLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));

// Schedule task
cron.schedule("*/15 * * * *", postToFB);

app.get("/", (req, res) => res.send("API Running"));

// Define routes
app.use("/api/auth", authRoute);
app.use("/api/confessions", confessionRoute);
app.use("/api/users", usersRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
