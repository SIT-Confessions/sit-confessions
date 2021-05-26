import cors from "cors";
import connectDB from "./config/db.js";
import express from "express";

import authRoute from "./routes/api/auth.js";
import confessionRoute from "./routes/api/confessions.js";
import usersRoute from "./routes/api/users.js";

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => res.send("API Running"));

// Define routes
app.use("/api/auth", authRoute);
app.use("/api/confessions", confessionRoute);
app.use("/api/users", usersRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
