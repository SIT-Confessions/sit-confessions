import bcrypt from "bcryptjs";
import config from "config";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import User from "../models/User.js";

export const registerUser = async (req, res) => {
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
      return res.status(400).json({ errors: [{ msg: "User already exist" }] });
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
};

export const changePassword = async (req, res) => {
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
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
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
};

export const changeRole = async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { _id, role } = req.body;

  try {
    const user = await User.findById(_id);

    // Check if user exist
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "No user found" }] });
    }

    user.role = role;
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
