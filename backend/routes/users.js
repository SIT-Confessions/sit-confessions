import express from "express";
import { MASTER, ADMIN } from "../constants/roles.js";
import auth, { master } from "../middleware/auth.js";
import { check } from "express-validator";
import {
  registerUser,
  changePassword,
  changeRole,
} from "../controllers/users.js";

const router = express.Router();

// @route   POST api/users
// @desc    Register user
// @access  Master
router.post(
  "/",
  [
    master,
    [
      check("name", "Name is required").notEmpty(),
      check("email", "Please include a valid email").isEmail().normalizeEmail(),
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 }),
      check("password2", "Please enter confirmation password").notEmpty(),
      check("role", "Role is invalid").isIn([MASTER, ADMIN]),
    ],
  ],
  registerUser
);

// @route   PUT api/users/password
// @desc    Register user
// @access  Private
router.put(
  "/password",
  [
    auth,
    [
      check("oldpassword", "Old password is required").notEmpty(),
      check(
        "newpassword",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 }),
      check("newpassword2", "Please enter a confirmation password").notEmpty(),
    ],
  ],
  changePassword
);

// @route   PUT api/users/role
// @desc    Register user
// @access  Private
router.put(
  "/role",
  [
    master,
    [
      check("_id", "Please provide user id").notEmpty(),
      check("role", "Role is invalid").isIn([MASTER, ADMIN]),
    ],
  ],
  changeRole
);

export default router;
