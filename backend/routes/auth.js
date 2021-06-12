import express from "express";
import auth, { master, loginLimiter } from "../middleware/auth.js";
import { check } from "express-validator";
import { getAllUsers, getUser, authenticateUser } from "../controllers/auth.js";

const router = express.Router();

/**
 * Get all auth users
 *
 * @route GET api/auth/users
 * @access Master
 */
router.get("/users", master, getAllUsers);

/**
 * Get auth user
 *
 * @route GET api/auth
 * @access Private
 */
router.get("/", auth, getUser);

/**
 * Authenticate user and get token
 *
 * @route POST api/auth
 * @access Public
 */
router.post(
  "/",
  loginLimiter,
  [
    check("email", "Please include a valid email").isEmail().normalizeEmail(),
    check("password", "Password is required").notEmpty(),
  ],
  authenticateUser
  );

export default router;
