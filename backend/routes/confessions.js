import auth from "../middleware/auth.js";
import express from "express";
import { check } from "express-validator";
import {
  approveConfession,
  createConfession,
  getAllConfessions,
  getApprovedConfessions,
  getConfession,
  rejectConfession,
} from "../controllers/confessions.js";

const router = express.Router();

// @route   POST api/confessions
// @desc    Create a confession
// @access  Public
router.post(
  "/",
  [[check("text", "Text is required").notEmpty().escape()]],
  createConfession
);

// @route   GET api/confessions
// @desc    Get all confessions
// @access  Private
router.get("/", auth, getAllConfessions);

// @route   GET api/confessions/approved
// @desc    Get all approved confessions
// @access  Public
router.get("/approved", getApprovedConfessions);

// @route   GET api/confessions/:id
// @desc    Get confession by id
// @access  Private
router.get("/:id", auth, getConfession);

// @route   PUT api/confessions/approve/:id
// @desc    Approve confession by id
// @access  Private
router.put("/approve/:id", auth, approveConfession);

// @route   PUT api/confessions/reject/:id
// @desc    Reject confession by id
// @access  Private
router.put("/reject/:id", auth, rejectConfession);

export default router;
