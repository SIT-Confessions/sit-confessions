import auth from "../middleware/auth.js";
import express from "express";
import { check } from "express-validator";
import { longLimiter } from "../middleware/rateLimiter.js";
import {
  approveConfession,
  createConfession,
  getAllConfessions,
  getApprovedConfessions,
  getPagedApprovedConfessions,
  getQueuedConfessions,
  getConfession,
  searchConfessions,
  rejectConfession,
  approveAndPostConfession,
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
 * Get all approved confessions by page
 *
 * @route GET api/confessions/approvedPaged/:pageNumber
 * @access Public
 */
router.get("/approved/:pageNumber", longLimiter, getPagedApprovedConfessions);

/**
 * Search confession by substring
 *
 * @route GET api/confessions/search
 * @access Public
 */
router.get("/search", searchConfessions);

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
router.get("/:id", longLimiter, getConfession);

/**
 * Approve confession by id
 *
 * @route PUT api/confessions/approve/:id
 * @access Public
 */
router.put("/approve/:id", auth, approveConfession);

/**
 * Approve confession and post to fb by id
 *
 * @route PUT api/confessions/approve-and-post/:id
 * @access Public
 */
router.put("/approve-and-post/:id", auth, approveAndPostConfession);

/**
 * Reject confession by id
 *
 * @route PUT api/confessions/reject/:id
 * @access Private
 */
router.put("/reject/:id", auth, rejectConfession);

export default router;
