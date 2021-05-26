import cors from "cors";
import connectDB from "./config/db.js";
import express from "express";
import mongoose from "mongoose";

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => res.send("API Running"));

//TODO Define routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
