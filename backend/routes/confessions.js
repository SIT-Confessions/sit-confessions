import auth from "../middleware/auth.js";
import express from "express";
import { check } from "express-validator";
import {
  approveConfession,
  createConfession,
  getAllConfessions,
  getApprovedConfessions,
  getQueuedConfessions,
  getConfession,
  rejectConfession,
} from "../controllers/confessions.js";

const router = express.Router();

/**
 * Create a confession
 *
 * @route POST api/confessions
 * @access Public
 */
router.post(
  "/",
  [[check("text", "Text is required").notEmpty().escape()]],
  createConfession
);

/**
 * Get all confessions
 *
 * @route GET api/confessions
 * @access Private
 */
router.get("/", auth, getAllConfessions);

/**
 * Get all approved confessions
 *
 * @route GET api/confessions/approved
 * @access Public
 */
router.get("/approved", getApprovedConfessions);

/**
 * Get all queued confessions
 *
 * @route GET api/confessions/queued
 * @access Private
 */
router.get("/queued", auth, getQueuedConfessions);

/**
 * Get confession by id
 *
 * @route GET api/confessions/:id
 * @access Private
 */
router.get("/:id", auth, getConfession);

/**
 * Approve confession by id
 *
 * @route PUT api/confessions/approve/:id
 * @access Private
 */
router.put("/approve/:id", auth, approveConfession);

/**
 * Reject confession by id
 *
 * @route PUT api/confessions/reject/:id
 * @access Private
 */
router.put("/reject/:id", auth, rejectConfession);

export default router;
