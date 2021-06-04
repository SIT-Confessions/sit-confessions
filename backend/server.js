import cors from "cors";
import connectDB from "./config/db.js";
import express from "express";
import fs from "fs";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import rateLimit from "express-rate-limit";

import authRoute from "./routes/auth.js";
import confessionRoute from "./routes/confessions.js";
import usersRoute from "./routes/users.js";

const app = express();

// Connect to MongoDB
connectDB();

// Limit to 100 request per 15mins per IP address
const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: "Too many request from this IP",
});

// const accessLogStream = fs.createWriteStream(path.join("./", "access.log"), {
//   flags: "a",
// });

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
// app.use(morgan("combined", { stream: accessLogStream }));

app.get("/", (req, res) => res.send("API Running"));

// Define routes
app.use("/api/auth", authRoute);
app.use("/api/confessions", confessionRoute);
app.use("/api/users", usersRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
