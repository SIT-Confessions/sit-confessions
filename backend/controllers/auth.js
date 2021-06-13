import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import User from "../models/User.js";

/**
 * Find user by user id in db.
 *
 * @return {json} User details excluding password field.
 */
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

/**
 * Retrieve all users from db.
 *
 * @return {json} All user details excluding password field
 */
export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({ _id: { $ne: req.user.id } }).select(
      "-password"
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

/**
 * Check user authentication details.
 *
 * Validate user email and password by checking
 * hash values of input and password from db, and
 * create a jwt for the user to login.
 *
 * @returns {json} Signed Json Web Token
 */
export const authenticateUser = async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    // See if user exist
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid Email or Password" }] });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid Email or Password" }] });
    }

    user.lastLogin = new Date().toISOString();
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
      process.env.JWTSECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
