import express from "express";
import auth from "../middleware/auth.js";
import { check } from "express-validator";
import { getUser, authenticateUser } from "../controllers/auth.js";

const router = express.Router();

// @route   GET api/auth
// @desc    Get auth user
// @access  Private
router.get("/", auth, getUser);

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").notEmpty(),
  ],
  authenticateUser
);

export default router;
