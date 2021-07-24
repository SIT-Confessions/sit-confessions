import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import User from "../models/User.js";

/**
 * Retrieves all users in db.
 *
 * Get all users except for current logged in user.
 *
 * @returns {json} All Users
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

/**
 * Register a user in db.
 *
 * Checks if email is unique and
 * encrypts the user password to be
 * inserted into the db.
 *
 * @returns {json} Signed jwt token
 */
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

    res.status(200).json({ msg: `User ${name} registered` });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server error");
  }
};

/**
 * Change user password.
 *
 * Checks if old password is the correct one
 * and encrypt the new password to be inserted
 * into db.
 *
 * @returns {json} Message of status result
 */
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

/**
 * Change role of a user.
 *
 * @returns {json} Message of status result
 */
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

/**
 * Delete a user.
 *
 * @returns {json} Message of status result
 */
export const deleteUser = async (req, res) => {
  const id = req.params.userid;

  try {
    const user = await User.findById(id);

    // Check if user exist
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "No user found" }] });
    }

    await user.deleteOne();

    res.status(200).json({ msg: `User ${user.name} deleted` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

/**
 * Edit user profile.
 *
 * Update name and email attributes.
 *
 * @returns {json} Updated user profile
 */
export const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email } = req.body;
    const filter = { _id: req.user.id };
    const update = { name, email };
    const user = await User.findOneAndUpdate(filter, update, {
      new: true,
    }).select("-password");
    //return res.json(user);
    return res.json({"msg" : "User profile successfully updated."})
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
