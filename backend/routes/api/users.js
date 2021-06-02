import bcrypt from "bcryptjs";
import config from "config";
import express from "express";
import jwt from "jsonwebtoken";
import { MASTER, ADMIN } from "../../constants/roles.js";
import auth, { master } from "../../middleware/auth.js";
import { check, validationResult } from "express-validator";

import User from "../../models/User.js";

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
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 }),
      check("password2", "Please enter confirmation password").notEmpty(),
      check("role").isIn([MASTER, ADMIN]),
    ],
  ],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, password2, role } = req.body;

    if (password !== password2) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Passwords do not match" }] });
    }

    try {
      let user = await User.findOne({ email });

      // See if user exist
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exist" }] });
      }

      user = new User({
        name,
        email,
        password,
        role,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server error");
    }
  }
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
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { oldpassword, newpassword, newpassword2 } = req.body;

    if (newpassword !== newpassword2) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Passwords do not match" }] });
    }

    try {
      const user = await User.findById(req.user.id);

      // Check if user exist
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "No user found" }] });
      }

      // Compare password
      const isMatch = await bcrypt.compare(oldpassword, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newpassword, salt);

      await user.save();
      res.status(200).json({ msg: "Password changed" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

export default router;
